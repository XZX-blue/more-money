<template>
  <div class="x">
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type "></Tabs>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
      <div>
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{group.title}}</h3>
           <ol>
             <li v-for="item in group.items" :key="item.id" class="record">
               <span>{{tagString(item.tags)}}</span>
               <span class="notes">{{item.notes}}</span>
               <span>￥{{item.amount}}</span>
             </li>
           </ol>
          </li>
        </ol>
      </div>
    </Layout>
  </div>
</template>
<style lang="scss" scoped>
%item{
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  align-items: center;
}
 .title{
    @extend %item;

 }
 .record{
   background: white;
   @extend %item;
 }
</style>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: {Tabs,}
})
export default class Statistics extends Vue {
  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const recordList = this.recordList;
    // eslint-disable-next-line no-undef
    type HashTableValue ={title:string,items:RecordItem[]};
    const hashTable:{[key:string]:HashTableValue} = {};
    for (let i = 0; i < this.recordList.length; i++) {
      // eslint-disable-next-line no-unused-vars
      const [date,time] = recordList[i].createdAt!.split("T");
      hashTable[date] =hashTable[date] || {title:date,items:[]};
      hashTable[date].items.push(recordList[i]);
    }

    return hashTable;
  }

  // eslint-disable-next-line no-undef
  tagString(tags:string[]){
     return tags.length===0 ? '无':tags.join(',');
  }

  created() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  typeList = recordTypeList;
}
</script>
<style scoped lang="scss">
.x ::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #C4C4C4;

    &::after {
      display: none;
    }
  }
}
.record{
  display: flex;
  justify-content: space-between;
}
.notes{
  margin-right: auto;
  margin-left: 8px;
  color: #999999;

}
::v-deep li.interval-tabs-item {
  height: 48px;
}

</style>
