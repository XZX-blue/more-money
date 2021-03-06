import Vue from "vue";
import VueRouter from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/components/EditLabel.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/money"
    },
    {
        path: "/money",
        component: Money
    },
    {
        path: "/labels",
        component: Labels
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        path: "*",
        component: NotFound
    },
    {
        path: "/labels/edit/:id",
        component: EditLabel
    }


];

const router = new VueRouter({
    routes
});

export default router;
