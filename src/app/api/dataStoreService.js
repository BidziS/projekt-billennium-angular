export default class DataStoreService{
    constructor(){
        this.groups = [];
    }

    setGroups(groups){
        this.groups = groups;
    }

    getGroups(){
        return this.groups;
    }
}