var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render: function(){
    return (
      <div className="catch-of-the-day">
        <div className="header">
          <Header />
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
      <p>Header</p>
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
