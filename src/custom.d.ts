type RecordItem ={
    tags: string[]
    notes: string
    type: string
    amount: number
    createdAt?: Date
}

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

interface window{
    tagList: Tag[];
}




