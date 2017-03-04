import * as React from "react";

export interface Props {
    left: JSX.Element;
    right: JSX.Element;
}

export interface State {
}

export class TwoPanelView extends React.Component<Props, State> {
    public render(): JSX.Element {
        return <div className="two-panel-container">
            <div className="left-panel">
                {this.props.left}
            </div>
            <div className="right-panel">
                {this.props.right}
            </div>
        </div>;
    }
}