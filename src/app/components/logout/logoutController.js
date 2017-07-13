import sessionStorageService from '../../api/sessionStorageService';

export default class LogoutController{
    constructor(sessionStorageService){
        this.SessionStorageService = sessionStorageService;
        this.SessionStorageService.setItemInStorage({}, 'token');
    }
    
}