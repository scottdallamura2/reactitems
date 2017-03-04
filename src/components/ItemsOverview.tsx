import * as React from "react";

import { ItemModel } from "../models/ItemModel";

export interface Props {
    items: ItemModel[];
    selectedItem: ItemModel;
    onItemSelected: (selectedItem: ItemModel) => void;
}

export interface State {
}

export class ItemsOverview extends React.Component<Props, State> {
    public render(): JSX.Element {
        return <div className="items-overview">
            {
                (this.props.items || []).map((item) => {
                    let className = "item-overview";
                    if (this.props.selectedItem === item) {
                        className += " selected";
                    }
                    return <div key={item.item.id} className={className} onClick={() => this._onItemClick(item)}>
                        <div className="item-name">{item.name.value}</div>
                        <div className="item-description">{item.description.value}</div>
                    </div>;
                })
            }
        </div>;
    }

    private _onItemClick = (item: ItemModel): void => {
        if (this.props.onItemSelected) {
            this.props.onItemSelected(item);
        }
    };
}