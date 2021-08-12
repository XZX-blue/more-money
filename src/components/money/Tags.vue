<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          @click="toggle(tag.name)"
          :class="selectedTags.indexOf(tag.name)>=0 && 'selected'">{{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";


@Component({
  computed: {

  }
})

export default class Tags extends Vue {
 get  tagList() {
   return this.$store.state.tagList;
 }
  selectedTags: string[] = [];

  created() {
    this.$store.commit('fetchTags')
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }

    console.log(this.selectedTags);
    this.$emit("update:value", this.selectedTags);
  }

  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      window.alert("标签名不能为空");
      return;
    } else {
     this.$store.commit("createTag",name)
    }
  }
}
</script>

<style scoped lang="scss">
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background: white;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      margin-top: 3px;
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: 24px;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;

      &.selected {
        background: darken($bg, 50%);
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999;
      padding: 0 4px;
    }
  }
}

</style>