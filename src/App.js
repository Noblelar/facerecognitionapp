import React, { Component } from 'react';
import Navigation from './component/navigation/navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Parts from './component/config/ParticlesBackground';
import './App.css';


const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const raw = JSON.stringify({
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
    'Authorization': 'Key ' + 'd0d7a66ee3de4a3289d1795d6c17aae6'
  },
  body: raw
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    console.log("click")
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }




  render() {
    return (
      <div className="App">
        <Parts />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

        <FaceRecognition />

      </div>
    );
  }
}


export default App;
