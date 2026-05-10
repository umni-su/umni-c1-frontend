use mdns_sd::{ServiceDaemon, ServiceEvent};
use serde::Deserialize;
use serde_json::Value;
use std::collections::HashMap;
use std::net::IpAddr;
use tauri::Emitter;

// Middleware: проверяет, является ли хост локальным IP (192.168.x.x, 10.x.x.x и т.д.)
fn is_private_ip(host: &str) -> bool {
    if let Ok(ip) = host.parse::<IpAddr>() {
        match ip {
            IpAddr::V4(v4) => v4.is_private() || v4.is_loopback(),
            IpAddr::V6(v6) => (v6.segments()[0] & 0xfe00) == 0xfc00 || v6.is_loopback(),
        }
    } else {
        // Если это не IP (например, .local имя), разрешаем,
        // так как mDNS имена резолвятся только внутри сети
        host.ends_with(".local") || host == "localhost"
    }
}

#[derive(Deserialize)]
struct RequestPayload {
    url: String,
    method: String,
    body: Option<Value>,
}

#[tauri::command]
async fn secure_request(payload: RequestPayload) -> Result<Value, String> {
    let parsed_url = url::Url::parse(&payload.url).map_err(|_| "Invalid URL")?;
    let host = parsed_url.host_str().ok_or("No host in URL")?;

    if !is_private_ip(host) {
        return Err(format!("Access Denied: {} is not a local address", host));
    }

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(5))
        .build()
        .map_err(|e| e.to_string())?;

    let method = payload.method.to_uppercase();
    let request_builder = match method.as_str() {
        "GET" => {
            let mut url = parsed_url;

            // Добавляем query параметры к URL для GET
            if let Some(params) = &payload.body {
                let query_string = serde_qs::to_string(&params).map_err(|e| e.to_string())?;
                url.set_query(Some(&query_string));
            }

            client.get(url.to_string())
        },
        "POST" => {
            let mut builder = client.post(&payload.url);
            if let Some(body) = payload.body {
                builder = builder.json(&body);
            }
            builder
        },
        _ => return Err("Method not supported".into()),
    };

    let response = request_builder.send().await.map_err(|e| e.to_string())?;
    let json_res: Value = response.json().await.map_err(|e| e.to_string())?;
    Ok(json_res)
}

#[tauri::command]
fn start_mdns_discovery(app: tauri::AppHandle) {
    let mdns = ServiceDaemon::new().unwrap();
    let receiver = mdns.browse("_umni_api._tcp.local.").unwrap();

    std::thread::spawn(move || {
        while let Ok(event) = receiver.recv() {
            if let ServiceEvent::ServiceResolved(info) = event {
                let hostname = info.get_hostname().to_string();
                let ips: Vec<String> = info
                    .get_addresses()
                    .iter()
                    .map(|ip| ip.to_string())
                    .collect();

                let mut txt_data = HashMap::new();
                for item in info.get_properties().iter() {
                    txt_data.insert(item.key().to_string(), item.val_str().to_string());
                }

                app.emit(
                    "device-found",
                    (info.get_fullname().to_string(), hostname, ips, txt_data),
                )
                .unwrap();
            }
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start_mdns_discovery,
            secure_request
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}