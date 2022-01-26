<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"></Tabs>
    <div class="notes">
      <FormItem placeholder="在这里输入备注"
                field-name="备注"
                :value.sync="record.notes"
               ></FormItem>
    </div>
    <div class="createdAt">
      <FormItem placeholder="在这里输入日期"
                type="date"
                field-name="日期"
                :value.sync="record.createdAt"
      ></FormItem>
    </div>
    <Tags @update:value="record.tags=$event" ></Tags>
  </Layout>
</template>

<script lang="ts">

import NumberPad from "@/components/money/NumberPad.vue";
import FormItem from "@/components/money/FromItem.vue";
import Tags from "@/components/money/Tags.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import _ from 'lodash';

@Component({
  components: {Tabs, Tags,  FormItem,  NumberPad},
  computed:{
  }
})
export default class Money extends Vue {

 get recordList(){
    return this.$store.state.recordList;
  }

  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: dayjs(new Date()).format('YYYY-MM-DD'),
  };
  created(){
    this.$store.commit("fetchRecords")
    console.log(this.recordList[0]);
  }
  // onupdateNotes(value: string) {
  //   this.record.notes = value;
  // }

  saveRecord() {
    if( !this.record.tags.length ||this.record.tags.length===0){
      return  window.alert('请至少选择一个标签');
    }
   this.$store.commit("createRecord",this.record)
   if(this.$store.state.createRecordError ===null){
     window.alert('已保存')
     this.record.notes='';
     this.$router.go(0);
   }
  }

  recordTypeList = recordTypeList;



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



