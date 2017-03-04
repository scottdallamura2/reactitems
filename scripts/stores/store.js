define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Store {
        constructor() {
            this._changedListeners = [];
        }
        addListener(listener) {
            this._changedListeners.push(listener);
        }
        removeListener(listener) {
            let index = this._changedListeners.indexOf(listener);
            if (index >= 0) {
                this._changedListeners.splice(index, 1);
            }
        }
        emitChanged() {
            this._changedListeners.forEach((listener) => {
                listener();
            });
        }
    }
    exports.Store = Store;
});
