import apiService from '../../../api/apiService';
import { $stateParams, $state } from '@uirouter/angularjs';
import dirPaginate from 'angular-utils-pagination';
import { $mdDialog, $mdToast } from 'angular-material';



export default class StudentTestController {
    constructor($stateParams, apiService, $mdDialog, $mdToast, $state) {
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.$mdToast = $mdToast;
        this.apiService = apiService;
        this.data = [];
        this.exampleData = [];
        this.exampleTablesColumnsName = [];
        this.isChecked = false;
        this.getExercises();
        this.result = [];
        this.savedAnswer = [];
        this.columnsName = [];
        this.exampleTablesName = [];
        this.warningsCount = 0;
        this.exerciseCount = 0;
       /* this.id;
        this.solution;
        this.answers = [
            this.id,
            this.solution
        ];*/
       this.answers = {
           Warnings : this.warningsCount,
           Solutions : []
       };


    }


    checkAnswer(answer) {
        this.apiService.postRequest('SQL?sqlCommand=' + answer, answer).then(response => {

            this.columnsName = Object.keys(response.data[0]);
            this.isChecked = true;
            this.result = response;
        })
    }
    getExercises() {

        this.apiService.getRequest('/api/Stages/' + this.$stateParams.id + '/Exercises').then(response => {
            this.data = response.data.Data.Exercises;

            this.exerciseCount = this.data.length;
            angular.forEach(this.data, function (value, key) {
                value.Number = key+1;
            });
            let tmp = [];
            this.exampleTablesName = response.data.Data.ExampleData[0];
            angular.forEach(response.data.Data.ExampleData, function (value, key) {
                if(key !== 0){
                    tmp[key-1] = value;
                }
            });
            this.exampleData = tmp;
            //this.exampleData = response.data.Data.ExampleData;
            let x = [];
            // this.exampleTablesColumnsName = Object.keys(this.exampleData[0][0])
            angular.forEach(this.exampleData, function(value, key) {
                x[key] = Object.keys(value[0])
            });
            this.exampleTablesColumnsName = x;
            angular.forEach(this.data, function(value, key) {
                value.FullName = "Zadanie " + value.Id;
            })
        })
    }
    addAnswer(answerToAdd, exerciseId){
        let flag = false;
        angular.forEach(this.answers.Solutions, function (value, key) {
            if(value.ExerciseId === exerciseId){
                value.Answer = answerToAdd;
                flag = true;
            }
        })
        if(flag === false){
            this.answers.Solutions.push(
                {
                    ExerciseId : exerciseId,
                    Answer : answerToAdd}
            )

        }
        this.savedAnswer[exerciseId] = answerToAdd;

    }

    showConfirm(){
        let confirm = this;
        this.answers.Warnings++;
        let conf = confirm.$mdDialog.confirm()
            .title(`Nie ściągaj, jeszcze `+(3-this.answers.Warnings)+' razy i stracisz możliwość rozwiązywania zadań')
            .textContent('')
            .ariaLabel('')
            //.targetEvent(ev)
            .ok('Confirm')
            .cancel('Abort');

        confirm.$mdDialog.show(conf);

        // if warnings===3 send answers
    }
    sendSolutions(){
        this.apiService.postRequest('api/Stages/'+this.$stateParams.id+'/Solution',this.answers).then(response =>{

        })
        this.$state.go('home.statistic');
    }


}