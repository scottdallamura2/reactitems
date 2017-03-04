import { ItemActions, FieldValueChangedPayload, PropertyChangedPayload } from "../actions/ItemActions";
import { Item } from "../contracts/Item";
import { ItemModel } from "../models/ItemModel";
import { Store } from "./store";

export class ItemStore extends Store {
    private _items2: { [id: string]: Item } = {};
    private _items: { [id: string]: ItemModel } = {};

    constructor() {
        super();

        ItemActions.itemAdded.addListener(this._onItemAdded);
        ItemActions.fieldValueChanged.addListener(this._onFieldValueChanged);
        ItemActions.propertyValueChanged.addListener(this._onPropertyValueChanged);
        ItemActions.itemsSaved.addListener(this._onItemsSaved);
        ItemActions.itemsReset.addListener(this._onItemsReset);
    }

    public getItems(): ItemModel[] {
        let items: ItemModel[] = [];

        for (let i in this._items) {
            items.push(this._items[i]);
        }

        return items;
    }

    public getItem(id: number): ItemModel {
        return this._items[id.toString()];
    }

    private _onItemAdded = (item: Item): void => {
        this._items[item.id.toString()] = new ItemModel(item);
        this.emitChanged();
    };

    private _onFieldValueChanged = (payload: FieldValueChangedPayload): void => {
        let item = this._items[payload.itemId];
        if (item) {
            item.fields[payload.fieldName].setValue(payload.newValue);
            this.emitChanged();
        }
    };

    private _onPropertyValueChanged = (payload: PropertyChangedPayload): void => {
        let item = this._items[payload.itemId];
        if (item) {
            switch (payload.propertyName) {
                case "name":
                    item.name.setValue(payload.newValue);
                    break;
                case "description":
                    item.description.setValue(payload.newValue);
                    break;
                case "enabled":
                    item.enabled.setValue(payload.newValue);
                    break;
            }
            this.emitChanged();
        }
    };

    private _onItemsSaved = (): void => {
        // simulate save
        for (let i in this._items) {
            this._items[i].save();
        }
        this.emitChanged();
    }

    private _onItemsReset = (): void => {
        for (let i in this._items) {
            this._items[i].reset();
        }
        this.emitChanged();
    }
}

const _instance = new ItemStore();
export function getInstance(): ItemStore {
    return _instance;
}