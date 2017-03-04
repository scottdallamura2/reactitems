import * as React from "react";

import { FieldTypes, Field } from "../contracts/Field";

import { ItemModel } from "../models/ItemModel";

import { ItemActions } from "../actions/ItemActions";

import { BooleanField } from "./BooleanField";
import { StringField } from "./StringField";

export interface Props {
    item: ItemModel;
}

export interface State {
}

export class ItemDetail extends React.Component<Props, State> {
    public render(): JSX.Element {
        return this.props.item && <div className="item-detail">
            <StringField name="Name" value={this.props.item.name.value} isDirty={this.props.item.name.isDirty()} onChange={(newValue) => this._onPropertyChanged("name", newValue)} />
            <StringField name="Description" value={this.props.item.description.value} isDirty={this.props.item.description.isDirty()} onChange={(newValue) => this._onPropertyChanged("description", newValue)} />
            <BooleanField name="Enabled" value={this.props.item.enabled.value} isDirty={this.props.item.enabled.isDirty()} onChange={(newValue) => this._onPropertyChanged("enabled", newValue)} />
            {
                this.props.item.item.fieldDefinitions.map((fieldDefinition) => {
                    let key = this.props.item.item.id + "." + fieldDefinition.name;
                    let field = this.props.item.fields[fieldDefinition.name];

                    switch (fieldDefinition.type) {
                        case FieldTypes.String: {
                            return <StringField key={key} name={fieldDefinition.name} value={field.value} isDirty={field.isDirty()} onChange={(newValue) => this._onFieldValueChanged(fieldDefinition, newValue)} />
                        }
                        case FieldTypes.Boolean: {
                            return <BooleanField key={key} name={fieldDefinition.name} value={field.value} isDirty={field.isDirty()} onChange={(newValue) => this._onFieldValueChanged(fieldDefinition, newValue)} />
                        }
                    }
                })
            }
        </div>;
    }

    private _onFieldValueChanged = (definition: Field, newValue: string): void => {
        ItemActions.fieldValueChanged.invoke({
            itemId: this.props.item.item.id,
            fieldName: definition.name,
            newValue: newValue
        });
    };

    private _onPropertyChanged = (propertyName: string, newValue: string): void => {
        ItemActions.propertyValueChanged.invoke({
            itemId: this.props.item.item.id,
            propertyName: propertyName,
            newValue: newValue
        });
    }
}