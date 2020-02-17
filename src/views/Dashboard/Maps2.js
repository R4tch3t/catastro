
import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapsFun from './MapsFun'
import AddLocation from "@material-ui/icons/AddLocation";
import Place from "@material-ui/icons/Place";
import GpsFixed from "@material-ui/icons/GpsFixed";


export class MapContainer extends React.Component {
    state = {
        map: null,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        position: {lat: 0, lng: 0},
        drag: true
    };

    constructor(props){
        super(props)
        this.state = {
            map: null,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            position: {lat: 0, lng: 0},
            drag: true
        };
    }

    onMapReady = (props) => {
       // this.getLocation();
       console.log('??read')
        this.searchAddr(props);
        
    }
    getLocation = ()=>{
        console.log('???')
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    showPosition = (position) => {
        const center = {lat: position.coords.latitude,
                        lng: position.coords.longitude}
                        this.setMap(center)
        this.setState({position: center})
    }

    onMarkerClick = (props, marker, e) =>{
    console.log(`drag: ${e}`)
        this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    //this.setState({drag: false})
    }
    closeMark = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    searchAddr = (map) =>{
        // this.closeMark()
         const {
             google
         } = this.props;
         //const map = this
         console.log(google)
         //console.log(props)

         //if (!google || !map) return;

         const autocomplete = new google.maps.places.Autocomplete(document.getElementById('su'));
         //autocomplete.bindTo('bounds', this);
         /*google.maps.event.addListener(map, 'bounds_changed', function () {
             autocomplete.bindTo(map, 'bounds');
         });*/
         //google.maps.event.addListener(map,'bounds_changed', function () {
             autocomplete.bindTo('bounds', map);
        // });
         google.maps.event.addListener(autocomplete, 'place_changed', () => {
             const place = autocomplete.getPlace();
             console.log(place)
             map.setCenter(place.geometry.location)
             map.setZoom(17)
             this.setState({
                 position: place.geometry.location,
                 selectedPlace: {
                     name: place.formatted_address
                 },
                 drag: false
             });
         });
    }


    onMapClicked = (props) => {
       console.log('clicked')
        
    };

    windowHasClosed = (props) => {
        this.closeMark()
    }

    onInfoWindowClose = () => {

    }
    
    setMap = (position)=>{
        const {google, c} = this.props
        let map = new google.maps.Map(document.getElementById('map'), {
            center: position,
            zoom: 14,
            rotateControl: true,
            
        });
        console.log(position)
        map.setTilt(45);
        let bounds = {
            north: position.lat - 0.0010000,
            south: position.lat + 0.0010000,
            east: position.lng + 0.0010000,
            west: position.lng - 0.0010000
        };
        const rectangle = new google.maps.Rectangle({
            bounds: bounds,
            editable: true,
            draggable: true,
            geodesic: true
        });
        
        // Define an info window on the map.
        const infoWindow = new google.maps.InfoWindow();
        const marker = new google.maps.Marker({
            position: position,
         //   map: map,
            draggable: true,
            name: 'Click to zoom'
        });
        marker.addListener('mouseup', function () {
            const position = marker.getPosition();
            const place = marker.getPlace();
            console.log(place)
            bounds = {
                north: position.lat() - 0.0010000,
                south: position.lat() + 0.0010000,
                east: position.lng() + 0.0010000,
                west: position.lng() - 0.0010000
            };
           // map.setZoom(16);
            map.setCenter(position);
            rectangle.setBounds(bounds);
        });
        map.addListener('mousemove', function () {
            console.log('biien?')

            map.setOptions({ draggableCursor: 'crosshair' });
        })
        const showNewRect = () => {
            var ne = rectangle.getBounds().getNorthEast();
            var sw = rectangle.getBounds().getSouthWest();

            var contentString = '<b>Rectangle moved.</b><br>' +
                'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
                'New south-west corner: ' + sw.lat() + ', ' + sw.lng();
            const bounds = {
                lat: sw.lat(),
                lng: sw.lng() + 0.0010000
            };
            // Set the info window's content and position.
            infoWindow.setContent(contentString);
            infoWindow.setPosition(bounds);

            infoWindow.open(map);
        }
        rectangle.addListener('bounds_changed', showNewRect);

        //map.addListener('onready', this.onMapReady);
        this.searchAddr(map)
        //rectangle.setMap(map);
        let polyC = new google.maps.Polyline({
            strokeColor: 'red',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable: true,
            draggable: true,
        });
        let polyT = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable: true,
            draggable: true,
        });
        polyC.setMap(map);
        polyT.setMap(map);
        const polygonC = new google.maps.Polygon({
            path: polyC.getPath(),
            strokeColor: 'red',
            fillColor: 'red',
            editable: true,
            draggable: true,
            geodesic: true
        });
        const polygonT = new google.maps.Polygon({
            path: polyT.getPath(),
            editable: true,
            draggable: true,
            geodesic: true
        });
        c.polygonC = polygonC;
        c.polygonT = polygonT;
        function addLatLng(event) {
            let path = null
            if (c.bandC){
                path = polyC.getPath();
            }else{
                path = polyT.getPath();
            }
            let l = path.getLength();
            console.log(path.g)
            // Because path is an MVCArray, we can simply append a new coordinate
            // and it will automatically appear.
            path.push(event.latLng);

            // Add a new marker at the new plotted point on the polyline.
            let marker = new google.maps.Marker({
                position: event.latLng,
                draggable: true,
                title: '#' + path.getLength(),
                map: map
            });
            
            c.markers.push(marker)
            c.calcP()
            const onMarkerClick = (e) => {
                console.log(`markerCl ${polyT.getPath().getLength()} : ${l}`)
                if (polyC.getPath().getLength() > 2 && l===0) {
                    path.push(e.latLng);
                    if(c.bandC){
                        //c.polygonC.setPath(path);
                        c.polygonC.setMap(map);
                        c.bandC=false;
                    } else if (polyT.getPath().getLength() > 2 ){
                       // c.polygonT.setPath(path);
                        c.polygonT.setMap(map);
                    }
                   // c.bandTerreno = false;
                    c.markers.push(c.markers[0]);
                }
                
            }
            const onMarkerDb = (e) => {
                let x = l
                while (x < path.getLength()) {
                    path.removeAt(x);
                }
                while (c.markers.length>x) {
                    c.markers[c.markers.length-1].setMap(null);
                    c.markers.pop()
                }
            }
            const onMarkerUp = (e) => {
                path.removeAt(l);
                path.insertAt(l, e.latLng);
                if(c.polygon){
                    c.polygon.setPath(path)
                }
            }
            marker.addListener('click', onMarkerClick)
            marker.addListener('dblclick', onMarkerDb)
            marker.addListener('mouseup', onMarkerUp)
        }
        // Add a listener for the click event
        map.addListener('click', addLatLng);
        this.setState({
            map
        })
    }
    componentDidMount(){
        this.getLocation()
    }
    render() {
        const {position} = this.state
        return (
            <div style={{ position: 'relative', height: "100vh", width: "100%" }}> 
                <MapsFun c={this} /> 
            </div>    
        );
    }
}

const LoadingContainer = (props) => ( <div> Cargando mapa... </div>)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyANj5mOWxsA6b7AQREOz-SYFkv5GlEQl6o'),
  language: 'es',
  LoadingContainer: LoadingContainer
})(MapContainer)

//}