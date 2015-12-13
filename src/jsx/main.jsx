var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute, RouteHandler, Link} = Router;

var App = require('./components/App');
var Top = require('./components/Top');
var Location = require('./components/Location');
var About = require('./components/About');
var LangRoot = require('./components/LangRoot');


var routes = (
    <Route path="/" name="app" handler={App}>
        <DefaultRoute handler={Top} />
        <Route path="about/" handler={About} />
        <Route path="location/" handler={Location} />

        <Route path="en/" name="en" handler={LangRoot}>
            <DefaultRoute handler={Top} />
            <Route path="about/" handler={About} />
            <Route path="location/" handler ={Location} />
        </Route>
    </Route>
);


Router.run(routes, Router.HistoryLocation, (Handler, state) => {

    var context = {};

    if (state.pathname.indexOf('/en/') === 0) {
        context.lang = 'en';
        context.langPrefix = '/en';
    } else {
        context.lang = 'ja';
        context.langPrefix = '';
    }

    React.withContext(context, () => {
        React.render(<Handler />, document.body);
    });
});
