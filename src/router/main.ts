import Main from '@/views/main.vue'
import home from '@/views/home.vue'
import album from '@/views/album.vue'
import square from '@/views/square.vue'
import other from '@/views/other/index.vue'
import other1 from '@/views/other/other1.vue'
import other2 from '@/views/other/other2.vue'
import user from '@/views/user.vue'

export default {
  path: '/',
  name: 'main',
  component: Main,
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        isLogin: true,
        path: '/home'
      }
    },
    {
      path: '/album',
      name: 'album',
      component: album,
      meta: {
        isLogin: true,
        path: '/album'
      }
    },
    {
      path: '/square',
      name: 'square',
      component: square,
      meta: {
        isLogin: true,
        path: '/square'
      }
    },
    {
      path: '/other',
      name: 'other',
      component: other,
      children: [
        {
          path: '/other1',
          name: 'other1',
          component: other1,
          meta: {
            isLogin: true,
            path: '/other1'
          }
        },
        {
          path: '/other2',
          name: 'other2',
          component: other2,
          meta: {
            isLogin: true,
            path: '/other2'
          }
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta: {
        isLogin: true,
        path: '/user'
      }
    }
  ]
}
