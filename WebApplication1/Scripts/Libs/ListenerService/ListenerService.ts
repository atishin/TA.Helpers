namespace TA.ListenterService {

    export interface IListener {
        subscribe(eventTypes: EventType[]): void;
        listenerService: ListenerService;
    }

    export enum EventType {}

    export class ListenerService {
        public listeners: Array<Array<IListener>> = [];
        public callbacks: string[] = [];
        constructor(public $rootScope: ng.IScope) { }

        private find(event: EventType, listener: IListener) {
            if (this.listeners[event] == undefined || this.listeners[event] == null) return null;
            var index = this.listeners[event].indexOf(listener);
            if (index < 0) return null;
            return this.listeners[event][index];
        }

        private contains(event: EventType, listener: IListener): boolean {
            if (this.listeners[event] == undefined || this.listeners[event] == null) return false;
            var index = this.listeners[event].indexOf(listener);
            return index >= 0;
        }

        public Subscribe(events: EventType[], listener: IListener) {
            var self = this;
            events.forEach((event) => {
                if (this.listeners[event] == undefined) {
                    this.listeners[event] = [];
                    this.$rootScope.$on(EventType[event], (angularEvent, ...args: any[]) => {
                        args.unshift(event);
                        self.Notify.apply(self, args);
                    });
                }
                if (!this.contains(event, listener)) {
                    this.listeners[event].push(listener);
                }
            });
        }

        public Notify(event: EventType, ...params: any[]) {
            if (this.listeners[event] == undefined) return;
            var self = this;
            this.listeners[event].forEach((listener) => {
                listener[self.callbacks[event]].apply(listener, params);
            });
        }

        protected Emit(event: EventType, ...params: any[]) {
            params.unshift(EventType[event]);
            this.$rootScope.$broadcast.apply(this.$rootScope, params);
        }
    }
}