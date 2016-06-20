var TA;
(function (TA) {
    var SignalRService;
    (function (SignalRService) {
        var Callback = (function () {
            function Callback(callback, params) {
                this.callback = callback;
                this.params = params;
            }
            Callback.prototype.execute = function () {
                this.callback.apply(this, this.params);
            };
            return Callback;
        }());
        var SignalRConnectionService = (function () {
            function SignalRConnectionService($rootScope, listenerService) {
                this.$rootScope = $rootScope;
                this.listenerService = listenerService;
                this.hubStarted = false;
                this.signalRState = 4 /* Disconnected */;
                this.callbacksQueue = [];
                var self = this;
                this.hubStarted = false;
                self.signalRState = 4 /* Disconnected */;
                self.subscribeToAppsCallbacks();
                $.connection.hub.stateChanged(function (states) {
                    self.signalRState = states.newState;
                    if (states.newState == 1 /* Connected */) {
                        var callbacks = [];
                        self.callbacksQueue.forEach(function (item, index, array) {
                            if (self.signalRState == 1 /* Connected */) {
                                item.execute();
                                callbacks.push(item);
                            }
                        });
                        callbacks.forEach(function (item, index, array) {
                            self.callbacksQueue = self.callbacksQueue.splice(self.callbacksQueue.indexOf(item), 1);
                        });
                    }
                });
            }
            SignalRConnectionService.prototype.connect = function (callback) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                var self = this;
                if (self.signalRState == 1 /* Connected */) {
                    self.applyCallback(callback, params);
                }
                else if (self.signalRState == 0 /* Connecting */ || self.signalRState == 2 /* Reconnecting */) {
                    self.callbacksQueue.push(new Callback(callback, params));
                }
                else {
                    $.connection.hub.start().done(function () {
                        self.hubStarted = true;
                        self.applyCallback(callback, params);
                    });
                }
            };
            SignalRConnectionService.prototype.applyCallback = function (callback) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                callback.apply(this, params);
            };
            return SignalRConnectionService;
        }());
        SignalRService.SignalRConnectionService = SignalRConnectionService;
    })(SignalRService = TA.SignalRService || (TA.SignalRService = {}));
})(TA || (TA = {}));
