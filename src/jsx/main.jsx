var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute, RouteHandler, Link} = Router;

var App = require('./components/App');
var Top = require('./components/Top');
var Location = require('./components/Location');
var MovieDetail = require('./components/MovieDetail');
var LangRoot = require('./components/LangRoot');



var routes = (
    <Route path="/" name="app" handler={App}>
        <DefaultRoute name="top" handler={Top} />

        <Route path="location/" name="location" handler={Location} />

        <Route path="detail/" name="detail" handler={MovieDetail} />

        <Route path="en/" name="en" handler={LangRoot}>
            <DefaultRoute handler={Top} />

            <Route path="location/" handler={Location} />

            <Route path="detail/" handler={MovieDetail} />
        </Route>
    </Route>
);


Router.run(routes, (Handler, state) => {

    var context = {
        lang: 'ja',
        langPrefix: ''
    };

    if (state.pathname.indexOf('/en/') === 0) {
        context.lang = 'en';
        context.langPrefix = '/en';
    }

    React.withContext(context, () => {
        React.render(<Handler />, document.body);
    });
});
