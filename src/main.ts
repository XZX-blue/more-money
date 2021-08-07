import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import tagListModel from "@/models/tagListModel";

Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);

// @ts-ignore
window.tagList = tagListModel.fetch();
// @ts-ignore
window.createTag = (name: string) => {
    const message = tagListModel.create(name);
    if (message === "duplicated") {
        window.alert("标签名已存在");
    } else if (message === "success") {
        window.alert("创建成功");
    }
};
// @ts-ignore
window.removeTag = (id: string)=>{
        if (tagListModel.remove(id)) {
            return true;
        } else {
            return false;
    }
}
// @ts-ignore
window.updateTag = (id:string,name:string)=>{
   return  tagListModel.update(id,name)
}
window.findTag =(id:string)=>{
   return  window.tagList.filter(t => t.id ===id)[0]
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
