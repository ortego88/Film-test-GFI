import React, { Component } from "react";
import "../../assets/css/Login.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyAp67Ay5YpqkDyOjYAx0o8OBnpEkYDHBDI",
  authDomain: "film-test-gfi.firebaseapp.com"
})

class Login extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  //Función que se ejecuta cada vez que cargamos la página por primera vez para saber si el 
  //usuario está logueado
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      if (user !== null) {
        sessionStorage.setItem('username', user.displayName)
      }
    })
  }

  render() {
    return (
      <div className="Login">
        {this.state.isSignedIn ? (
          this.props.history.push('/films')
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default Login;
