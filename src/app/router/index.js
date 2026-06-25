import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      meta: {
        requiresAuth: false,
        transition: "fade",
      },
      component: () => import("@/features/home/pages/HomePage.vue"),
    },
    {
      path: "/:grade",
      name: "browser",
      meta: { transition: "fade" },
      component: () => import("@/features/game-browser/pages/GameBrowser.vue"),
    },
    {
      path: "/:grade/:subject/:id/:gameName",
      name: "game",
      meta: { transition: "fade" },
      component: () => import("@/features/game-runtime/pages/GamePlayPage.vue"),
    },
    {
      path: "/DrawImage",
      name: "DrawImage",
      component: () => import("@/components/DrawImage.vue"),
    },
    {
      path: "/NumberBoard",
      name: "NumberBoard",
      component: () => import("@/components/NumberBoard.vue"),
    },
    {
      path: "/Numberline",
      name: "Numberline",
      component: () => import("@/components/NumberLine.vue"),
    },
    {
      path: "/tester",
      component: () =>
        import(
          "@/features/game-templates/component-testers/componentTesters.vue"
        ),
    },
    {
      path: "/LinktoImageGameMaker",
      component: () => import("@/components/maker/LinktoImageGameMaker.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  console.warn(`route: ${from.path} -> ${to.path}`);
  const normalizeParam = (value) => (Array.isArray(value) ? value[0] : value);
  const grade = parseInt(normalizeParam(to.params.grade), 10);
  const id = parseInt(normalizeParam(to.params.id), 10);
  // 使用 YuanQuan 字體供所有低年級及自定義遊戲，確保注音顯示正常
  document.body.style.fontFamily = "YuanQuan, sans-serif";
  next();
});

export default router;
