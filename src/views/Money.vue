<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount" ></NumberPad>
    <Types :value.sync="record.type" ></Types>
    <Notes @update:value="onupdateNotes"></Notes>
    <Tags :data-source.sync="tags" @update:value="onupdateTags"></Tags>
  </Layout>
</template>

<script lang="ts" >

import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";

type Record ={
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component( {components:{Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '彩票']
  record: Record ={
    tags:[],
    notes:'',
    type:'-',
    amount: 0,
  }

  onupdateTags(value:string[]){
   this.record.tags=value;
  }
  onupdateNotes(value:string){
    this.record.notes=value;

  }
  // onupdateType(value:string){
  //   this.record.type=value;
  //
  // }
  onupdateAmount(value:string){
    this.record.amount=parseFloat(value);

  }
}

</script>

<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>
<style lang="scss" scoped>
</style>



