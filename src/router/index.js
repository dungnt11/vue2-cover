import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const createRouter = () =>
  new VueRouter({
    mode: "history",
    routes: [
      {
        path: "/",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/admin",
        component: () => import("@/admin/Layout.vue"),
        children: [
          { 
            path: 'login',
            name: 'admin-login',
            component: () => import("@/admin/Login.vue"), 
            
          },

          {
            path: "",
            name: "admin-index",
            component: () => import("@/admin/DashboardLayout.vue"),
            redirect:   {name: 'users-list'},
            children: [
              { 
                path: 'users-list',
                name: 'users-list',
                component: () => import("@/admin/views/UsersList.vue"), 
                meta: { requiresAuth: true }
              },

              { 
                path: 'links-list',
                name: 'links-list',
                component: () => import("@/admin/views/LinksList.vue"), 
                meta: { requiresAuth: true }
              },

              { 
                path: 'comments',
                name: 'comments',
                component: () => import("@/admin/views/Comments.vue"), 
                meta: { requiresAuth: true }
              },
              { 
                path: 'chat',
                name: 'chat',
                component: () => import("@/admin/views/Chat.vue"), 
                meta: { requiresAuth: true }
              },
            ]
    
          }
        ],
      },
      {
        path: "*",
        component: () => import("@/views/PageNotFound.vue"),
      },
    ],
  });

const router = createRouter();
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("adminToken");
  if(to.meta.requiresAuth && !token){
    console.log("requiresAuth")
    next({name: "admin-login"})
  }

  if(to.name == "admin-login" && token){
    next({name: "users-list"})
  }

  next()
});
export default router;
