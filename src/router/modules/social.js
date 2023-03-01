import Layout from "@/layout";

export default {
  path: "/social",
  component: Layout,
  children: [
    {
      path: "",
      name: "Social",
      component: () => import("@/views/social"),
      meta: { title: "社保" },
    },
  ],
};
