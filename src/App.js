import React, { Component, useEffect } from 'react';
//import Clarifai from 'clarifai';
import Navigation from './component/navigation/navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Signin from './component/Signin/Signin';
import Signup from './component/signup/signup';
import Particle from './component/config/particles';
import './App.css';


//const IMAGE_URL = 'https://im.rediff.com/getahead/2021/jan/16frieda-pinto.jpg';

/*! 
const localServer = 'http://localhost:3000';
const server = 'https://peaceful-isle-royale-43590-936c4f26feb7.herokuapp.com';
*/

const initialStates = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialStates
  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }



  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  calculateFaceLocation = (board) => {
    const clarifaiFace = board;
    const image = document.getElementById('faceImg');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes })
  }

  executeBoxes = (border) => {
    let boxa = [];
    border.forEach((bor, b) => {
      let box1 = this.calculateFaceLocation(bor.region_info.bounding_box);
      boxa.push(box1);
    })
    return boxa;
  }


  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })


    fetch('https://peaceful-isle-royale-43590-936c4f26feb7.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => {
        if (response) {
          fetch('https://peaceful-isle-royale-43590-936c4f26feb7.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(responses => responses.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        return response.json()
      })
      // .then(result => JSON.parse(result))
      // .then(data => data.outputs[0].data.regions)
      // .then(bd => {console.log(bd)})
      .then(borders => this.displayFaceBox(this.executeBoxes(borders)))
      .catch(error => console.log('error', error));

  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'signout') {
      this.setState(initialStates)
    } else {
      this.setState({ isSignedIn: false })
    }
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {
          this.state.route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

              <FaceRecognition boxe={this.state.boxes} imageUrl={this.state.imageUrl} />
            </div>
            : (this.state.route === 'signin') ?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }

      </div>
    );
  }
}


export default App;
