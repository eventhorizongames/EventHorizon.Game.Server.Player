import { UserManager } from "oidc-client";
const hostUrl = `${window.location.protocol}//${window.location.hostname}`;
const config = {
    authority: "",
    client_id: "",
    scope: "",

    response_type: "id_token token",
    redirect_uri: `${hostUrl}/callback.html`,
    post_logout_redirect_uri: `${hostUrl}/dashboard.html`
};
export class UserLogin {
    static OCID_MANAGER: UserManager;
    static USER: any = undefined;

    public static IsLoggedIn() {
        return this.USER !== undefined;
    }

    public static signin() {
        this.OCID_MANAGER.signinRedirect();
    }
    public static signout() {
        this.OCID_MANAGER.signoutRedirect();
    }

    static async setup() {
        await this.get("/config").then((response: { responseText: string }) => {
            let responseConfig = JSON.parse(response.responseText);
            config["authority"] = responseConfig["auth"]["server"];
            config["client_id"] = responseConfig["auth"]["clientId"];
            config["scope"] =
                "openid profile " + responseConfig["auth"]["apiName"];

            this.OCID_MANAGER = new UserManager(config);
        });
        return await this.checkLogin();
    }
    static checkLogin() {
        return this.OCID_MANAGER.getUser().then(oIdUser => {
            if (oIdUser) {
                this.USER = oIdUser;
            }
            return oIdUser;
        });
    }
    static get(url: string) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function() {
                resolve(xhr);
            };
            xhr.send();
        });
    }
}
