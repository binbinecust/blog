import Vue from 'vue'

import { User } from './apis/user'
import { Daily, Album, Square } from './apis/common'

declare module 'vue/types/vue' {
  interface Vue {
    $dc: {
      user: User
      daily: Daily
      album: Album
      square: Square
    }
  }
}
