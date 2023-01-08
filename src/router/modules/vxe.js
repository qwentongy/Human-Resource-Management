import Layout from "@/layout";

export default {
  path: "/vxe",
  component: Layout,
  children: [
    {
      path: "",
      name: "vxe",
      component: () => import("@/views/vxe"),
      meta: { title: "vxeTable" },
    },
  ],
};
