import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css';
import token from './spotify.config';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  search () {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    // const myHeaders = new Headers();

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
      mode: 'cors',
      cache: 'default'
    })
    .then(res => res.json())
    .then(json => console.log(json));
  }

  render () {
    return (
      <div className="App">
        <div className="App-title">
          Music Master from App
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl 
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={(e) => { this.setState({ query: e.target.value }); }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.search();
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;