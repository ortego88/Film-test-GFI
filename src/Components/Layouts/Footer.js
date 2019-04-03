import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  center: {
    display: "block",
    fontSize: "14px",
	},
	footer: {
    padding: "0",
    width: "99%",
    bottom: "10px",
  },
};

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  	main: "/",
  	films: "/films",
  	login: "/login",
    value: '',
    user: this.props.user,
  };
}

  //Función que maneja el cambio de pestaña del footer
  handleChange = (event, value) => {
  	if (this.state.main === this.props.data.location.pathname) {
    	this.setState({ value: 0 }, () => this.setState({value}));
  	} else if (this.state.films === this.props.data.location.pathname) {
    	this.setState({ value: 1 }, () => this.setState({value}));
    } else if (this.state.login === this.props.data.location.pathname) {
    	this.setState({ value: 2 }, () => this.setState({value}));
	  };
	}

  //Función que se ejecuta cada vez qeu se actualiza la app para manejar
  //el estado de la pestaña del footer según la ruta en el navegador
	componentDidMount() {
		if (this.state.main === this.props.data.location.pathname) {
    	this.setState({ value: 0 }, () => this.setState({value: 0}));
  	} else if (this.state.films === this.props.data.location.pathname) {
    	this.setState({ value: 1 }, () => this.setState({value: 1}));
    } else if (this.state.login === this.props.data.location.pathname) {
    	this.setState({ value: 2 }, () => this.setState({value: 2}));
	  } else if (this.state.login === this.props.data.location.pathname && this.state.user === null) {
    	this.setState({ value: 2 }, () => this.setState({value: 2}));
	  };
	}

  render() {
    const { classes } = this.props;
    const { main, films, login } = this.state;

    return (
      <footer className={classes.footer}>
	      <div className={classes.center}>
		      <Tabs
		        value={this.state.value}
		        onChange={this.handleChange}
		        indicatorColor="primary"
		        textColor="primary"
		        centered
		      >
		        <Tab label="Main" component={Link} to={main}/>
		        <Tab label="Films" component={Link} to={films} disabled={this.state.user === null ? true : null}/>
		        <Tab label="Login" component={Link} to={login} disabled={this.state.user !== null ? true : null}/>
		      </Tabs>
	      </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);