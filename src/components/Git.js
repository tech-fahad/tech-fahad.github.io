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
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
        repos:undefined,
        bio:undefined,
        isToggleOn: true
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
    onChange(state) {
        this.setState(state);
    }
    callme() {
        let temp = ["a","b"];
      GitUsers.getGithubInfo(this.props.username).then(function(data) {
         console.log(data);
          temp = data.repos;
    //   this.setState({
    //     repos: data.repos,
    //     bio: data.bio,
    //     isToggleOn: !this.state.isToggleOn
    //   });
    });
    return temp;
  }

  handleClick() {
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn,
    //   repos:this.callme()
    // }));

     GitUsers.getGithubInfo(this.props.username).then(function(data) {
         console.log(data);
      this.setState({
        repos: data.repos,
        bio: data.bio,
        isToggleOn: false
      });
      
    }.bind(this));

  }
  
  //&& this.state.repos.length > 0 


  render() {
      //let repos = this.state.repos;
    return (
        
        <div>
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
            {this.state.repos && this.state.repos.length > 0 &&
                <h2>
            {this.state.repos[0].url}
                </h2>
            }
        </div>
      
    );
  }
}
export default Toggle