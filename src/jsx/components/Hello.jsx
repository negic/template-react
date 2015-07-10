var React = require('react');



class Hello extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        };
    }

    onClick() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div>
                <h1>Hello React! {this.state.count}</h1>
                <button onClick={this.onClick.bind(this)}>Count</button>
            </div>
        );
    }
}

module.exports = Hello;
