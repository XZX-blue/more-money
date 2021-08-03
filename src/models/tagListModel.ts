const localStoregeKeyName = "tagList";
type Tag ={
    id:string;
    name:string
}
type TageListModel = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplicated' //success 文件名重复 duplicated 成功
    save: () => void,
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

    create(name: string) {
        const names =this.data.map(item =>item.name)
        if (names.indexOf(name)>=0){
            return 'duplicated'
        }
        this.data.push({id:name,name:name});
        this.save();
        return 'success';
    }
};

export default tagListModel;