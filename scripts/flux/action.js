define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Action {
        constructor() {
            this._listeners = [];
        }
        invoke(payload) {
            if (Action._actionExcecuting) {
                throw new Error("cascading actions are bad");
            }
            Action._actionExcecuting = true;
            try {
                this._listeners.forEach((listener) => {
                    listener(payload);
                });
            }
            finally {
                Action._actionExcecuting = false;
            }
        }
        addListener(listener) {
            this._listeners.push(listener);
        }
        removeListener(listener) {
            let index = this._listeners.indexOf(listener);
            if (index >= 0) {
                this._listeners.splice(index, 1);
            }
        }
    }
    Action._actionExcecuting = false;
    exports.Action = Action;
});
