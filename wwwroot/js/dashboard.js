const config = {
    authority: "https://auth.identity.projecteventhorizon.com",
    client_id: "monster_game_demo",
    redirect_uri: "http://localhost:5083/callback.html",
    response_type: "id_token token",
    scope: "openid profile Api.Player",
    post_logout_redirect_uri: "http://localhost:5083/dashboard.html",
};
const oidcManager = new Oidc.UserManager(config);

(function () {
    document.getElementById("login").addEventListener("click", login, false);
    document.getElementById("logout").addEventListener("click", logout, false);


    function login() {
        oidcManager.signinRedirect();
    }

    function checkLogin() {
        oidcManager.getUser().then(function (user) {
            if (user) {
                log("User logged in", user.profile);
            } else {
                log("User not logged in");
            }
        });
    }

    checkLogin();

    get("/config")
        .then(response => {
            log(response.responseText);
        });

    function get(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                resolve(xhr);
            }
            // xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
            xhr.send();
        })
    }
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