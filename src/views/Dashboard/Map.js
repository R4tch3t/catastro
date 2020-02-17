
import React from 'react';
import GoogleMapReact from "google-map-react";
import AddLocation from "@material-ui/icons/AddLocation";
import Place from "@material-ui/icons/Place";
import GpsFixed from "@material-ui/icons/GpsFixed";

export default (props) => {
const [centerP, setCenterP] = React.useState({lat: props.c.state.center.lat, lng: props.c.state.center.lng});
const [drag, setDrag] = React.useState(true);

const Pick = ({ text }) => {return(<div> <Place /> </div>)};
const BLocation = ({ text }) => {
    return( <button style={{position: 'absolute', zIndex: 9999, marginTop: 13, right: 80}}
            onClick={getLocation} 
            > <GpsFixed /> 
            
            </button> )};
const handleApiLoaded = (map, maps) => {
    console.log(map)
    
    // use map and maps objects
};
const getLocation = ()=>{
    console.log('???')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

const showPosition = (position) => {
    const center = {lat: position.coords.latitude,
                    lng: position.coords.longitude}
        setCenter(center)                   
}
const setCenter=(center)=>{
    props.c.setState({center: center});
    setCenterP(center)
}
const _onBoundsChange = (center, zoom /* , bounds, marginBounds */ ) => {
    //this.props.onCenterChange(center);
    //this.props.onZoomChange(zoom);
    //this.setCenter(center)
}
const onChildClick = (key, childProps) => {
   // this.props.onCenterChange([childProps.lat, childProps.lng]);
   //console.log(`onChildCl ${childProps}`)
   setDrag(false);
}
const _onChange = (v)=>
{
    console.log(`onChange ${v.toString()}`)
}
const _onDrag = (center, zoom) => {
    console.log(`onDrag ${center}`)
    props.c.setState({centerP: center});
}
const _onDragEnd = (center, zoom) => {
    
    setDrag(false);
}
const _onChildMouseMove = (key, childProps, mouse) => {
    setCenterP({lat: mouse.lat, lng: mouse.lng});

   // this.props.c.setState({centerP: center});
}
const _onChildMouseUp = (key, childProps, mouse) => {
    //this.centerP = {lat: mouse.lat, lng: mouse.lng}
    //console.log(`onChildM ${this.centerP.lat} ${this.centerP.lng}`)
    //setCenterP({lat: mouse.lat, lng: mouse.lng});
    setDrag(true);
}
const _onChildMouseDown = (key, childProps, mouse) => {
    //this.centerP = {lat: mouse.lat, lng: mouse.lng}
    console.log(`onChildD `)
    //setCenterP({lat: mouse.lat, lng: mouse.lng});
    setDrag(false);
}
const _onClick = (mouse) => {
    const center = {lat: mouse.lat, lng: mouse.lng}
    console.log(`onChildC ${center.lat} ${center.lng}`)
    props.c.setState({centerP: center});
   // setDrag(true);
}

    const {c} = props
    //const {drag} = this.state
    const {center,zoom} = c.state
    return(
    <div>
        <BLocation />
    <div style={{ height: "100vh", width: "100%" }}>
        
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyANj5mOWxsA6b7AQREOz-SYFkv5GlEQl6o"
            }}
            defaultCenter={center}
            center={center}
            zoom={zoom}
           // onBoundsChange={this._onBoundsChange}
            //onChildClick={onChildClick}
           // onClick={_onClick}
            onChildMouseMove={_onChildMouseMove}
            onChildMouseUp={_onChildMouseUp}
            onChildMouseDown={_onChildMouseDown}
           // onChange={_onBoundsChange}
            draggable={drag}
            
          //  onDragEnd={this._onDragEnd}
            //onDrag={this._onDrag}
            yesIWantToUseGoogleMapApiInternals={true}
            
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <Pick
              lat={centerP.lat}
              lng={centerP.lng}
              text="My Marker"
            />
              
          </GoogleMapReact>
          
        </div>
        
        </div>
        )

}