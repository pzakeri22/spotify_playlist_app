import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);

    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                        {/* <source src={this.props.track.preview} type="audio/mp3"/> */}
                        {this.props.track.preview ? <audio controls><source src={this.props.track.preview} type="audio/mp3"/></audio> : <p class="noPreview">Song preview not available.</p>}
                </div>
                {this.renderAction()}
            </div>
        );
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
         return <button className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.props.isRemoval ? '-' : '+' }</button>
    }
}

export default Track;
