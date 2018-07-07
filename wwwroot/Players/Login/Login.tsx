import { UserLogin } from "../UserLogin";
import * as React from "react";

export class Login extends React.Component<{}, {}> {
    render() {
        return UserLogin.IsLoggedIn() ? <LogoutUser /> : <LoginUser />;
    }
}

class LogoutUser extends React.Component<{}, {}> {
    render() {
        return <button onClick={() => UserLogin.signout()}>Logout</button>;
    }
}
class LoginUser extends React.Component<{}, {}> {
    render() {
        return <button onClick={() => UserLogin.signin()}>Login</button>;
    }
}
