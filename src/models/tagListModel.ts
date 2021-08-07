import createId from "@/lib/createId";

const localStoregeKeyName = "tagList";
type Tag ={
    id:string;
    name:string
}
type TageListModel = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplicated' //success 文件名重复 duplicated 成功
    update:(id:string,name:string)=> 'success' | 'duplicated' | 'not found'
    save: () => void,
    remove:(id:string)=> boolean
}
const tagListModel: TageListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStoregeKeyName) || "[]");
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStoregeKeyName, JSON.stringify(this.data));
    },
    update(id,name){
        const idList = this.data.map(item =>item.id);
        if(idList.indexOf(id)>=0){
            const names =this.data.map(item =>item.name);
            if(names.indexOf(name)>=0){
                return 'duplicated';
            }else{
             const tag= this.data.filter(item =>item.id ===id)[0];
               tag.name= name;
               this.save();
               return 'success'
            }
        }else{
            return 'not found';
        }
    },

    create(name: string) {
        const id = createId().toString();
        const names =this.data.map(item =>item.name)
        if (names.indexOf(name)>=0){
            return 'duplicated'
        }
        this.data.push({id:id,name:name});
        this.save();
        return 'success';
    },
    remove(id:string){
       let index = -1;
       for(let i=0;i<this.data.length;i++){
         if(this.data[i].id ===id) {
             index = i;
             break;
         }
      }
        console.log(index);
        this.data.splice(index,1);
           this.save()
           return true;
    }
};

export default tagListModel;