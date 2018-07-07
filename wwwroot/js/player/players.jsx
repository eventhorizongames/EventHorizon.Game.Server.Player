import { PlayerList } from "./list.jsx";

function Application() {
    return (
        <div>
            <h1>Hello from React</h1>
            <p>I was rendered from the Application component!</p>
            <PlayerList />
        </div>
    );
}

ReactDOM.render(<Application />, document.getElementById("container"));
