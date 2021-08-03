<template>
  <Layout class-prefix="layout">
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
const recodList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {Tags,  FormItem, Types, NumberPad},
})
export default class Money extends Vue {
  tags = tagList;
  // eslint-disable-next-line no-undef
  recordList: RecordItem[] = recodList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onupdateTags(value: string[]) {
    this.record.tags = value;
  }

  onupdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    // eslint-disable-next-line no-undef
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
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



