import React = require("react");

interface IProps {
    player: any;
    flipped: boolean;
}
interface IState {}

// React component for the main side of the card
export class PlayerCardMain extends React.Component<IProps, IState> {
    render() {
        return (
            <div
                className={
                    "card-side side-main " +
                    (this.props.flipped ? "flipped" : "not-flipped")
                }
            >
                <div className="side-main-content">
                    <h2>Player Details</h2>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Player Id:</span>{" "}
                        <span>{this.props.player.id}</span>
                    </div>
                </div>
            </div>
        );
    }
}
