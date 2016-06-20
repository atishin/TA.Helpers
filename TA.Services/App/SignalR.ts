interface ITestHubServer {
    test(num: number, num2: number);
}
interface ITestHubClient {
    onTest(num: number);
}
interface ITestHub {
    server: ITestHubServer;
    client: ITestHubClient;
}

interface SignalR {
    testHub: ITestHub;
}

namespace TestApp {
    export class SignalRService extends TA.SignalRService.SignalRConnectionService {
        public testHub: ITestHub;
        constructor(public $rootScope, public listenerService: Listener) {
            super($rootScope, listenerService);
            this.testHub = $.connection.testHub;
            this.subscribeToAppsCallbacks();
        }
        public subscribeToAppsCallbacks(): void {
            this.testHub.client.onTest = (num) => {
                this.listenerService.emitOnTestEven(num);
            };
        }
    }
    TestApp.module.service('signalRService', ['$rootScope', 'ListenerService', SignalRService]);
}