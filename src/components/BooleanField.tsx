import * as React from "react";

import { FieldInput } from "./FieldInput";

export interface Props {
    name: string;
    value: string;
    onChange: (newValue: string) => void;
    isDirty: boolean;
}

export interface State {
}

export class BooleanField extends React.Component<Props, State> {
    public render(): JSX.Element {
        let checked = this.props.value == "true";
        return <FieldInput name={this.props.name} isDirty={this.props.isDirty}>
                <input type="checkbox" id={this.props.name} name={this.props.name} checked={checked} onChange={this._onChange} />
            </FieldInput>;
    }

    private _onChange = (changeEvent: React.ChangeEvent<HTMLInputElement>): void => {
        if (this.props.onChange) {
            this.props.onChange(changeEvent.target.checked.toString());
        }
    };
}