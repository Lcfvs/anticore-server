import { defaults, trigger } from 'anticore'
import './contracts.js'
import './view-switcher.js'
import { subscribe } from './sw-client.js'

subscribe()
defaults()
trigger()
