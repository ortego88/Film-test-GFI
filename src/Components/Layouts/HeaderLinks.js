import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from '@material-ui/core/Menu';

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	anchorEl: null,
      user: this.props.user,
    };
  }

	//Función que maneja la apertura del menú de usuario
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

	//Función que maneja el cierre del menú de usuario
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

	//Función que ejecuta la función de logout en el componente Header
  logout=()=>{
    this.props.handleLogoutOn();
  }

	render() {
  	const { anchorEl } = this.state;
  	const name = this.state.user;
		const username = JSON.parse("[" + name + "]")
		return (
		<div>
		  <Button
	      aria-owns={anchorEl ? 'simple-menu' : undefined}
	      aria-haspopup="true"
	      onClick={this.handleClick}
	    >
	        <Typography style={{ color: '#FFFFFF', fontSize: '14px', textTransform: "none", display: 'inline-block', marginRight: '10px' }}>
	          {username[0][0].displayName}
	        </Typography>
	        <img alt={username[0][0].displayName} src={username[0][0].photoUrl} width="30px"/>
	      </Button>
	      <Menu
	      id="simple-menu"
	      anchorEl={anchorEl}
	      open={Boolean(anchorEl)}
	      onClose={this.handleClose}
	    >
	      <MenuItem 
	      	onClick={this.logout}
	      	component={Link} to="/login"
	      	>Logout
	      </MenuItem>
	    </Menu>
		</div>
		)
	}
}

export default (HeaderLinks);