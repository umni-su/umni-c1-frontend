<?php

namespace App\Enums;

enum EspRestartReasonEnum: int
{
    case ESP_RST_UNKNOWN = 0;    //!< Reset reason can not be determined
    case ESP_RST_POWERON = 1;    //!< Reset due to power-on event
    case ESP_RST_EXT = 2;        //!< Reset by external pin (not applicable for ESP32)
    case ESP_RST_SW = 3;         //!< Software reset via esp_restart
    case ESP_RST_PANIC = 4;      //!< Software reset due to exception/panic
    case ESP_RST_INT_WDT = 5;    //!< Reset (software or hardware) due to interrupt watchdog
    case ESP_RST_TASK_WDT = 6;   //!< Reset due to task watchdog
    case ESP_RST_WDT = 7;        //!< Reset due to other watchdogs
    case ESP_RST_DEEPSLEEP = 8;  //!< Reset after exiting deep sleep mode
    case ESP_RST_BROWNOUT = 9;   //!< Brownout reset (software or hardware)
    case ESP_RST_SDIO = 10;       //!< Reset over SDIO
    case ESP_RST_USB = 11;        //!< Reset by USB peripheral
    case ESP_RST_JTAG = 12;       //!< Reset by JTAG
    case ESP_RST_EFUSE = 13;      //!< Reset due to efuse error
    case ESP_RST_PWR_GLITCH = 14; //!< Reset due to power glitch detected
    case ESP_RST_CPU_LOCKUP = 15; //!< Reset due to CPU lock up
}

