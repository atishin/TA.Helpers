namespace TestApp {
    class TestController implements IOnTestEventListener {
        constructor(public logger: TA.DebugService.DebugService, public listenerService: Listener, public signalr: SignalRService) {
            this.logger.activate();
            this.subscribe();
            this.signalr.connect();
        }

        public num: number = 1;
        public num2: number = 2;

        public onTestEvent(num: number) {
            this.logger.info('onTestEvent', num);
        }

        public subscribe() {
            this.listenerService.Subscribe([
                TA.ListenterService.EventType.TEST_EVENT
            ], this);
        }

        public emit() {
            this.listenerService.emitOnTestEven(this.num);
        }

        public sum() {
            this.signalr.testHub.server.test(this.num, this.num2);
        }

    }

    TestApp.module.controller('TestController', ['taDebugService', 'ListenerService', 'signalRService', TestController]);
}