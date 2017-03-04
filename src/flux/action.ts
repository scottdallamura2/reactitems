export class Action<T> {
    private static _actionExcecuting: boolean = false;

    private _listeners: ((payload: T) => void)[] = [];

    public invoke(payload: T): void {
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

    public addListener(listener: (payload: T) => void): void {
        this._listeners.push(listener);
    }

    public removeListener(listener: (payload: T) => void): void {
        let index = this._listeners.indexOf(listener);
        if (index >= 0) {
            this._listeners.splice(index, 1);
        }
    }
}