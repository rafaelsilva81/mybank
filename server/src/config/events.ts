import { EventEmitter } from 'events'

import createDefaultAccount from '../subscribers/createDefaultAccount'

/* 
  This is a event emitter that will be used to emit events globally.
  It will be used to emit events to subscribers
*/

const eventEmitter = new EventEmitter()

// Events
eventEmitter.on('register', createDefaultAccount)

export default eventEmitter
