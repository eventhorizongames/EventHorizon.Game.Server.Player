import { HubConnectionBuilder, LogLevel, HubConnection } from "@aspnet/signalr";

class PlayerConnectionImpl {
    _connection: HubConnection = undefined;
    isConnected: boolean = false;

    start(accessToken: string) {
        this.stop();
        this._connection = new HubConnectionBuilder()
            .withUrl("/playerBus", {
                accessTokenFactory: () => accessToken
            })
            .configureLogging(LogLevel.Information)
            .build();
        return this._connection
            .start()
            .then(_ => (this.isConnected = true))
            .catch(_ => (this._connection = undefined));
    }
    async stop() {
        if (this._connection) {
            await this._connection.stop();
        }
    }

    getAllPlayers() {
        return this._connection.invoke("GetAllPlayers");
    }
}

export const PlayerConnection = new PlayerConnectionImpl();
