import React = require("react");

interface IProps {
    player: any;
    flipped: boolean;
}
interface IState {
    properties: Array<{ label: string; value: string }>;
}

// React component for the back side of the card
export class PlayerCardData extends React.Component<IProps, IState> {
    state: IState = {
        properties: []
    };

    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        const properties = [];
        for (const prop in nextProps.player.data) {
            console.log(prop);
            properties.push({
                label: prop,
                value: JSON.stringify(nextProps.player.data[prop])
            });
        }
        this.setState({
            properties
        });
    }

    render() {
        return (
            <div
                className={
                    "card-side side-data " +
                    (this.props.flipped ? "flipped" : "not-flipped")
                }
            >
                <div className="side-data-content">
                    <h2>Data Information</h2>
                    {this.state.properties.map(prop => (
                        <div>
                            <span style={{ fontWeight: "bold" }}>
                                {prop.label}:
                            </span>{" "}
                            <span>{prop.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
