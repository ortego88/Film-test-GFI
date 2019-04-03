import React from 'react';
import { Header, Footer } from './Layouts';
import appRoutes from "../routes/index";
import { Switch, Route } from "react-router-dom";
	
const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem('firebaseui::rememberedAccounts'),
    };
  }

  //Función que se ejecuta cuando hay cambios, en este caso cuando cambiamos de ventana
	componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ user: localStorage.getItem('firebaseui::rememberedAccounts')})
    }
  }

	render() {
		return <div>
			<Header data={this.props} user={this.state.user} key={this.state.user}/>
			<div style={{ marginTop: '90px' }}>{switchRoutes}</div>
			<Footer data={this.props} user={this.state.user} key={this.state.user}/>
		</div>
	}
}

export default (App);