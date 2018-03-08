import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css';
import token from './spotify.config';
import Profile from './Profile';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    };
  }

  search () {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, options)
    .then(res => res.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log(artist);
      this.setState({artist});
    });
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
        <Profile 
          artist={this.state.artist}
        />
        <div className="Gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;