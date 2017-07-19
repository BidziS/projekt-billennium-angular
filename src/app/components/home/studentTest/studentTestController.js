import apiService from '../../../api/apiService';

export default class StudentTestController {
    constructor(apiService) {
        this.apiService = apiService;
        this.data = [];
        this.exampleTables = [];
        this.exampleTablesColumnsName = [];
        this.isChecked = false;
        this.getExercises(1);
        this.result = [];
        this.columnsName = [];
    }

    getAllTabels() {

    }
    checkAnswer(answer) {
        this.apiService.postRequest('SQL?sqlCommand=' + answer, answer).then(response => {

            this.columnsName = Object.keys(response.data[0]);
            this.isChecked = true;
            this.result = response;
        })
    }
    getExercises(stageId) {

        this.apiService.getRequest('/api/Stages/' + stageId + '/Exercises').then(response => {
            this.data = response.data.Data.Exercises;
            this.exampleData = response.data.Data.ExampleData;
            let x = [];
            // this.exampleTablesColumnsName = Object.keys(this.exampleData[0][0])
            angular.forEach(this.exampleData, function(value, key) {
                x[key] = Object.keys(value[0])
            })
            this.exampleTablesColumnsName = x;
            angular.forEach(this.data, function(value, key) {
                value.FullName = "Zadanie " + value.Id;
            })
        })
    }
}