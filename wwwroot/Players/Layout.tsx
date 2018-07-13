import * as React from "react";
import { PlayerList } from "./List/PlayerList";
import { PlayerConnection } from "./Connection/PlayerConnection";
import { UserLogin } from "./Login/UserLogin";
import { Login } from "./Login/Login";
import "./Layout.scss";
import { TestingPage } from "./Tests/TestingPage";

class IState {
    loggedIn: boolean;
    connected: boolean;
}
export class Application extends React.Component<{}, IState> {
    state = {
        loggedIn: false,
        connected: false
    };
    componentDidMount() {
        UserLogin.setup().then(_ =>
            this.setState({
                loggedIn: UserLogin.IsLoggedIn()
            })
        );
    }
    render() {
        return (
            <div>
                <h1>Players Dashboard</h1>
                <Login />
                {this.state.loggedIn ? (
                    this.state.connected ? (
                        [
                            <button
                                onClick={this.onPlayerStopConnection.bind(this)}
                            >
                                Stop Connection
                            </button>,
                            <TestingPage />,
                            <PlayerList />
                        ]
                    ) : (
                        <button
                            onClick={this.onPlayerStartConnection.bind(this)}
                        >
                            Start Connection
                        </button>
                    )
                ) : (
                    []
                )}
            </div>
        );
    }

    onPlayerStartConnection() {
        PlayerConnection.start(UserLogin.USER.access_token).then(_ =>
            this.setState({
                connected: true
            })
        );
    }
    onPlayerStopConnection() {
        PlayerConnection.stop().then(_ =>
            this.setState({
                connected: false
            })
        );
    }
}
