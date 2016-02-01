var React = require('react');
var ReactDOM = require('react-dom');

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
  render: function(){
    return (
      <form className="store-selector">
        {/* Comments inside jsx need to be in curley braces */}
        <h2>Please enter a store</h2>
        <input type="text" ref="storeId" required />
        <input type="submit" />
      </form>
    );
  }
});

ReactDOM.render(<App />, document.querySelector('#main'));
