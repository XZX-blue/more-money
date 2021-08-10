import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex)
type RootState = {
  recordList:RecordItem[],
  tagList:  Tag[],
  currentTag?: Tag,
}

const store = new Vuex.Store({
  state: {
    recordList:[],
    tagList:[] ,
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t: { id: string; }) => t.id === id)[0];

    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || "[]");
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]") as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList && state.recordList.push(record2);
      store.commit("saveRecords")
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
          JSON.stringify(state.recordList));
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名已存在");
      }
      const id = createId().toString();
      state.tagList.push({id: id, name: name});
      store.commit("saveTags");
      window.alert("创建成功");
    },
    saveTags() {
      window.localStorage.setItem('tagList', JSON.stringify(this.tagList));
    },
    updateTag(state, object: { id: string, name: string }) {
      const id = object.id;
      const name = object.name;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名已存在')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if(index>=0){
        state.tagList.splice(index, 1);
        window.alert('删除成功')
        router.back()
      }else{
        window.alert('删除失败')
      }

      store.commit("saveTags");
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store