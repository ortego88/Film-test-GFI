import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HeaderLinks from './HeaderLinks';
import firebase from "firebase";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

	//Función que se ejecuta cuando queremos hacer log out en el componente HeaderLinks
  handleLogout = event => {
  	localStorage.removeItem('firebaseui::rememberedAccounts');
  	sessionStorage.removeItem('username');
  	this.setState({ anchorEl: null, user: null });
    firebase.auth().signOut()
   .then(function() {
    	console.log('Signout Succesfull')
   	}, 
   	function(error) {
      console.log('Signout Failed')  
   	});
  };

  render() {
  	return (
			<AppBar style={{ background: '#000000' }}>
				<Toolbar >
					<Grid
			          justify="space-between"
			          container
			          >
			          <Grid>
					  <Typography variant="headline" color="inherit">
							Film test GFI
					  </Typography>
					  </Grid>
					  { this.props.data.location.pathname !== '/login' && this.state.user !== null ?
		        	<HeaderLinks 
		        		user={this.state.user}
		        		handleLogoutOn={(e)=>this.handleLogout()}
		        	/>
		         : null }
		       </Grid>
				</Toolbar>
			</AppBar>
		)
	}
}

export default (Header);