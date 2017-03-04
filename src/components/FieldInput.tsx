import * as React from "react";

export interface Props {
    name: string;
    isDirty: boolean;
}

export interface State {
}

export class FieldInput extends React.Component<Props, State> {
    public render(): JSX.Element {
        let className = "field-input-container";
        if (this.props.isDirty) {
            className += " dirty";
        }

        return <div className={className}>
            <div className="field-label">{this.props.name}</div>
            <div className="field-input">{this.props.children}</div>
        </div>;
    }
}