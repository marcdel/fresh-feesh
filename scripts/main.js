import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';

import Header from './components/Header';
import Inventory from './components/Inventory';
import Fish from './components/Fish';
import Order from './components/Order';

var h = require('./helpers');

var Rebase = require('re-base');
var base = Rebase.createClass('https://fresh-feesh.firebaseio.com/');

var Catalyst = require('react-catalyst');

var App = React.createClass({
  mixins: [Catalyst.LinkedStateMixin],
  getInitialState: function(){
    return {
      fishes: {},
      order: {}
    };
  },
  componentDidMount: function(){
    base.syncState(this.props.params.storeId + "/fishes", {
      context: this,
      state: 'fishes'
    });

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  },
  componentWillUpdate: function(nextProps, nextState){
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  },
  addToOrder: function(key){
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  },
  removeFromOrder: function(key){
    delete this.state.order[key];
    this.setState({ order: this.state.order });
  },
  addFish: function(fish){
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({ fishes: this.state.fishes });
  },
  removeFish: function(key){
    if(confirm("Are you sure you want to remove this fish?")){
      this.state.fishes[key] = null;
      this.setState({ fishes: this.state.fishes });
    }
  },
  loadSamples: function(){
    this.setState({
      fishes: require('./sample-fishes')
    });
  },
  renderFish: function(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
  },
  render: function(){
    return (
      <div className="catch-of-the-day">
        <div className="header">
          <Header tagline="Fresh Feesh!" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory fishes={this.state.fishes} linkState={this.linkState}
          addFish={this.addFish} loadSamples={this.loadSamples} removeFish={this.removeFish } />
      </div>
    );
  }
});

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
