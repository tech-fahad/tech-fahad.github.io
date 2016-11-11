import React from 'react'
import GitUsers from './GitUsers'
import Bio from './Bio'

class SearchUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.state = {
        repos:undefined,
        bio:undefined,
        username: '',
        userNotFound: false
    };
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  onChange(state) {
      this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
     GitUsers.getGithubInfo(this.state.username).then(function(data) {
         console.log(data);
      this.setState({
        repos: data.repos,
        bio: data.bio,
        userNotFound: false,
        username: ''
      });
      
    }.bind(this),function(error){
      this.setState({
        repos:undefined,
        bio:undefined,
        userNotFound: true
      });
      console.log(error);
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
      <div>
        <h1>Search Git Users</h1>
        <form onSubmit={this.handleSubmit}>

        <input type="text" value={this.state.username} onChange={this.handleUserChange} placeholder="tech-fahad" />
            <button type="submit">Go</button>
            { this.state.userNotFound &&
              <p>User not found</p>
            }
            <ul>{repoList}</ul>
            {
            userBio && 
              <Bio user={userBio} />       
            }
            
        </form>
      </div>
    );
  }
}

export default SearchUserProfile