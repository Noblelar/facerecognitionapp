import React, { Component } from 'react';
//import Clarifai from 'clarifai';
import Navigation from './component/navigation/navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Particle from './component/config/particles';
import './App.css';


//const IMAGE_URL = 'https://im.rediff.com/getahead/2021/jan/16frieda-pinto.jpg';

function image(IMAGE_URL) {
  const raw =
    JSON.stringify({
      "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + 'fd41c73feabc4a9caf73460742469774'
    },
    body: raw
  };

  return requestOptions;
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
    }
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
  // const sides = [leftCol, topRow, rightCol, bottomRow];

  //console.log(boxes)
  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes })
  }

  // console.log(bor);
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
    console.log("click")

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, image(this.state.input))
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(data => data.outputs[0].data.regions)
      .then(borders => this.displayFaceBox(this.executeBoxes(borders)))
      .catch(error => console.log('error', error));

  }
  // .then(boarders => this.displayFaceBox(this.calculateFaceLocation(boarders)))
  // .then(result => console.log(result))
  //.then(borders => console.log(borders.top_row + " " + borders.right_col + " " + borders.bottom_row + " " + borders.left_col))



  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

        <FaceRecognition boxe={this.state.boxes} imageUrl={this.state.imageUrl} />

      </div>
    );
  }
}


export default App;
