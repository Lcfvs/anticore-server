export function subscribe ({ scope = '/', ...rest } = {}) {
  const { serviceWorker } = navigator

  if (isSecureContext && serviceWorker && serviceWorker.register) {
    serviceWorker.register('/sw.min.js', { scope, ...rest })
      .catch(() => {})
  }
}
