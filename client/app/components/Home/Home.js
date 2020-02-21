import React, { Component } from 'react';
import 'whatwg-fetch';

import{
  getFromStorage,
  setInStorage,
} from '../../components/App/utils/storage'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token: '',
      signUpError: '',
      signInError:'',
      signInEmail:'',
      signInPassword:'',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail:'',
      signUpPassword:''
    };

    this.onTextboxChangeSignInEmail=this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword=this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail=this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword=this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName=this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName=this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignIn=this.onSignIn.bind(this);
    this.onSignUp=this.onSignUp.bind(this);
    this.logout=this.logout.bind(this);

  }

  componentDidMount() {
    const obj1=(getFromStorage('the_main_app'));
    
    if (obj1 && obj1.token) {
      //verify token
      const {token} =obj1;
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json =>{
        if (json.success) {
          this.setState({
          token,
          isLoading:false 
          })
        }else{
          this.setState({
            isLoading:false
          })
        }
      })
    }else{
      this.setState({
        isLoading:false,
      });
    }
  }

  onTextboxChangeSignInEmail(event){// set state is used to change the current state 
    this.setState({
      signInEmail: event.target.value,// this is used to take the input value and stores it 
    })
  }

  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword:event.target.value
    })
  }

  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail:event.target.value
    })
  }

  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword:event.target.value
    })
  }

  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName:event.target.value
    })
  }

  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName:event.target.value
    })
  }

  onSignUp(){
    //grab state
    const{
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError, 
    } = this.state;
    
    this.setState({
       isLoading:true
    })

    //post request to backend
    fetch('/api/account/signup', { 
      method: 'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({
        firstName:signUpFirstName,
        lastName:signUpLastName,
        email:signUpEmail,
        password:signUpPassword
      }) 
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
           this.setState({
            signUpError:json.message,
            isLoading:false,
            signUpEmail:'',
            signUpPassword:'',
            signUpFirstName:'',
            signUpLastName:'',// basicall y this is used to clear all the text boxes after the signup
        })
        }else{
          this.setState({
            signUpError:json.message,
            isLoading:false
        })
        }
     })
  }

  onSignIn(){
    //grab state
    //post request to backend
    const{
     signInEmail,
     signInPassword,
    } = this.state;
    
    this.setState({
       isLoading:true
    })

    //post request to backend
    fetch('/api/account/signin', { 
      method: 'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({
        email:signInEmail,
        password:signInPassword,
        token:JSON.token
      }) 
    })
      .then(res => res.json())
      .then(json => {
        console.log('json',json)
        if (json.success) {
          setInStorage('the_main_app',{token:json.token})
           this.setState({
            signInError:json.message,
            isLoading:false,
            signInEmail:'',
            signInPassword:'',
            // basicall y this is used to clear all the text boxes after the signup
        })
        }else{
          this.setState({
            signInError:json.message,
            isLoading:false
        })
        }
     })
  }

  logout(){
    this.setState({
      isLoading:true,

    })
    const obj1=(getFromStorage('the_main_app'));
    
    if (obj1 && obj1.token) {
      //verify token
      const {token} =obj1;
      fetch('/api/account/logout?token=' + token)
      .then(res => res.json())
      .then(json =>{
        if (json.success) {
          this.setState({
          token: '',
          isLoading:false 
          })
        }else{
          this.setState({
            isLoading:false
          })
        }
      })
    }else{
      this.setState({
        isLoading:false,
      });
    }
  }

/*fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
*/
/*
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);
        this.setState({
          counters: data
        });
      });
*/

  render() {
    const{
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return(
        <div>
          <div>
            {
              (signInError) ?(
              <p>{signInError}</p>
              ): null 
            }
            <p> Sign In</p>
            <div>
              <input 
              type="email" 
              placeholder="email" 
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
              >
              </input>
            </div>
            <div>
              <input 
              type="password"
              placeholder="password" 
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
              >
              </input>
            </div>
            <br/>
            <div>
              <button onClick={this.onSignIn}>Sign In</button>
            </div>
            
          </div>
          <br/>
          <br/>
          <div>
            {
              (signUpError) ?(
              <p>{signUpError}</p>
              ): null 
            }
            <p>Sign Up</p>
            <div>
              <input 
              type="text" 
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
              />
            </div>
            
            <div>
               <input 
               type="text" 
               placeholder="Last Name"
               value={signUpLastName}
               onChange={this.onTextboxChangeSignUpLastName}
               />
            </div>
            
            <div>
              <input 
              type="email" 
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
              />
            </div>
            
            <div>
              <input 
              type="password" 
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
              />
            </div>
            <br/>
            <div>
              <button onClick={this.onSignUp}>Sign Up</button>
            </div>  
          </div>
        </div>
      );
    }

    return (
    <div>
      <p>Welcome to my Account</p>
      <br/>
      <div>
        <button onClick={this.logout}>Logout</button>
      </div>
    </div>
    );
  }
}

export default Home;
