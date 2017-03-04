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

export class StringField extends React.Component<Props, State> {
    public render(): JSX.Element {
        return <FieldInput name={this.props.name} isDirty={this.props.isDirty}>
                <input type="text" id={this.props.name} name={this.props.name} value={this.props.value} onChange={this._onChange} />
            </FieldInput>;
    }

    private _onChange = (changeEvent: React.ChangeEvent<HTMLInputElement>): void => {
        if (this.props.onChange) {
            this.props.onChange(changeEvent.target.value.toString());
        }
    };
}