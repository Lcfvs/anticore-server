import { defaults, trigger } from 'anticore'
import { subscribe } from './sw-client.js'
import './contracts.js'
import './view-switcher.js'

subscribe()
defaults()
trigger()
