import { $q, $rootScope, $log } from 'angular';

// export default class LoadingInterceptor{
//     constructor($q, $rootScope, $log){
//         this.$q = $q;
//         this.$rootScope = $rootScope;
//         this.$log = $log;
//         this.xhrCreations = 0;
//         this.xhrResolutions = 0;
//     }

//     isLoading() {
//         return xhrResolutions < xhrCreations;
//     }

//     updateStatus() {
//         $rootScope.loading = isLoading();
//     }

//     request(config) {
//         this.xhrCreations++;
//         this.updateStatus();
//         return config;
//     }
//     requestError(rejection) {
//         this.xhrResolutions++;
//         this.updateStatus();
//         this.$log.error('Request error:', rejection);
//         return this.$q.reject(rejection);
//     }
//     response(response) {
//         this.xhrResolutions++;
//         this.updateStatus();
//         return response;
//     }
//     responseError(rejection) {
//         this.xhrResolutions++;
//         this.updateStatus();
//         this.$log.error('Response error:', rejection);
//         return this.$q.reject(rejection);
//     }
     
// }
function LoadingInterceptor ($q, $rootScope, $log) {
    'use strict';
 
    var xhrCreations = 0;
    var xhrResolutions = 0;
 
    function isLoading() {
        return xhrResolutions < xhrCreations;
    }
 
    function updateStatus() {
        $rootScope.loading = isLoading();
    }
 
    return {
        request: function (config) {
            xhrCreations++;
            updateStatus();
            return config;
        },
        requestError: function (rejection) {
            xhrResolutions++;
            updateStatus();
            $log.error('Request error:', rejection);
            return $q.reject(rejection);
        },
        response: function (response) {
            xhrResolutions++;
            updateStatus();
            return response;
        },
        responseError: function (rejection) {
            xhrResolutions++;
            updateStatus();
            $log.error('Response error:', rejection);
            return $q.reject(rejection);
        }
    };
};

export default LoadingInterceptor;