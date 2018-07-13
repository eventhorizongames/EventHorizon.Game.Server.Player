import React = require("react");
import { CreatePlayerListTest } from "./CreatePlayerList/CreatePlayerListTest";

export class TestingPage extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Testing List</h1>
                <CreatePlayerListTest />
            </div>
        );
    }
}
