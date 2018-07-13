import React = require("react");
import { autobind } from "../../../Core/Autobind/autobind";
import { PlayerConnection } from "../../Connection/PlayerConnection";
import { UUID } from "../../../Core/UUID/UUID";

interface IState {}
const CREATE_PLAYER_COUNT = 100000;
const PLAYER = {
    id: "bc73bc46-36f7-4305-9069-ee304e91b1ad",
    position: {
        currentZone: "ced86546-bc62-435d-b351-60a5cc4259e5",
        zoneTag: "home",
        position: {
            x: 14,
            y: 0,
            z: -14
        }
    },
    data: {
        new: true,
        ConnectionId: "CiYk76HPNA6tppBF2Dv6-g"
    }
};
export class CreatePlayerListTest extends React.Component<{}, IState> {
    state = {};
    private intervalHandler = undefined;
    constructor(props) {
        super(props);
        this.setState({
            playerList: []
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandler);
    }

    render() {
        return (
            <div>
                <button onClick={this.onCreatePlayerList}>
                    Create Player List
                </button>
            </div>
        );
    }

    @autobind
    onCreatePlayerList() {
        for (let index = 0; index < CREATE_PLAYER_COUNT; index++) {
            var player = PLAYER;
            player.id = UUID.uuid();
            PlayerConnection.updatePlayer(player);
        }
    }
}
