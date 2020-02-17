
import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AddLocation from "@material-ui/icons/AddLocation";
import Place from "@material-ui/icons/Place";
import GpsFixed from "@material-ui/icons/GpsFixed";


export class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        position: {lat: 0, lng: 0}
    };
    constructor(props){
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            position: {lat: 0, lng: 0}
        };
    }
    
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    closeMark = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    onMapClicked = (props) => {
        this.closeMark()
        const { google } = this.props;
        const map = this
        console.log(google)
        console.log(props)
    //if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('su'));
        //autocomplete.bindTo('bounds', this);
        google.maps.event.addListener(map, 'bounds_changed', function () {
            autocomplete.bindTo(map, 'bounds');
        });
        
        google.maps.event.addListener(autocomplete,'place_changed', () => {
                const place = autocomplete.getPlace();
                console.log(place)
            
            this.setState({ position: place.geometry.location });
        });
        
        /*
        autocomplete.addListener('place_changed', () => {
            console.log('???')
            const place = autocomplete.getPlace();
            console.log(place)
            /*
            if (!place.geometry) return;

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({ position: place.geometry.location });
        });*/
    };

    windowHasClosed = (props) => {
        this.closeMark()
    }

    onInfoWindowClose = () => {

    }
    render() {
        const {position} = this.state
        return (
            <div style={{ position: 'relative', height: "100vh", width: "100%" }}> 
                <Map id='map' google={this.props.google} zoom={14} 
                    style={{ position: 'relative', height: "100vh", width: "100%" }} 
                    onClick={this.onMapClicked} center={position} >

                    <Marker onClick={this.onMarkerClick}
                            center={position}
                            name={'Current location'} />

                    <InfoWindow
                    marker={this.state.activeMarker} onClose={this.windowHasClosed}
                    visible={this.state.showingInfoWindow}>
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                    
                </Map>
            </div>    
        );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyANj5mOWxsA6b7AQREOz-SYFkv5GlEQl6o')
})(MapContainer)

//}