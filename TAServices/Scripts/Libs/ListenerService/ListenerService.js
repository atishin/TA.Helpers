var TA;
(function (TA) {
    var ListenterService;
    (function (ListenterService) {
        (function (EventType) {
        })(ListenterService.EventType || (ListenterService.EventType = {}));
        var EventType = ListenterService.EventType;
        var ListenerService = (function () {
            function ListenerService($rootScope) {
                this.$rootScope = $rootScope;
                this.listeners = [];
                this.callbacks = [];
            }
            ListenerService.prototype.find = function (event, listener) {
                if (this.listeners[event] == undefined || this.listeners[event] == null)
                    return null;
                var index = this.listeners[event].indexOf(listener);
                if (index < 0)
                    return null;
                return this.listeners[event][index];
            };
            ListenerService.prototype.contains = function (event, listener) {
                if (this.listeners[event] == undefined || this.listeners[event] == null)
                    return false;
                var index = this.listeners[event].indexOf(listener);
                return index >= 0;
            };
            ListenerService.prototype.Subscribe = function (events, listener) {
                var _this = this;
                var self = this;
                events.forEach(function (event) {
                    if (_this.listeners[event] == undefined) {
                        _this.listeners[event] = [];
                        _this.$rootScope.$on(EventType[event], function (angularEvent) {
                            var args = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                args[_i - 1] = arguments[_i];
                            }
                            self.Notify.apply(self, args);
                        });
                    }
                    if (!_this.contains(event, listener)) {
                        _this.listeners[event].push(listener);
                    }
                });
            };
            ListenerService.prototype.Notify = function (event) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                if (this.listeners[event] == undefined)
                    return;
                var self = this;
                this.listeners[event].forEach(function (listener) {
                    listener[self.callbacks[event]].apply(listener, params);
                });
            };
            ListenerService.prototype.Emit = function (event) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                var args = [EventType[event]];
                args.push.apply(args, params);
                this.$rootScope.$broadcast.apply(this.$rootScope, args);
            };
            return ListenerService;
        }());
        ListenterService.ListenerService = ListenerService;
    })(ListenterService = TA.ListenterService || (TA.ListenterService = {}));
})(TA || (TA = {}));
