import React = require("react");

interface IProps {
    player: any;
    flipped: boolean;
}
interface IState {}

// React component for the back side of the card
export class PlayerCardPosition extends React.Component<IProps, IState> {
    render() {
        return (
            <div
                className={
                    "card-side side-position " +
                    (this.props.flipped ? "flipped" : "not-flipped")
                }
            >
                <div className="side-position-content">
                    <h2>Position Information</h2>
                    <div>
                        <span style={{ fontWeight: "bold" }}>
                            Current Zone Id:
                        </span>{" "}
                        <span>{this.props.player.position.currentZone}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Zone Tag:</span>{" "}
                        <span>{this.props.player.position.zoneTag}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Position:</span>{" "}
                        <span>
                            Vector3 (
                            {this.props.player.position.position.x},
                            {this.props.player.position.position.y},
                            {this.props.player.position.position.z}
                            )
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
