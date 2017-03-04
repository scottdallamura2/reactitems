export class Store {
    private _changedListeners: (() => void)[] = [];

    public addListener(listener: () => void): void {
        this._changedListeners.push(listener);
    }

    public removeListener(listener: () => void): void {
        let index = this._changedListeners.indexOf(listener);
        if (index >= 0) {
            this._changedListeners.splice(index, 1);
        }
    }

    public emitChanged(): void {
        this._changedListeners.forEach((listener) => {
            listener();
        });
    }
}