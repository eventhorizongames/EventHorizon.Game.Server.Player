import { PlayerConnection } from "../Connection/PlayerConnection";
import { PlayerCard } from "../Card/PlayerCard";
import React = require("react");
import "./PlayerList.scss";

interface IState {
    playerList: Array<any>;
}
export class PlayerList extends React.Component<{}, IState> {
    state = {
        playerList: []
    };
    private intervalHandler = undefined;
    constructor(props) {
        super(props);
        this.setState({
            playerList: []
        });
    }

    componentDidMount() {
        PlayerConnection.getAllPlayers().then(response =>
            this.setState({
                playerList: response
            })
        );
        this.intervalHandler = setInterval(
            () =>
                PlayerConnection.getAllPlayers().then(response =>
                    this.setState({
                        playerList: response
                    })
                ),
            3000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandler);
    }

    render() {
        return (
            <div>
                <h1>List Page ({this.state.playerList.length})</h1>
                <div className="player-container">
                    {this.state.playerList.map(player => (
                        <div className="player-cell">
                            <PlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
