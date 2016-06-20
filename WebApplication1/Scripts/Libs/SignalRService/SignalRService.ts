namespace TA.SignalRService {

    class Callback {
        public callback: Function;
        public params: any[];

        constructor(callback: Function, params: any[]) {
            this.callback = callback;
            this.params = params;
        }
        public execute(): void {
            this.callback.apply(this, this.params);
        }
    }

    export abstract class SignalRConnectionService {

        private hubStarted: boolean = false;
        public signalRState: number = SignalR.ConnectionState.Disconnected;
        private callbacksQueue: Callback[] = [];

        constructor(public $rootScope: ng.IScope, public listenerService: TA.ListenterService.ListenerService) {
            var self = this;
            this.hubStarted = false;

            self.signalRState = SignalR.ConnectionState.Disconnected;

            $.connection.hub.stateChanged((states) => {
                self.signalRState = states.newState;
                if (states.newState == SignalR.ConnectionState.Connected) {
                    var callbacks: Callback[] = [];
                    self.callbacksQueue.forEach((item, index, array) => {
                        if (self.signalRState == SignalR.ConnectionState.Connected) {
                            item.execute();
                            callbacks.push(item);
                        }
                    });
                    callbacks.forEach((item, index, array) => {
                        self.callbacksQueue = self.callbacksQueue.splice(self.callbacksQueue.indexOf(item), 1);
                    });
                }
            });
        }

        public abstract subscribeToAppsCallbacks(): void;

        public connect(callback?: Function, ...params: any[]): void {
            var self = this;
            if (self.signalRState == SignalR.ConnectionState.Connected) {
                if (callback) {
                    self.applyCallback(callback, params);
                }
            }
            else if (self.signalRState == SignalR.ConnectionState.Connecting || self.signalRState == SignalR.ConnectionState.Reconnecting) {
                if (callback) {
                    self.callbacksQueue.push(new Callback(callback, params));
                }
            }
            else {
                $.connection.hub.start().done(function () {
                    self.hubStarted = true;
                    if (callback) {
                        self.applyCallback(callback, params);
                    }
                });
            }
        }

        private applyCallback(callback: Function, ...params: any[]) {
            callback.apply(this, params);
        }
    }
}