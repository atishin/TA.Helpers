var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestApp;
(function (TestApp) {
    var SignalRService = (function (_super) {
        __extends(SignalRService, _super);
        function SignalRService($rootScope, listenerService) {
            _super.call(this, $rootScope, listenerService);
            this.$rootScope = $rootScope;
            this.listenerService = listenerService;
            this.testHub = $.connection.testHub;
            this.subscribeToAppsCallbacks();
        }
        SignalRService.prototype.subscribeToAppsCallbacks = function () {
            var _this = this;
            this.testHub.client.onTest = function (num) {
                _this.listenerService.emitOnTestEven(num);
            };
        };
        return SignalRService;
    }(TA.SignalRService.SignalRConnectionService));
    TestApp.SignalRService = SignalRService;
    TestApp.module.service('signalRService', ['$rootScope', 'ListenerService', SignalRService]);
})(TestApp || (TestApp = {}));
