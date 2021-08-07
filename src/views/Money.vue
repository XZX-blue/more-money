<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <div class="notes">
      <FormItem placeholder="在这里输入备注" field-name="备注" @update:value="onupdateNotes"></FormItem>
    </div>
    <Tags :data-source.sync="tags" @update:value="onupdateTags"></Tags>
  </Layout>
</template>

<script lang="ts">

import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import FormItem from "@/components/money/FromItem.vue";
import Tags from "@/components/money/Tags.vue";
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";


// eslint-disable-next-line no-undef
const recordList = recordListModel.fetch();


@Component({
  components: {Tags,  FormItem, Types, NumberPad},
})
export default class Money extends Vue {
  tags = window.tagList;
  // eslint-disable-next-line no-undef
  recordList: RecordItem[] = recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onupdateTags(value: string[]) {
    console.log(value);
    this.record.tags = value;
  }

  onupdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    recordListModel.create(this.record)
  }

  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save();
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
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
.notes{
  padding: 12px 0;
}
</style>



