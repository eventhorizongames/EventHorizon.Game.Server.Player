import React = require("react");

import "./PlayerCard.scss";
import { autobind } from "../../Core/Autobind/autobind";
import { PlayerCardMain } from "./PlayerCardMain";
import { PlayerCardPosition } from "./PlayerCardPosition";
import { PlayerCardData } from "./PlayerCardData";
import { PlayerCardRaw } from "./PlayerCardRaw";

interface IProps {
    player: any;
}
interface IState {
    flipped: string;
    flip: boolean;
}

export class PlayerCard extends React.Component<IProps, IState> {
    state = {
        flip: false,
        flipped: "main"
    };

    render() {
        return (
            <div>
                <h2>Player ({this.props.player.id})</h2>
                <button onClick={this.onFlip.bind(this, "main")}>Main</button>
                <button onClick={this.onFlip.bind(this, "position")}>
                    Position
                </button>
                <button onClick={this.onFlip.bind(this, "data")}>Data</button>
                <button onClick={this.onFlip.bind(this, "raw")}>Raw</button>
                <br />
                <div className="card-container">
                    <div className="card-body">
                        <PlayerCardMain
                            {...this.props}
                            flipped={this.state.flipped === "main"}
                        />

                        <PlayerCardPosition
                            {...this.props}
                            flipped={this.state.flipped === "position"}
                        />

                        <PlayerCardData
                            {...this.props}
                            flipped={this.state.flipped === "data"}
                        />

                        <PlayerCardRaw
                            {...this.props}
                            flipped={this.state.flipped === "raw"}
                        />
                    </div>
                </div>
            </div>
        );
    }
    onFlip(side: string) {
        this.setState({
            flip: !this.state.flip,
            flipped: side
        });
    }
}
