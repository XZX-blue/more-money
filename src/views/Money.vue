<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
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
import {Component, Watch} from "vue-property-decorator";
import model from "@/model";
import RecordItem from "@/custom";

const recodList:RecordItem[] =model.fetch()

@Component( {components:{Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '彩票']
  recordList: RecordItem[]=recodList;
  record: RecordItem ={
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

  saveRecord(){
    const record2: RecordItem=model.clone(this.record)
    record2.createdAt=new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
    onRecordListChange(){
    model.save(this.recordList)
  }


  // onupdateType(value:string){
  //   this.record.type=value;
  //
  // }
  // onupdateAmount(value:string){
  //   this.record.amount=parseFloat(value);
  //
  // }
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



