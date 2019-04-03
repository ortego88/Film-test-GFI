import React from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel'; 
import Slide from '../Layouts/Slide';
import godfather from '../../img/godfather.jpg'
import dark from '../../img/dark.jpg' 
import inception from '../../img/inception.jpg' 
import dunkirk from '../../img/dunkirk.jpg' 
import white from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

class Main extends React.Component {
	constructor() {
      super()
      this.state = {
	      open: false,
	  }
	}

	render() {
		return (
		<div style={{ height: "600px" }}>
			<Button onClick={() => this.setState({ open: true })} style={{ marginTop: '80px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
				<img src={godfather} alt="Godfather" />
			</Button>

			<div style={{ position: 'relative', width: '100%', height: 500 }}>
			  <AutoRotatingCarousel
			    open={this.state.open} 
			    onClose={() => this.setState({ open: false })}
			    style={{ position: 'absolute' }}
			  >
			    <Slide
			      media={<img height="600px" width="400px" src={dark} alt="The Dark Knight Rises"/>}
			      mediaBackgroundStyle={{ backgroundColor: white }}
			      style={{ backgroundColor: white }}
			    />
			    <Slide
			      media={<img height="600px" width="400px" src={inception} alt="Inception"/>}
			      mediaBackgroundStyle={{ backgroundColor: white }}
			      style={{ backgroundColor: white }}
			    />
			    <Slide
			      media={<img height="600px" width="400px" src={dunkirk} alt="Dunkirk"/>}
			      mediaBackgroundStyle={{ backgroundColor: white }}
			      style={{ backgroundColor: white }}
			    />
			  </AutoRotatingCarousel>
			</div>
		</div>
		)
	}
}

export default Main;