const  localStoregeKeyName='recordList'
const recordListModel={
   fetch(){
      return JSON.parse(window.localStorage.getItem(localStoregeKeyName) ||'[]') as RecordItem[];
    },
    save(data:RecordItem[]){
        window.localStorage.setItem(localStoregeKeyName,JSON.stringify(data))
    },

}

export default recordListModel