var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

var App = React.createClass({
  render: function(){
    return (
      <div className="catch-of-the-day">
        <div className="header">
          <Header tagline="Fresh Feesh!" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
});

var Header = React.createClass({
  render: function(){
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    );
  }
});

var Order = React.createClass({
  render: function(){
    return (
      <p>Order</p>
    );
  }
});

var Inventory = React.createClass({
  render: function(){
    return (
      <p>Inventory</p>
    );
  }
});

var StorePicker = React.createClass({
  mixins: [History],
  goToStore: function(event){
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
  },
  render: function(){
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Comments inside jsx need to be in curley braces */}
        <h2>Please enter a store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="submit" />
      </form>
    );
  }
});

var NotFound = React.createClass({
  render: function(){
    return (
      <h1>Not Found!</h1>
    );
  }
});

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));