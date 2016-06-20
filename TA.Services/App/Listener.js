var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TA;
(function (TA) {
    var ListenterService;
    (function (ListenterService) {
        (function (EventType) {
            EventType[EventType["TEST_EVENT"] = 0] = "TEST_EVENT";
        })(ListenterService.EventType || (ListenterService.EventType = {}));
        var EventType = ListenterService.EventType;
    })(ListenterService = TA.ListenterService || (TA.ListenterService = {}));
})(TA || (TA = {}));
var TestApp;
(function (TestApp) {
    var Listener = (function (_super) {
        __extends(Listener, _super);
        function Listener($rootScope) {
            _super.call(this, $rootScope);
            this.$rootScope = $rootScope;
            this.callbacks[TA.ListenterService.EventType.TEST_EVENT] = 'onTestEvent';
        }
        Listener.prototype.emitOnTestEven = function (num) {
            this.Emit(TA.ListenterService.EventType.TEST_EVENT, num);
        };
        return Listener;
    }(TA.ListenterService.ListenerService));
    TestApp.Listener = Listener;
    TestApp.module.service('ListenerService', ['$rootScope', Listener]);
})(TestApp || (TestApp = {}));
