var TestApp;
(function (TestApp) {
    var TestController = (function () {
        function TestController(logger, listenerService, signalr) {
            this.logger = logger;
            this.listenerService = listenerService;
            this.signalr = signalr;
            this.num = 1;
            this.num2 = 2;
            this.logger.activate();
            this.subscribe();
            this.signalr.connect();
        }
        TestController.prototype.onTestEvent = function (num) {
            this.logger.info('onTestEvent', num);
        };
        TestController.prototype.subscribe = function () {
            this.listenerService.Subscribe([
                TA.ListenterService.EventType.TEST_EVENT
            ], this);
        };
        TestController.prototype.emit = function () {
            this.listenerService.emitOnTestEven(this.num);
        };
        TestController.prototype.sum = function () {
            this.signalr.testHub.server.test(this.num, this.num2);
        };
        return TestController;
    }());
    TestApp.module.controller('TestController', ['taDebugService', 'ListenerService', 'signalRService', TestController]);
})(TestApp || (TestApp = {}));
