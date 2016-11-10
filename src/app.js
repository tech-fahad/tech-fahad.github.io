import React from 'react'
import {ReactDOM} from 'react-dom'
import {render} from 'react-dom'
 
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'
import Home from './components/Home'
import Git from './components/Git'


let store = createStore(todoApp)


function FormattedBio (props) {
      return (
      <p>{props.bio.url}</p>
    );
}

function Todo () {
  return (
     <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}



function GitSearch () {
  return (
     <Git username="tech-fahad" />
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