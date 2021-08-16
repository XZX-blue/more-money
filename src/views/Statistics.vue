<template>
  <div class="x">
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type "></Tabs>
           <div>
        <ol v-if="groupedList.length>0">
          <li v-for="(group,index) in groupedList" :key="index">

            <h3 class="title">{{beautify(group.title)}} <span>总计：{{group.total}}元</span></h3>
           <ol>
             <li v-for="item in group.items" :key="item.id" class="record">
               <span>{{tagString(item.tags)}}</span>
               <span class="notes">{{item.notes}}</span>
               <span>￥{{item.amount}}</span>
             </li>
           </ol>
          </li>
        </ol>
             <div v-else class="no-result">
               目前没有相关记录
             </div>
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
    justify-content: space-between;
 }
 .record{
   background: white;
   @extend %item;
 }
</style>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: {Tabs,}
})
export default class Statistics extends Vue {
  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const recordList = this.recordList;
    if(recordList.length===0){return  []}
    const newList = clone(recordList).filter(r=>r.type ===this.type).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    if(newList.length>0){
      // eslint-disable-next-line no-undef
      type Result = {title:string,total?:number,items:RecordItem[]}[]
      const result:Result =[{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      for(let i=1;i<newList.length;i++){
        const current = newList[i];
        const last =result[result.length-1];
        if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
          last.items.push(current)
        }else{
          result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current] });
        }
      }
      result.forEach(group=>{
        group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
      })
      return result;
    }else{
      return [];
    }

  }

  // eslint-disable-next-line no-undef
  tagString(tags:Tag[]){
     return tags.length===0 ? '无':tags.map(t=>t.name).join(',');
  }

  beautify(string:string){
    const day= dayjs(string)
    const now = dayjs();
    if(day.isSame(now,"day")){
      return '今天';
    }else if(day.isSame(now.subtract(1,"day"),"day")){
      return '昨天';
    }else if(day.isSame(now.subtract(2,"day"),"day")){
      return '前天';
    }else if(day.isSame(now,"year")){
      return day.format('M月D');
    }else{
      return day.format('YYYY年M月D日')
    }
  }

  created() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
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
.no-result{
  padding: 16px;
  text-align: center;
}

</style>
