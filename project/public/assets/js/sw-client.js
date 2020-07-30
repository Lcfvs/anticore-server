import { listen } from 'anticore'

function onUpdate () {
  console.log('updated')
}

export async function subscribe ({ scope = '/', ...rest } = {}) {
  const { serviceWorker } = navigator

  if (isSecureContext && serviceWorker && serviceWorker.register) {
    try {
      const registration = await serviceWorker.register('/sw.min.js', {
        scope,
        ...rest
      })

      listen('updatefound', registration, onUpdate, {
        passive: true
      })
    } catch (e) {}
  }
}
