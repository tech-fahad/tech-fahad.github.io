import React from 'react'
import GitUsers from './GitUsers'

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
      <h1>Git</h1>
        <div>Loading...</div>
        <button>Remove</button>
        <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
      </div>
      );
  }

 
}
export default Git