import LoginActions from '../../../actions/login.actions';
import {$ngRedux} from 'ng-redux';

export default class StatisticController{
    constructor($ngRedux){
        this.data = [300, 500, 100, 40, 120];
        this.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    }
}