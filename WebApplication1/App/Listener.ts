namespace TA.ListenterService {
    export enum EventType {
        TEST_EVENT
    }
}
namespace TestApp {

    export interface IOnTestEventListener extends TA.ListenterService.IListener {
        onTestEvent(num: number): void;
    }

    export class Listener extends TA.ListenterService.ListenerService {
        constructor(public $rootScope: ng.IScope) {
            super($rootScope);
            this.callbacks[TA.ListenterService.EventType.TEST_EVENT] = 'onTestEvent';
        }

        emitOnTestEven(num: number): void {
            this.Emit(TA.ListenterService.EventType.TEST_EVENT, num);
        }
    }

    TestApp.module.service('ListenerService', ['$rootScope', Listener]);
}