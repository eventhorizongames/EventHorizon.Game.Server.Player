import { PlayerConnection } from "../Connection/PlayerConnection";
import { PlayerCard } from "../Card/PlayerCard";
import React = require("react");
import "./PlayerList.scss";
import { autobind } from "../../Core/Autobind/autobind";

interface IState {
    playerList: Array<any>;
    currentPage: number;
    currentPlayerPage: Array<any>;
    filter: string;
}
export class PlayerList extends React.Component<{}, IState> {
    state = {
        playerList: [],
        currentPage: 1,
        currentPlayerPage: [],
        filter: ""
    };
    private pageLength: number = 200;
    private intervalHandler: number;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadPlayerList();
    }

    componentWillUnmount() {
        clearInterval(this.intervalHandler);
    }

    render() {
        return (
            <div>
                <h1>List Page ({this.state.playerList.length})</h1>
                <div>
                    <hr />
                    <button onClick={this.loadPlayerList}>
                        Load From Server
                    </button>
                    <button onClick={this.startInterval}>Start Interval</button>
                    <button onClick={this.stopInterval}>Stop Interval</button>
                    <hr />
                    <input
                        onChange={this.onFilterChanged}
                        placeholder="Filter by Id"
                    />
                    <br />
                    <br />
                    <button onClick={this.onLoadPrevPage}>{"<"}PrevPage</button>
                    <button onClick={this.onLoadNextPage}>NextPage{">"}</button>
                </div>
                ({this.state.currentPage} /{" "}
                {this.state.currentPage * this.pageLength - this.pageLength} /{" "}
                {this.state.currentPlayerPage.length})
                <hr />
                <div className="player-container">
                    {this.state.currentPlayerPage.map(player => (
                        <div key={player.id1} className="player-cell">
                            <PlayerCard player={player} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    @autobind
    private loadPlayerList() {
        PlayerConnection.getAllPlayers().then(response =>
            this.setState({
                playerList: response,
                currentPlayerPage: this.getCurrentPlayerPage(
                    response,
                    this.state.currentPage,
                    this.state.filter
                )
            })
        );
    }
    @autobind
    private onFilterChanged(evnt) {
        this.setState({
            filter: evnt.target.value,
            currentPage: 1,
            currentPlayerPage: this.getCurrentPlayerPage(
                this.state.playerList,
                1,
                evnt.target.value
            )
        });
    }
    @autobind
    private onLoadPrevPage() {
        let currentPage = --this.state.currentPage;
        if (currentPage < 1) {
            currentPage = 1;
        }
        this.setState({
            currentPage,
            currentPlayerPage: this.getCurrentPlayerPage(
                this.state.playerList,
                currentPage,
                this.state.filter
            )
        });
    }
    @autobind
    private onLoadNextPage() {
        const currentPage = ++this.state.currentPage;
        this.setState({
            currentPage,
            currentPlayerPage: this.getCurrentPlayerPage(
                this.state.playerList,
                currentPage,
                this.state.filter
            )
        });
    }

    @autobind
    private startInterval() {
        this.intervalHandler = setInterval(
            () =>
                PlayerConnection.getAllPlayers().then(
                    response =>
                        response.length > this.state.playerList.length
                            ? this.setState({
                                  playerList: response,
                                  currentPlayerPage: this.getCurrentPlayerPage(
                                      response,
                                      this.state.currentPage,
                                      this.state.filter
                                  )
                              })
                            : this.state
                ),
            3000
        );
    }

    @autobind
    stopInterval() {
        clearInterval(this.intervalHandler);
    }

    private getCurrentPlayerPage(playerList, currentPage, filter) {
        if (filter.length > 0) {
            return playerList
                .filter(player =>
                    player.id.toLowerCase().includes(filter.toLowerCase())
                )
                .slice(
                    currentPage * this.pageLength - this.pageLength,
                    currentPage * this.pageLength
                );
        }
        return playerList.slice(
            currentPage * this.pageLength - this.pageLength,
            currentPage * this.pageLength
        );
    }
}
