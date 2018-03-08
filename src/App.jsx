import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css';
import token from './spotify.config';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    };
  }

  search () {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search';
    let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists';

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

      FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;

      fetch(FETCH_URL, options)
      .then(res => res.json())
      .then(json => {
        const { tracks } = json;
        this.setState({tracks});
        console.log(tracks);
      });
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
              onChange={(e) => { this.setState({ query: e.target.value }) }}
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
        {
          this.state.artist !== null
          ? <div>
              <Profile 
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks} 
              />
            </div>
          : <div></div>
        }
        
      </div>
    );
  }
}

export default App;