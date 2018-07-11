import React = require("react");

interface IProps {
    player: any;
    flipped: boolean;
}
interface IState {}

// React component for the back side of the card
export class PlayerCardRaw extends React.Component<IProps, IState> {
    render() {
        return (
            <div
                className={
                    "card-side side-raw " +
                    (this.props.flipped ? "flipped" : "not-flipped")
                }
            >
                <div className="side-raw-content">
                    <h2>Raw</h2>
                    <pre>{JSON.stringify(this.props.player, null, 4)}</pre>
                </div>
            </div>
        );
    }
}
