var React = require('react');
var Router = require('react-router');
var {State, Route, DefaultRoute, NotFoundRoute, RouteHandler, Link} = Router;

class LangRoot extends React.Component {
    render() {
        return (
            <RouteHandler />
        );
    }
}

module.exports = LangRoot;
