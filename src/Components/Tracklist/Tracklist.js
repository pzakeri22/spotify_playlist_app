import React from 'react';
import Track from '../Track/Track.js'; 
import './Tracklist.css';

class Tracklist extends React.Component {
    render() {
        //this.props.tracks is equal to both the playlist tracks and the spotify tracks
        return(
            <div className="TrackList">
                {this.props.tracks.map(track => {  //is it goign to the right this.props.tracks? Is it goign to both of them? Only one is generated by search results however.. & onyl one contains promises
                   return <Track track={track} 
                                 key={track.id} 
                                 onAdd={this.props.onAdd}
                                 onRemove={this.props.onRemove}
                                 isRemoval={this.props.isRemoval}/>}
                )}
            </div>
        );
    }
}

export default Tracklist;