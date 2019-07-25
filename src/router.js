import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
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
          component: () => import(/* webpackChunkName: "Home" */ `@/components/Home`)
        },
        {
          path: 'note',
          name: 'note',
          component: () => import(/* webpackChunkName: "Note" */ `@/components/Note`),
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
              component: () => import(/* webpackChunkName: "MarkdownIt" */ `@/components/MarkdownIt`)
            }
          ]
        },
        {
          path: 'jotting',
          name: 'jotting',
          component: () => import(/* webpackChunkName: "Jotting" */ `@/components/Jotting`)
        }
      ]
    }
  ]
})

//   {
//     path: '/',
//     component: Layout,
//     alias: '/home',
//     children: [
//       {
//         name: 'home',
//         component: () => import(/* webpackChunkName: "Home" */ `@/components/Home`)
//       }]
//   },
//   {
//     path: '/jotting',
//     component: Layout,
//     children: [
//       {
//         name: 'jotting',
//         component: () => import(/* webpackChunkName: "Jotting" */ `@/components/Jotting`)
//       }]
//   }
// ]
