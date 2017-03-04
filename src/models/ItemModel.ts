import { Field } from "../contracts/Field";
import { Item } from "../contracts/Item";

export class InputModel {
    private _initialValue: string;
    private _currentValue: string;

    constructor(initialValue: string) {
        this._initialValue = initialValue;
        this._currentValue = initialValue;
    }

    public get value(): string {
        return this._currentValue;
    }

    public setValue(newValue: string): void {
        this._currentValue = newValue;
    }

    public isDirty(): boolean {
        return this._initialValue !== this._currentValue;
    }

    public reset(): void {
        this._currentValue = this._initialValue;
    }

    public save(): void {
        this._initialValue = this._currentValue;
    }
}

export class FieldModel extends InputModel {
    public fieldDefinition: Field;

    constructor(fieldDefinition: Field, initialValue: string) {
        super(initialValue);
        this.fieldDefinition = fieldDefinition;
    }
}

export class ItemModel {
    private _name: InputModel;
    private _description: InputModel;
    private _enabled: InputModel;

    public item: Item;
    public fields: { [key: string]: FieldModel } = {};

    constructor(item: Item) {
        this.item = item;

        this._name = new InputModel(item.name || "");
        this._description = new InputModel(item.description || "");
        this._enabled = new InputModel((!!item.enabled).toString());

        item.fieldDefinitions.forEach((fieldDefinition) => {
            this.fields[fieldDefinition.name] = new FieldModel(fieldDefinition, item.fieldValues[fieldDefinition.name]);
        });
    }

    public get name(): InputModel {
        return this._name;
    }

    public get description(): InputModel {
        return this._description;
    }

    public get enabled(): InputModel {
        return this._enabled;
    }

    public reset(): void {
        for (let i in this.fields) {
            this.fields[i].reset();
        }
        this.name.reset();
        this.description.reset();
        this.enabled.reset();
    }

    public save(): void {
        for (let i in this.fields) {
            this.fields[i].save();
        }
        this.name.save();
        this.description.save();
        this.enabled.save();
    }
}