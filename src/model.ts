import RecordItem from "@/custom";
const  localStoregeKeyName='recordList'
const model={
   fetch(){
      return JSON.parse(window.localStorage.getItem(localStoregeKeyName) ||'[]') as RecordItem[];
    },
    save(data:RecordItem[]){
        window.localStorage.setItem(localStoregeKeyName,JSON.stringify(data))
    },
    clone(data:RecordItem[] |RecordItem){
       return JSON.parse(JSON.stringify(data));
    }
}

export default model