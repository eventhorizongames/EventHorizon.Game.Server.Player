const config = {
    authority: "",
    client_id: "",
    scope: "",

    response_type: "id_token token",
    redirect_uri: "http://localhost:5083/callback.html",
    post_logout_redirect_uri: "http://localhost:5083/dashboard.html",
};
let oidcManager = undefined;
let user = undefined;

(function () {
    document.getElementById("login").addEventListener("click", login, false);
    document.getElementById("logout").addEventListener("click", logout, false);


    function login() {
        if (!oidcManager) {
            log(new Error("Open ID Manager Not Created."))
            return;
        }
        oidcManager.signinRedirect();
    }

    function logout() {
        if (!oidcManager) {
            log(new Error("Open ID Manager Not Created."))
            return;
        }
        oidcManager.signoutRedirect();
    }

    function checkLogin() {
        if (!oidcManager) {
            log(new Error("Open ID Manager Not Created."))
            return;
        }
        oidcManager.getUser().then((oIdUser) => {
            if (oIdUser) {
                user = oIdUser;
                log("User logged in", user);
            } else {
                log("User not logged in");
            }
        });
    }

    get("/config")
        .then(response => {
            let responseConfig = JSON.parse(response.responseText);
            log("Configuration", responseConfig);

            config["authority"] = responseConfig["auth"]["server"];
            config["client_id"] = responseConfig["auth"]["clientId"];
            config["scope"] = "openid profile " + responseConfig["auth"]["apiName"];

            oidcManager = new Oidc.UserManager(config);
            checkLogin();
        });

    function get(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                resolve(xhr);
            }
            if (user) {
                xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
            }
            xhr.send();
        })
    }

    window["action-data-editor"] = monaco.editor.create(document.getElementById('send-data'), {
        language: 'json'
    });
})();

function log() {
    Array.prototype.forEach.call(arguments, function (message) {
        if (message instanceof Error) {
            message = "Error: " + message.message;
        } else if (typeof message !== 'string') {
            message = JSON.stringify(message, null, 2);
        }
        document.getElementById('results').innerHTML += message + '\r\n';
    });
}