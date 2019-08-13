import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          alias: '/',
          component: () => import(/* webpackChunkName: "home" */ './views/home/index')
        },
        {
          path: 'note',
          name: 'note',
          component: () => import(/* webpackChunkName: "note" */ './views/note/index'),
          children: [
            // {
            //   path: '*',
            //   name: 'markdown',
            //   component: () => import(/* webpackChunkName: "TuiEditor" */ `@/components/TuiEditor`)
            // }
            {
              // eslint-disable-next-line no-useless-escape
              path: '(.*?\.md)',
              name: 'markdown',
              component: () => import(/* webpackChunkName: "markdown" */ './views/note/components/NoteMarkdown')
            }
          ]
        },
        {
          path: 'jotting',
          name: 'jotting',
          component: () => import(/* webpackChunkName: "jotting" */ './views/jotting/index')
        }
      ]
    }
  ]
})
export default router
