import LoginActions from '../../../actions/login.actions';
import {$ngRedux} from 'ng-redux';

export default class StatisticController{
    constructor($ngRedux){
        this.todo = '';
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, LoginActions)(this);
        this.showSite = true;
    }

    logInToSite(){
        this.logIn();
    }

    logOutToSite(){
        this.logOut();
    }

    $onInit(){
        this.showSite = true;
    }

    $onDestroy(){
        this.showSite = false;
        this.unsubscribe();
    }

    mapStateToThis(state) {
        return {
            isLogIn: state.isLogIn
        };
    }
}