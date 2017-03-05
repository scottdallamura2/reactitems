define(["require", "exports", "react", "../contracts/Field", "../actions/ItemActions", "../stores/ItemStore", "./ItemsOverview", "./ItemDetail"], function (require, exports, React, Field_1, ItemActions_1, ItemStore_1, ItemsOverview_1, ItemDetail_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Perf = React.addons.Perf;
    // scenario setup
    for (var i = 1; i < 101; i++) {
        let item = {
            id: i,
            name: "item " + i,
            enabled: true,
            description: "item " + i + " description",
            fieldDefinitions: [],
            fieldValues: {}
        };
        for (var j = 1; j < 51; j++) {
            item.fieldDefinitions.push({ name: "textField " + j, type: Field_1.FieldTypes.String });
            item.fieldDefinitions.push({ name: "booleanField " + j, type: Field_1.FieldTypes.Boolean });
            item.fieldValues["textField " + j] = "text value " + j;
            item.fieldValues["booleanField " + j] = ((j % 2) === 0).toString();
        }
        ItemActions_1.ItemActions.itemAdded.invoke(item);
    }
    class MainControllerView extends React.Component {
        constructor() {
            super();
            this._itemStore = ItemStore_1.getInstance();
            this._onReset = () => {
                ItemActions_1.ItemActions.itemsReset.invoke({});
            };
            this._onSave = () => {
                ItemActions_1.ItemActions.itemsSaved.invoke({});
            };
            this._onItemStoreChanged = () => {
                Perf.start();
                this.setState(this._getState());
            };
            this._onItemSelected = (item) => {
                Perf.start();
                this.setState(this._getState(item));
            };
            this.state = this._getState();
        }
        render() {
            return React.createElement("div", { className: "main" },
                React.createElement("div", { className: "two-panel-container" },
                    React.createElement("div", { className: "left-panel" },
                        React.createElement(ItemsOverview_1.ItemsOverview, { items: this.state.items, selectedItem: this.state.selectedItem, onItemSelected: this._onItemSelected })),
                    React.createElement("div", { className: "right-panel" },
                        React.createElement(ItemDetail_1.ItemDetail, { item: this.state.selectedItem }))),
                React.createElement("div", { className: "footer" },
                    React.createElement("button", { onClick: this._onReset }, "Reset"),
                    React.createElement("button", { onClick: this._onSave }, "Save")));
        }
        componentDidMount() {
            this._itemStore.addListener(this._onItemStoreChanged);
        }
        componentWillUnmount() {
            this._itemStore.removeListener(this._onItemStoreChanged);
        }
        componentDidUpdate() {
            Perf.stop();
            Perf.printInclusive();
            Perf.printWasted();
        }
        _getState(selectedItem) {
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
    }
    exports.MainControllerView = MainControllerView;
});
