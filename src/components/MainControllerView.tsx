import * as React from "react";

import { Field, FieldTypes } from "../contracts/Field";

import { Item } from "../contracts/Item";
import { ItemActions } from "../actions/ItemActions";
import { ItemStore, getInstance as getItemStore } from "../stores/ItemStore";
import { ItemModel } from "../models/ItemModel";

import { ItemsOverview } from "./ItemsOverview";
import { ItemDetail } from "./ItemDetail";

let Perf = (React as any).addons.Perf;

// scenario setup
for (var i = 1; i < 101; i++) {
    let item: Item = {
        id: i,
        name: "item " + i,
        enabled: true,
        description: "item " + i + " description",
        fieldDefinitions: [],
        fieldValues: {}
    };

    for (var j = 1; j < 51; j++) {
        item.fieldDefinitions.push({ name: "textField " + j, type: FieldTypes.String });
        item.fieldDefinitions.push({ name: "booleanField " + j, type: FieldTypes.Boolean });
        item.fieldValues["textField " + j] = "text value " + j;
        item.fieldValues["booleanField " + j] = ((j % 2) === 0).toString();
    }

    ItemActions.itemAdded.invoke(item);
}

/*let item1: Item = {
    id: 1,
    name: "my first item",
    enabled: true,
    description: "",
    fieldDefinitions: [
        { name: "textField", type: FieldTypes.String },
        { name: "booleanField", type: FieldTypes.Boolean },
    ],
    fieldValues: {}
};
item1.fieldValues["textField"] = "text value";
item1.fieldValues["booleanField"] = "true";

let item2: Item = {
    id: 2,
    name: "my second item",
    enabled: false,
    description: "initially disabled",
    fieldDefinitions: [
        { name: "textField", type: FieldTypes.String },
        { name: "booleanField", type: FieldTypes.Boolean },
        { name: "anotherField", type: FieldTypes.String },
    ],
    fieldValues: {}
};
item2.fieldValues["textField"] = "";
item2.fieldValues["booleanField"] = "false";
item2.fieldValues["anotherField"] = "another value";

ItemActions.itemAdded.invoke(item1);
ItemActions.itemAdded.invoke(item2);*/

export interface Props {
}

export interface State {
    items: ItemModel[];
    selectedItem: ItemModel;
}

export class MainControllerView extends React.Component<Props, State> {
    private _itemStore: ItemStore = getItemStore();

    constructor() {
        super();

        this.state = this._getState();
    }

    public render(): JSX.Element {
        return <div className="main">
            <div className="two-panel-container">
                <div className="left-panel">
                    <ItemsOverview items={this.state.items} selectedItem={this.state.selectedItem} onItemSelected={this._onItemSelected} />
                </div>
                <div className="right-panel">
                    <ItemDetail item={this.state.selectedItem} />
                </div>
            </div>
            <div className="footer">
                <button onClick={this._onReset}>Reset</button>
                <button onClick={this._onSave}>Save</button>
            </div>
        </div>;
    }

    public componentDidMount(): void {
        this._itemStore.addListener(this._onItemStoreChanged);
    }

    public componentWillUnmount(): void {
        this._itemStore.removeListener(this._onItemStoreChanged);
    }

    public componentDidUpdate(): void {
        Perf.stop();
        Perf.printInclusive();
        Perf.printWasted();
    }

    private _onReset = (): void => {
        ItemActions.itemsReset.invoke({});
    };

    private _onSave = (): void => {
        ItemActions.itemsSaved.invoke({});
    };

    private _getState(selectedItem?: ItemModel): State {
        let items = this._itemStore.getItems();
        if (!selectedItem && this.state) {
            selectedItem = this.state.selectedItem;
        }
        selectedItem = selectedItem || items[0];

        return {
            items: items,
            selectedItem: selectedItem
        };
    }

    private _onItemStoreChanged = (): void => {
        Perf.start();
        this.setState(this._getState());
    };

    private _onItemSelected = (item: ItemModel): void => {
        Perf.start();
        this.setState(this._getState(item));
    }
}
