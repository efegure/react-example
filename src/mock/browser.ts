import { setupWorker } from 'msw/browser'
import { productHandlers, userHandlers } from './handlers'

export const worker = setupWorker(...userHandlers, ...productHandlers)
