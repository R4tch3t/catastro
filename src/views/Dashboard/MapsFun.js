
import React from 'react';
import {Map, InfoWindow, Marker, Rectangle, GoogleApiWrapper} from 'google-maps-react';
import AddLocation from "@material-ui/icons/AddLocation";
import Place from "@material-ui/icons/Place";
import GpsFixed from "@material-ui/icons/GpsFixed";


export default (props) => {
        const {c} = props;
        const {drag} = c.state;
        //const [drag, setDrag] = React.useState(false);
        const _mousemove = (props) => {
            console.log(`??? ${props}`)
            const d = document.getElementById('map')
           // d.setDraggable(false)
           // setDrag(true);
        }
        
        return (
            <div id='map' style={{ position: 'relative', height: "100vh", width: "100%" }}> 
                {/*<Map google={c.props.google} zoom={14} 
                    style={{ position: 'relative', height: "100vh", width: "100%" }} 
                    onClick={c.onMapClicked} center={c.state.position} draggable={drag}
                    onReady={c.onMapReady} onMousemove={_mousemove} rotateControl={true} >
                    
                    <Marker onClick={c.onMarkerClick}
                            draggable={true}
                            position={c.state.position}
                            name={c.state.selectedPlace.name} /> 

                    <InfoWindow
                    marker={c.state.activeMarker} onClose={c.windowHasClosed}
                    visible={c.state.showingInfoWindow}>
                        <div>
                        <h1>{c.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                    
                    </Map>*/}
            </div>    
        );
    
}


//}