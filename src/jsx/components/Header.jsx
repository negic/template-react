var React = require('react');
var Router = require('react-router');
var {State, Route, DefaultRoute, NotFoundRoute, RouteHandler, Link} = Router;
var _ = require('underscore');

var MenuData = require('../../_config/data').menu;


class Header extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            items: MenuData.map(item => _.clone(item))
        };
    }

    render() {
        return (
            <header id="global-header">
                <ul>
                    {this.state.items.map((item) => {
                        var path = this.context.langPrefix + item.path;

                        return (
                            <li><Link to={path} key={path}>{item.name}</Link></li>
                        );
                    })}
                </ul>

                <p><Link to="en">en</Link></p>
                <p><Link to="app">ja</Link></p>

            </header>
        );
    }
}

Header.contextTypes = {
    lang: React.PropTypes.string,
    langPrefix: React.PropTypes.string
};

module.exports = Header;
