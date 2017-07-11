import GenericController from './genericController';

module.exports = {
    template: require('./generic.html'),
    controller: GenericController,
    controllerAs: 'generic',
    bindings:{
        path: '@'
    }
};
