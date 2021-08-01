const localStoregeKeyName = "tagList";
type TageListModel = {
    data: string[],
    fetch: () => string[],
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
        if (this.data.indexOf(name)>=0){
            return 'duplicated'
        }
        this.data.push(name);
        this.save();
        return 'success';
    }
};

export default tagListModel;