var TA;
(function (TA) {
    var DebugService;
    (function (DebugService_1) {
        var DebugService = (function () {
            function DebugService($log) {
                this.debugActive = false;
                this.$log = $log;
            }
            DebugService.prototype.log = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                if (!this.debugActive)
                    return;
                this.$log.log.apply(this.$log, items);
            };
            DebugService.prototype.info = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                if (!this.debugActive)
                    return;
                this.$log.info.apply(this.$log, items);
            };
            DebugService.prototype.warn = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                if (!this.debugActive)
                    return;
                this.$log.warn.apply(this.$log, items);
            };
            DebugService.prototype.error = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                if (!this.debugActive)
                    return;
                this.$log.error.apply(this.$log, items);
            };
            DebugService.prototype.debug = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                if (!this.debugActive)
                    return;
                this.$log.debug.apply(this.$log, items);
            };
            DebugService.prototype.activate = function () {
                this.debugActive = true;
                this.info("debugger activated");
            };
            DebugService.prototype.deactivate = function () {
                this.info("debugger deactivated");
                this.debugActive = false;
            };
            DebugService.prototype.isActive = function () {
                return this.debugActive;
            };
            return DebugService;
        }());
        DebugService_1.DebugService = DebugService;
        DebugService_1.module = angular.module('taDebug', []);
        TA.DebugService.module.service('taDebugService', ['$log', DebugService]);
    })(DebugService = TA.DebugService || (TA.DebugService = {}));
})(TA || (TA = {}));
