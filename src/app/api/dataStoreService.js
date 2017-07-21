export default class DataStoreService{
    constructor(){
        this.groups = [];
        this.stages = [];
    }

    setGroups(groups){
        this.groups = groups;
    }

    getGroups(){
        return this.groups;
    }
    setStages(stages){
        this.stages = stages
    }
    getStage(){
        return this.stages;
    }
}