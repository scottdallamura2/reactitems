define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemsOverview extends React.Component {
        constructor() {
            super(...arguments);
            this._onItemClick = (item) => {
                if (this.props.onItemSelected) {
                    this.props.onItemSelected(item);
                }
            };
        }
        render() {
            return React.createElement("div", { className: "items-overview" }, (this.props.items || []).map((item) => {
                let className = "item-overview";
                if (this.props.selectedItem === item) {
                    className += " selected";
                }
                return React.createElement("div", { key: item.item.id, className: className, onClick: () => this._onItemClick(item) },
                    React.createElement("div", { className: "item-name" }, item.name.value),
                    React.createElement("div", { className: "item-description" }, item.description.value));
            }));
        }
    }
    exports.ItemsOverview = ItemsOverview;
});
