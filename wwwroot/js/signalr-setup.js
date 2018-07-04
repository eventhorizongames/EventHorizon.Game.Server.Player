(function () {
    document.getElementById("start-connection")
        .addEventListener("click", () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("/playerBus", {
                    accessTokenFactory: () => user.access_token,
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();
            connection.on("ZoneInfo", (zoneInfo) => {
                log("Zone Info: ", zoneInfo);
                document.getElementById("zone-info").innerText = "Zone Info Received: Check Dev Console for info.";
            });
            connection.on("ReceiveAction", (event, eventData) => {
                const action = event + " of: " + eventData;
                const li = document.createElement("li");
                li.textContent = encodedMsg;
                document.getElementById("action-received").appendChild(li);
            });
            connection.start()
                .then(_ => log("Connected to Player Bus."))
                .catch(err => log(err));

            document.getElementById("send-action")
                .addEventListener("click", _ => {
                    const selectedAction = document.getElementById("selected-action").value;
                    if (selectedAction === "GetPlayer") {
                        connection
                            .invoke("GetPlayer", user.profile.sub)
                            .then(response => log("Get Player Response", response))
                            .catch(err => log(err));
                    } else if (selectedAction === "UpdatePlayer") {
                        const data = JSON.parse(window["action-data-editor"].getValue());
                        console.log(data);
                        data.id = user.profile.sub;
                        connection
                            .invoke("UpdatePlayer", data)
                            .then(response => log("Update Player Response", response))
                            .catch(err => log(err));
                    } else {
                        log("No Action Available");
                    }
                });
        });

})();