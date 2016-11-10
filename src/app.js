import React from 'react'
import {ReactDOM} from 'react-dom'
import {render} from 'react-dom'
 
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import GitUsers from './components/GitUsers'

let store = createStore(todoApp)


class Git extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos:{},
      bio:{},
       isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
 handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
   
   componentWillMount(){
      GitUsers.getGithubInfo(this.props.username).then(function(data) {
      this.setState = {
        repos: data.repos,
        bio: data.bio,
        isToggleOn: true
      };
      
    }.bind(this));
  }


  render() {
    // if (this.state) {
    //   return <FormattedBio bio={this.state.bio} />
    // }

    return (
      <div>
        <div>Loading...</div>
        <button>Remove</button>
        <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
      </div>
      );
  }

 
}
function FormattedBio (props) {
      return (
      <p>{props.bio.url}</p>
    );
}

function Todo () {
  return (
     <Provider store={store}>
      <App />
    </Provider>
  )
}

function Home () {
  return (
    <div>Home</div>
  )
}

function GitSearch () {
  return (
     <div>git</div>
  )
}

class Base extends React.Component {
   render() {
      return (
         <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/todo">Todo</Link></li>
              <li><Link to="/git">Git</Link></li>
            </ul>
				
           {this.props.children}
         </div>
      )
   }
}

// render(
//   <Provider store={store}>
// <App />
   
//   </Provider>,
//   document.getElementById('root')
// )


render(   
    <Router history = {browserHistory}>
        <Route path = "/" component = {Base}>
          <IndexRoute component = {Home} />
          <Route path = "/" component = {Home} />
          <Route path = "/todo" component = {Todo} />
          <Route path = "/git" component = {GitSearch} />
        </Route>
    </Router>,
   document.getElementById('root')
)