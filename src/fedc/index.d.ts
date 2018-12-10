import Vue from 'vue';

import { User } from './apis/user';

declare module 'vue/types/vue' {
  interface Vue {
    $dc: {
      user: User;
    };
  }
}
