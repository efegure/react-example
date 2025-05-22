import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

async function enableMocking() {
  if (
    process.env.NODE_ENV !== 'development' ||
    import.meta.env.VITE_USE_FAKE_API !== 'true'
  ) {
    return
  }

  const { worker } = await import('./mock/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

const root = createRoot(document.getElementById('root')!) // createRoot(container!) if you use TypeScript
enableMocking().then(() => {
  root.render(<App />)
})
