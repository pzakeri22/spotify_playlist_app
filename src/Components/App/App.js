import React from 'react';
import './App.css';
import SearchResults from './../SearchResults/SearchResults.js'
import Playlist from './../Playlist/Playlist.js'
import SearchBar from './../SearchBar/SearchBar.js';
import Spotify from './../util/Spotify.js';

class App extends React.Component {     

  constructor(props) {
    super(props);
    this.state = {
      searchResults : [
          // {"id": 1, "name": "One True Love", "artist": "Jordan", "album": "Miss U Baby" },
          // {"id": 2, "name": "Favourite Honey", "artist": "DJ Robin", "album": "Never Look Back" },
          // {"id": 3, "name": "Perfect", "artist": "TT Beats", "album": "Actions Not Words" }
      ],
      playlistName : "New Playlist",
      playlistTracks :  [
          // {"id": 4, "name": "song1", "artist": "Jordeen", "album": "Miss U Boby" },
          // {"id": 5, "name": "song2", "artist": "DJ Robeen", "album": "Never Look Bk" },
          // {"id": 6, "name": "song3", "artist": "TT Beatzz", "album": "Actions Not Wordzz" }
      ]
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }
 
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  addTrack(track) {
    const currentPlaylist = this.state.playlistTracks;
    const isSame = currentPlaylist.some(existingTrack => existingTrack.id === track.id);
    if (isSame === false) {
        currentPlaylist.push(track);
        this.setState({playlistTracks : currentPlaylist});
    }
  }

  removeTrack(track) {
    const currentPlaylist = this.state.playlistTracks;
    const newPlaylist = currentPlaylist.filter(existingTrack => existingTrack.id !== track.id);
    this.setState({playlistTracks : newPlaylist });
  }

  updatePlaylistName(newName) {
    this.setState({playlistName : newName});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri); 
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName : 'New Playlist'});
    this.setState({playlistTracks : []})
  }

  search(searchParameter) {
    // const spotifyResults = Spotify.search(searchParameter);
    // this.setState({searchResults : spotifyResults});]
    Spotify.search(searchParameter).then(searchResults => {
      this.setState({searchResults : searchResults})
    })
  }

}


export default App;
