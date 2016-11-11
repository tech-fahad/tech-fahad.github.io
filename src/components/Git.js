import React from 'react'
import GitUsers from './GitUsers'

class SearchUserProfile extends React.Component {
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
    var reposStyle = {
      display: "block",
      padding: 10,
      margin: 10,
      color: "#333",
      fontFamily: "monospace",
      fontSize: "14px"
    };
    let repos = undefined;  
    let repoList = undefined;  
    let userBio = undefined;  
    if(this.state.repos) {
      repos = this.state.repos;
      repoList = repos.map((repo) =>
        <li key={repo.id}>{repo.url}</li>
      );
    }
    if(this.state.bio) {
      userBio = this.state.bio;
    }
    
    return (
        
        <form onSubmit={this.handleSubmit}>

        <input type="text" value={this.state.username} onChange={this.handleUserChange} />
            <button type="submit">Go</button>
            <ul>{repoList}</ul>
            {
            userBio && 
            <img src={userBio.avatar_url} width="50" />
            
            }
            
        </form>
      
    );
  }
}
export default SearchUserProfile