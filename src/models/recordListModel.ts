import clone from "@/lib/clone";

const  localStoregeKeyName='recordList'

const recordListModel={
    data:[] as RecordItem[],
   fetch(){
      this.data= JSON.parse(window.localStorage.getItem(localStoregeKeyName) ||'[]') as RecordItem[];
        return this.data;
      },
    save(){
        window.localStorage.setItem(localStoregeKeyName,
            JSON.stringify(this.data))
    },
    create(record:RecordItem){
        // eslint-disable-next-line no-undef
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
        this.data.push(record2);
        this.save()
    }
}

export default recordListModel