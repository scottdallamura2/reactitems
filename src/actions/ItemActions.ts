import { Action } from "../flux/action";
import { Item } from "../contracts/Item";

export interface FieldValueChangedPayload {
    itemId: number;
    fieldName: string;
    newValue: string;
}

export interface PropertyChangedPayload {
    itemId: number;
    propertyName: string;
    newValue: any;
}

export class ItemActions {
    public static itemAdded = new Action<Item>();

    public static fieldValueChanged = new Action<FieldValueChangedPayload>();
    public static propertyValueChanged = new Action<PropertyChangedPayload>();

    public static itemsSaved = new Action<any>();
    public static itemsReset = new Action<any>();
}