import React from 'react'
import GitUsers from './GitUsers'

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.state = {
        repos:undefined,
        bio:undefined,
        username: ''
    };
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    onChange(state) {
        this.setState(state);
    }


  handleSubmit(e) {
    e.preventDefault();
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn,
    //   repos:this.callme()
    // }));

     GitUsers.getGithubInfo(this.state.username).then(function(data) {
         console.log(data);
      this.setState({
        repos: data.repos,
        bio: data.bio,
        isToggleOn: false
      });
      
    }.bind(this));

  }
  handleUserChange(event) {
    this.setState({username: event.target.value});
  }
  
  render() {
    return (
        
        <form onSubmit={this.handleSubmit}>

        <input type="text" value={this.state.username} onChange={this.handleUserChange} />
            <button type="submit">Go</button>
            {this.state.repos && this.state.repos.length > 0 &&
                <h2>
                    {this.state.repos[0].url}
                </h2>
            }
        </form>
      
    );
  }
}
export default Toggle