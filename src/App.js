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
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    console.log("click")

    // .then(result => console.log(result))
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, image(this.state.input))
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .then(data => data.outputs[0].data.regions[0].region_info.bounding_box)
      .then(borders => console.log( borders.top_row+" " + borders.right_col+" " +borders.bottom_row+" " +borders.left_col))
      .catch(error => console.log('error', error));

  }



  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

        <FaceRecognition imageUrl={this.state.imageUrl} />

      </div>
    );
  }
}


export default App;
