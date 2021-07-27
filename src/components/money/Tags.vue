<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
     <li v-for="tag in dataSource" :key="tag"
     @click="select(tag)"
         :class="selectedTags.indexOf(tag)>=0 && 'selected'">{{tag}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[] | undefined;
  selectedTags: string[] = [];
  select(tag:string){
    const index =this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tag);
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

  > .current {
    display: flex;

    > li {
      $bg:#d9d9d9;
      background:$bg;
      $h: 24px;
      height: $h;
      line-height: 24px;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      &.selected{
        background: darken($bg,50%);
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