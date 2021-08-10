<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <div class="notes">
      <FormItem placeholder="在这里输入备注" field-name="备注" @update:value="onupdateNotes"></FormItem>
    </div>
    <Tags ></Tags>
  </Layout>
</template>

<script lang="ts">

import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import FormItem from "@/components/money/FromItem.vue";
import Tags from "@/components/money/Tags.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";


@Component({
  components: {Tags,  FormItem, Types, NumberPad},
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
  };
  created(){
    this.$store.commit("fetchRecords")
  }
  onupdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
   this.$store.commit("saveRecords")
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



