import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../Layouts/SnackBar';

const styles = theme => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    maxHeight: 444,
    maxWidth: 300,
    margin: 'auto',
  },
  actions: {
    display: 'flex',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
});

class ShowFilm extends React.Component {
  constructor() {
    super();
    this.state = { 
      movie: null,
      film: '',
      open: null,
      openAdd: false,
      openDelete: false,
    };
    this.getMovie = this.getMovie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setMovie(movie) {
    this.setState({ movie });
  }

  getMovie() {
    const pelicula = this.state.film;
    const url = 'http://www.omdbapi.com/?apikey=f12ba140&t='+pelicula

    axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        const movie = {
          title: res.data.Title,
          year: res.data.Year,
          poster: res.data.Poster,
          plot: res.data.Plot,
          rating: res.data.imdbRating,
          genres: res.data.Genre,
          runtime: res.data.Runtime,
        };
        this.setMovie(movie);
      }
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log('Error', err.message);
      }
      console.log(err.config);
    });
    this.setState({ film: '' })
  } 

  componentDidMount() {
    this.getMovie()
  }

  //Función que cierra el modal de información del adaptador
  handleClose = () => {
    this.setState({ open: null });
  };

  //Función que abre el modal de información del adaptador
  handleOpen = () => {
    this.setState({ open: true });
  };

  //Función que añade una película a favoritos en local storage
  addFavourite = event => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const id = this.state.movie.title,
        index = favorites.indexOf(id);
    if (!id) return;
    if (index === -1) {
      favorites.push(id);
      this.showMsgAddFavourite();
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  removeFavourite = event => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const id = this.state.movie.title,
        index = favorites.indexOf(id);
    if (index !== -1) {
      favorites.splice(index, 1);
      this.showMsgDeleteFavourite();
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  //Snackbar que aparece cuando se crea un nuevo usuario
  showMsgAddFavourite = () => {
    this.setState({ openAdd: true });
  };

  //Función que cierra el snackbar del nuevo usuario
  closeMsgAddFavourite = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openAdd: false });
  };

  //Snackbar que aparece cuando se crea un nuevo usuario
  showMsgDeleteFavourite = () => {
    this.setState({ openDelete: true });
  };

  //Función que cierra el snackbar del nuevo usuario
  closeMsgDeleteFavourite = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openDelete: false });
  };

  render() {
    const { classes } = this.props;
    const { movie } = this.state;

    if (!this.state.movie) {
      return null
    }

    return (

      <div>
        <div className={classes.search}>
          <Button onClick={this.getMovie} className={classes.searchIcon}>
            <SearchIcon />
          </Button>
          <InputBase
            placeholder="Buscar…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            name="film"
            value={this.state.film}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.getMovie()
              }
            }}
            onChange={this.handleChange}
          />
        </div>
        <Card className={classes.card}>
          <CardHeader
            title={movie.title}
            subheader={movie.year}
          />
          <CardMedia
            className={classes.media}
            image={movie.poster}
            title={movie.title}
          />
          <CardContent>
            <Typography component="p">
              {movie.plot}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites" onClick={this.addFavourite}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Info" onClick={this.handleOpen}>
              <InfoIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={this.removeFavourite}>
              <DeleteIcon />
            </IconButton>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              scroll={this.state.scroll}
              aria-labelledby="scroll-dialog-title"
              classes={{ paper: classes.dialogPaper }}
            >
              <DialogTitle id="scroll-dialog-title">Información de {movie.title}</DialogTitle>
              <DialogContent>
                <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>                            
                  Año: {movie.year}
                </DialogContentText>
                <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>                            
                  Sinopsis: {movie.plot}
                </DialogContentText>
                <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>                            
                  Género: {movie.genres}
                </DialogContentText>
                <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>                            
                  Puntuación: {movie.rating}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.openAdd}
            autoHideDuration={6000}
            onClose={this.closeMsgAddFavourite}
          >
            <MySnackbarContentWrapper
              onClose={this.closeMsgAddFavourite}
              variant="info"
              message={<span>Añadida la película {movie.title} a favoritos</span>} 
            />
          </Snackbar>
        </div>
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.openDelete}
            autoHideDuration={6000}
            onClose={this.closeMsgDeleteFavourite}
          >
            <MySnackbarContentWrapper
              onClose={this.closeMsgDeleteFavourite}
              variant="info"
              message={<span>Eliminada la película {movie.title} de favoritos</span>} 
            />
          </Snackbar>
        </div>
      </div>
    );
  }
}

ShowFilm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowFilm);