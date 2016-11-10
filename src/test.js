import React from 'react';
import ReactDOM from 'react-dom'; 
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { combineReducers, createStore } from 'redux'
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)
 
var SimpleComponent = React.createClass({
   render: function() {
        return (
            <div>sdssss</div>
        );
   } 
} );
var SimpleComponents = React.createClass({
   render: function() {
        return (
            <div>test</div>
        );
   } 
} );

class App extends React.Component {
   render() {
      return (
         <div>
            <ul>
               <li><Link to={`home`}>Home</Link></li>
               <li><Link to={`about`}>About</Link></li>
               <li><Link to={`contact`}>Blood Donation</Link></li>
            </ul>
				
           {this.props.children}
         </div>
      )
   }
}

//export default App;

class Home extends React.Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}


class About extends React.Component {
   render() {
      return (
         <div>
            <h1>About...</h1>
         </div>
      )
   }
}


class Contact extends React.Component {
   render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Volunteer</h1>
        </div>
        
      </div>
    );
  }
}
console.log(store.getState())
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}
 
ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "/home" component = {Home} />
         <Route path = "/about" component = {About} />
         <Route path = "/contact" component = {Contact} />
      </Route>
   </Router>
	
), document.getElementById('root'))