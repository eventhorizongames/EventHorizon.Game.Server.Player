import { PlayerConnection } from "./Connection/PlayerConnection";
import React = require("react");

interface IState {
    playerList: Array<any>;
    response: any;
}
export class PlayerList extends React.Component<{}, IState> {
    state = {
        playerList: [],
        response: {}
    };
    private intervalHandler = undefined;
    constructor(props) {
        super(props);
        this.setState({
            playerList: []
        });
    }

    componentDidMount() {
        this.intervalHandler = setInterval(
            () =>
                PlayerConnection.getAllPlayers().then(response =>
                    this.setState({
                        response
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
                <h1>List Page</h1>
                <pre>{JSON.stringify(this.state.response, null, 4)}</pre>
            </div>
        );
    }
}
