import React, { Component } from 'react';
import Navigation from './component/navigation/navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/* 
        <FaceRecognition /> */}
      </div>
    );
  }
}


export default App;
