export function createNotification(text, style = 'primary', timeout = 2000) {

  return {
    text,
    style,
    timeout,
    active: true
  }
}

export function createSuccessNotification(text) {
  return createNotification(text, 'success')
}

export function createErrorNotification(text) {
  return createNotification(text, 'error')
}

export function createWarningNotification(text) {
  return createNotification(text, 'warning')
}
