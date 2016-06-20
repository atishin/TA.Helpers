namespace TA.DebugService {

    export interface IDebugService {
        log(...items: any[]);
        info?(...items: any[]);
        warn?(...items: any[]);
        error?(...items: any[]);
        debug?(...items: any[]);
        isActive(): boolean;
        activate(): void;
        deactivate(): void;
    }

    export class DebugService implements IDebugService {
        private debugActive: boolean = false;
        private $log: ng.ILogService;

        public log(...items: any[]) {
            if (!this.debugActive) return;
            this.$log.log.apply(this.$log, items);
        }
        public info(...items: any[]) {
            if (!this.debugActive) return;
            this.$log.info.apply(this.$log, items);
        }
        public warn(...items: any[]) {
            if (!this.debugActive) return;
            this.$log.warn.apply(this.$log, items);
        }
        public error(...items: any[]) {
            if (!this.debugActive) return;
            this.$log.error.apply(this.$log, items);
        }
        public debug(...items: any[]) {
            if (!this.debugActive) return;
            this.$log.debug.apply(this.$log, items);
        }
        public activate(): void {
            this.debugActive = true;
            this.info("debugger activated");
        }
        public deactivate(): void {
            this.info("debugger deactivated");
            this.debugActive = false;
        }
        public isActive(): boolean {
            return this.debugActive;
        }
        constructor($log: ng.ILogService) {
            this.$log = $log;
        }
    }
    export var module = angular.module('taDebug', []);

    TA.DebugService.module.service('taDebugService', ['$log', DebugService]);
}
