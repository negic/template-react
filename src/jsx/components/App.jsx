var React = require('react');
var Router = require('react-router');
var {State, Route, DefaultRoute, NotFoundRoute, RouteHandler, Link} = Router;

var Header = require('./Header');



class App extends React.Component {

    getChildContext() {
        return {
            lang: '',
            langPrefix: ''
        };
    }

    render() {

        return (
            <div id="wrapper">

                <Header />

                <RouteHandler />
            </div>
        );
    }
}

App.childContextTypes = {
    lang: React.PropTypes.string,
    langPrefix: React.PropTypes.string
}


module.exports = App;
