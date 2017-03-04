import { Field } from "./Field";

export interface Item {
    id: number;
    name: string;
    description?: string;
    enabled: boolean;
    fieldDefinitions: Field[];
    fieldValues: { [name: string]: string };
}