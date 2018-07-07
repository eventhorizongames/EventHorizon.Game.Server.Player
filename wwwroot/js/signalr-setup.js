(function () {
    document.getElementById("start-connection")
        .addEventListener("click", () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("/playerBus", {
                    accessTokenFactory: () => user.access_token,
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();
            connection.on("ZoneInfo", onZoneInfo);
            connection.on("ReceiveAction", onReceiveAction);
            connection.start()
                .then(_ => log("Connected to Player Bus."))
                .catch(err => log(err));

            document.getElementById("send-action")
                .addEventListener("click", _ => {
                    if (!connection) {
                        log(new Error("Connection not active"));
                    }
                    const selectedAction = document.getElementById("selected-action").value;
                    if (selectedAction === "GetPlayer") {
                        onGetPlayer(connection, user);
                    } else if (selectedAction === "UpdatePlayer") {
                        onUpdatePlayer(connection, user);
                    } else {
                        log("No Action Available");
                    }
                });
        });

    function onZoneInfo(zoneInfo) {
        log("Zone Info: ", zoneInfo);
        document.getElementById("zone-info").innerText = "Zone Info Received: Check Dev Console for info.";
    }

    function onReceiveAction(event, eventData) {
        const action = event + " of: " + eventData;
        const li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("action-received").appendChild(li);
    }

    function onGetPlayer(connection, user) {
        connection
            .invoke("GetPlayer", user.profile.sub)
            .then(response => log("Get Player Response", response))
            .catch(err => log(err));
    }

    function onUpdatePlayer(connection, user) {
        const data = JSON.parse(window["action-data-editor"].getValue());
        data.id = user.profile.sub;
        log("Update Player Request", data);
        connection
            .invoke("UpdatePlayer", data)
            .then(response => log("Update Player Response", response))
            .catch(err => log(err));
    }
})();