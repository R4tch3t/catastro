
import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapsFun from './MapsFun'
import getZone from './getZone'
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
        this.searchAddr(props);
        
    }
    getLocation = ()=>{

         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition((position) => {
                 const center = {lat: position.coords.latitude,
                        lng: position.coords.longitude}
                        this.setMap(center)
                        this.setState({position: center})
             }, ()=> {
                 this.handleLocationError(true);
             });
         } else {
             // Browser doesn't support Geolocation
             this.handleLocationError(false);
         }
         

        /*if (navigator.geolocation) {
           // navigator.geolocation.getCurrentPosition(this.showPosition);
            
        } else {
            //x.innerHTML = "Geolocation is not supported by this browser.";
            console.log('Geolocation is not supported by this browser.')
        }*/
    }

    handleLocationError=(browserHasGeolocation)=>{
        console.log(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        const {c} = this.props
        const {center} = c.state
        this.setMap(center)
    }

    showPosition = (position) => {
        
        const center = {lat: position.coords.latitude,
                        lng: position.coords.longitude}
                        this.setMap(center)
        this.setState({position: center})
    }

    onMarkerClick = (props, marker, e) =>{
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
        findStreet = (results, street, barr) =>{
            let c = 1
            let place = results[c]
            let name = place.address_components
            if(name.length<6){
                place = results[0]
                name = place.address_components
            }
            c=0
            while(c<results.length){
                const place = results[c]
                const name = place.address_components
                if(name.length===7){
                    if (name[1] && street.startsWith(name[1].long_name) && barr.endsWith(name[2].long_name)) {
                        return name
                    }
                }else{
                    if (name[1] && street.startsWith(name[0].long_name) && barr.endsWith(name[1].long_name)) {
                        return name
                    }
                }
                c++
            }
            return name
        }
        getInfoMarker = (map, latLng, infowindowContent) => {
         const {c, google}=this.props
         const a = this;
        // let infowindowContent = document.getElementById('infowindow-content');
         c.markerInfo.setMap(map)
         //c.markerInfo.setPosition(e.latLng)
         c.markerInfo.setPosition(latLng)
         let geocoder = new google.maps.Geocoder;

         let latitude = c.markerInfo.getPosition().lat();
         let longitude = c.markerInfo.getPosition().lng();
         let latlng = {
             lat: parseFloat(latitude),
             lng: parseFloat(longitude)
         };

         geocoder.geocode({
             'location': latlng
         }, function (results, status) {
             if (status === google.maps.GeocoderStatus.OK) {
                 if (results[1]) {
                     const place = results[1]
                     let name = place.address_components
                     let title = ''
                     const su = document.getElementById('su').value.split(',')
                     c.street = ''
                     c.barr = ''
                     let calle = document.getElementById('calle')
                     let numCalle = document.getElementById('numCalle')
                     numCalle.value = 0
                     let colonia = document.getElementById('colonia')
                     let cp = document.getElementById('cp')
                     let municipio = document.getElementById('municipio')
                     let localidad = document.getElementById('localidad')
                     if (name[1]) {
                         if (su[0] && (!su[0].startsWith(name[1].long_name) || !su[1].endsWith(name[2].long_name))) {
                            name = a.findStreet(results, su[0], su[1])
                         }
                         if(name.length === 7){
                            infowindowContent.children['place-name'].textContent = `${name[1].long_name} `;
                            title += `${name[1].long_name} `
                         }
                     }
                     if (name[0]) {
                         if (name.length === 7) {
                            infowindowContent.children['place-name'].textContent += `#${name[0].long_name}`;
                            title += `#${name[0].long_name} `
                            c.street = name[1].long_name
                            numCalle.value = name[0].long_name
                           
                         }else{
                            infowindowContent.children['place-name'].textContent = `${name[0].long_name}`;
                            title += `${name[0].long_name} `
                            c.street = name[0].long_name
                           
                         }
                         calle.value = c.street.toUpperCase()
                     }
                     if (name[2]) {
                         if(name.length===7){
                            infowindowContent.children['place-barr'].textContent = `Barrio de ${name[2].long_name}`;
                            title += `Barrio de ${name[2].long_name}, `
                            c.barr = name[2].long_name
                         }else{
                             infowindowContent.children['place-barr'].textContent = `Colonia ${name[1].long_name}`;
                             title += `Colonia ${name[1].long_name}, `
                             c.barr = name[1].long_name
                         }
                         colonia.value = c.barr.toUpperCase()
                     }
                     if (name[3]) {
                         if(name.length===7){
                            infowindowContent.children['place-city'].textContent = `${name[3].long_name}`;
                            title += `${name[3].long_name}, `
                            municipio.value = name[3].long_name.toUpperCase()
                            localidad.value = name[3].long_name.toUpperCase()
                         }else{
                             infowindowContent.children['place-city'].textContent = `${name[2].long_name}`;
                             title += `${name[2].long_name}, `
                             municipio.value = name[2].long_name.toUpperCase()
                             localidad.value = name[2].long_name.toUpperCase()
                         }

                     }
                     if (name[4]) {
                         if (name.length === 7) {
                            infowindowContent.children['place-country'].textContent = `${name[4].long_name}, `;
                            title += `${name[4].long_name}, `
                         }else{
                             infowindowContent.children['place-country'].textContent = `${name[3].long_name}, `;
                             title += `${name[3].long_name}, `
                         }
                     }
                     if (name[5]) {
                         if(name.length===7){
                            infowindowContent.children['place-country'].textContent += `${name[5].long_name}, `;
                            title += `${name[5].long_name}, `
                         }else{
                            infowindowContent.children['place-country'].textContent += `${name[4].long_name}, ${name[5].long_name}`;
                            title += `${name[4].long_name}, ${name[5].long_name}`
                            cp.value = name[5].long_name
                         }
                     }
                     if (name[6]) {
                         infowindowContent.children['place-country'].textContent += `${name[6].long_name}`;
                         title += `${name[6].long_name}`
                         cp.value = name[6].long_name
                     }
                     infowindowContent.style.display = 'inline-block';
                     //c.markerInfo.setTitle(`${infowindowContent.children['place-name'].textContent}`)
                     c.markerInfo.setTitle(`${title}`)
                     c.infoWindow.open(map, c.markerInfo);
                     getZone(c.street, c.barr, c)
                 } else {
                     console.log('Resultados no encontrados');
                 }
             } else {
                 console.log('Geocoder fallo: ' + status);
             }
         });

     }
     /*
     getInfoMarkerID = (map, place, infowindowContent) => {
         const {c, google}=this.props
        // let infowindowContent = document.getElementById('infowindow-content');
         c.markerInfo.setMap(map)
         //c.markerInfo.setPosition(e.latLng)
        // c.markerInfo.setPosition(latLng)
         let geocoder = new google.maps.Geocoder;

         geocoder.geocode({
                    'placeId': place.place_id
                    }, function (results, status) {
             if (status === google.maps.GeocoderStatus.OK) {
                 if (results[0]) {
                     const place = results[0]
                     console.log(results);
                     const name = place.address_components
                     let title = ''
                     console.log(infowindowContent)
                     if (name[0]) {
                         infowindowContent.children['place-name'].textContent = `${name[0].long_name} `;
                         title = `${name[0].long_name} `
                     }
                     if (name[1]) {
                         infowindowContent.children['place-barr'].textContent = `Barrio de ${name[1].long_name}`;
                         title += `Barrio de ${name[1].long_name}, `
                     }
                     if (name[2]) {
                         infowindowContent.children['place-city'].textContent = `${name[2].long_name}`;
                         title += `${name[2].long_name}, `
                     }
                     if (name[3]) {
                         infowindowContent.children['place-country'].textContent = `${name[3].long_name}, `;
                         title += `${name[3].long_name}, `
                     }
                     if (name[4]) {
                         infowindowContent.children['place-country'].textContent += `${name[4].long_name}, `;
                         title += `${name[4].long_name}, `
                     }
                     if (name[5]) {
                         infowindowContent.children['place-country'].textContent += `${name[5].long_name}`;
                         title += `${name[5].long_name}`
                     }
                     infowindowContent.style.display = 'inline-block';
                     //c.markerInfo.setTitle(`${infowindowContent.children['place-name'].textContent}`)
                     
                     c.markerInfo.setPosition(results[0].geometry.location)
                     c.markerInfo.setTitle(`${title}`)
                     c.infoWindow.open(map, c.markerInfo);

                 } else {
                     console.log('Resultados no encontrados');
                 }
             } else {
                 console.log('Geocoder fallo: ' + status);
             }
         });

     }*/

    searchAddr = (map) =>{
        // this.closeMark()
         const {
             google, c
         } = this.props;
         //const map = this
         //console.log(props)

         //if (!google || !map) return;
         

         //function getInfoMarker(e) {
             
         //}
         let infowindowContent = document.getElementById('infowindow-content');
         c.infoWindow.setContent(infowindowContent);
         const autocomplete = new google.maps.places.Autocomplete(document.getElementById('su'));
         //autocomplete.bindTo('bounds', this);
         /*google.maps.event.addListener(map, 'bounds_changed', function () {
             autocomplete.bindTo(map, 'bounds');
         });*/
         //google.maps.event.addListener(map,'bounds_changed', function () {
             autocomplete.bindTo('bounds', map);
        // });
         autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);
         google.maps.event.addListener(autocomplete, 'place_changed', () => {
             const place = autocomplete.getPlace();
             if (!place.geometry) {
                 // User entered the name of a Place that was not suggested and
                 // pressed the Enter key, or the Place Details request failed.
                 console.log("No hay detalles sobre la ubicacion: '" + place.name + "'");
                 return;
             }
             //console.log(place.geometry.viewport)
             //console.log(`location: ${place.geometry.location}`)
             //console.log(`place.geometry.viewportS: ${place.geometry.viewport.getSouthWest()}`)
             //console.log(`place.geometry.viewportN: ${place.geometry.viewport.getNorthEast()}`)
             
             //this.getInfoMarkerID(map, place, infowindowContent)
            this.getInfoMarker(map, place.geometry.location, infowindowContent)
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
        
    };

    windowHasClosed = (props) => {
        this.closeMark()
    }

    onInfoWindowClose = () => {

    }
    
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                const center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                this.setMap(center)
                this.setState({
                    position: center
                })
            }/*,
            error => Alert.alert(error.message), {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }*/
        );
    };
    clickTBM = (e) => {
        const {c} = this.props
        if(!c.bandT){
            e.target.style.borderColor = "black"
            e.target.style.fontWeight = 'bold'
            const cbm = document.getElementById('cbm');
            cbm.style.borderColor = "transparent"
            cbm.style.fontWeight = 'normal'
            c.bandC = false;
        }else{
            e.target.style.borderColor = "transparent"
            e.target.style.fontWeight = 'normal'
        }
        c.bandT = !c.bandT
    }
    hoverTBM = (e) => {
        const {c} = this.props
        e.target.style.borderColor = "black"
        e.target.style.cursor = "pointer"
    }
    leaveTBM = (e) => {
        const {c} = this.props
        if (!c.bandT) {
            e.target.style.borderColor = "transparent"
        }
        //e.target.style.cursor = "pointer"
    }

    clickCBM = (e) => {
        const {c} = this.props
        if (!c.bandC) {
            e.target.style.borderColor = "blue"
            e.target.style.fontWeight = 'bold'
            const tbm = document.getElementById('tbm');
            tbm.style.borderColor = "transparent"
            tbm.style.fontWeight = 'normal'
            c.bandT = false
        }else{
            e.target.style.borderColor = "transparent"
            e.target.style.fontWeight = 'normal'
        }
        c.bandC = !c.bandC
    }
    hoverCBM = (e) => {
        const {c} = this.props
        e.target.style.borderColor = "blue"
        e.target.style.cursor = "pointer"
    }
    leaveCBM = (e) => {
        const {c} = this.props
        if (!c.bandC) {
            e.target.style.borderColor = "transparent"
        }
    }

    downET = (e) => {
        const {c} = this.props
        e.target.style.borderColor = "red"
        e.target.style.fontWeight = 'bold'
    }
    upET = (e) => {
        const {c,google} = this.props
        let i = 0
        let path = c.polyC.getPath()
        e.target.style.borderColor = "transparent"
        e.target.style.fontWeight = 'normal'
        /*c.polygonC = new google.maps.Polygon({
            path: c.polyC.getPath(),
            strokeColor: 'blue',
            fillColor: 'blue',
            editable: true,
            //draggable: true,
            geodesic: true
        });
        c.polygonT = new google.maps.Polygon({
            path: c.polyT.getPath(),
            editable: true,
            //draggable: true,
            geodesic: true
        });*/
        while (0 < path.length) {
            //path.removeAt(path.length - 1)
            path.pop()
        }
        while(i<c.markersC.length){
            //path.pop()
            c.markersC[i].setMap(null)
            i++
        }
        i=0
        path = c.polyT.getPath()
        while (0 < path.length) {
          //  path.removeAt(path.length - 1)
          path.pop()
        }
        while(i<c.markersT.length){
          //  path.pop()
            c.markersT[i].setMap(null)
            i++
        }
        c.markersC=[]
        c.markersT=[]
    }
    hoverET = (e) => {
        const {c} = this.props
        
        e.target.style.cursor = "pointer"
    }
    leaveET = (e) => {
        const {c} = this.props
            e.target.style.borderColor = "transparent"
    }

    setMap = (position)=>{
        const {google, c} = this.props
        c.google=google
        const a = this
        c.map = new google.maps.Map(document.getElementById('map'), {
            center: position,
            zoom: 14,
            rotateControl: true,
            
        });
        const search = document.getElementById('su');
        const tbm = document.getElementById('tbm');
        const cbm = document.getElementById('cbm');
        const et = document.getElementById('et');
        search.style.width = "400px";
        tbm.onclick = this.clickTBM;
        tbm.onmouseenter = this.hoverTBM;
        tbm.onmouseleave = this.leaveTBM;
        tbm.style.fontWeight = 'normal'
        
        cbm.onclick = this.clickCBM;
        cbm.onmouseenter = this.hoverCBM;
        cbm.onmouseleave = this.leaveCBM;
        cbm.style.fontWeight = 'normal'

        et.onmousedown = this.downET;
        et.onmouseup = this.upET;
        et.onmouseenter = this.hoverET;
        et.onmouseleave = this.leaveET;
        et.style.fontWeight = 'normal'

        search.onfocus = (e) => {search.style.borderColor = "#4d90fe"}
        search.onblur = (e) => {search.style.borderColor = "transparent"}
        c.map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
        c.map.controls[google.maps.ControlPosition.TOP_LEFT].push(tbm);
        c.map.controls[google.maps.ControlPosition.TOP_LEFT].push(cbm);
        c.map.controls[google.maps.ControlPosition.TOP_LEFT].push(et);
       // map.setTilt(45);
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
            bounds = {
                north: position.lat() - 0.0010000,
                south: position.lat() + 0.0010000,
                east: position.lng() + 0.0010000,
                west: position.lng() - 0.0010000
            };
           // map.setZoom(16);
            c.map.setCenter(position);
            rectangle.setBounds(bounds);
        });
        c.map.addListener('mousemove', function () {
            c.map.setOptions({ draggableCursor: 'crosshair' });
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

            infoWindow.open(c.map);
        }
        rectangle.addListener('bounds_changed', showNewRect);

        //map.addListener('onready', this.onMapReady);
        
        //rectangle.setMap(map);
        c.polyC = new google.maps.Polyline({
            strokeColor: 'blue',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable: true,
            draggable: true,
        });
        c.polyT = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            editable: true,
            draggable: true,
        });
        c.polyC.setMap(c.map);
        c.polyT.setMap(c.map);

        const polygonC = new google.maps.Polygon({
            path: c.polyC.getPath(),
            strokeColor: 'blue',
            fillColor: 'blue',
            editable: true,
            //draggable: true,
           // geodesic: true
        });
        const polygonT = new google.maps.Polygon({
            path: c.polyT.getPath(),
            editable: true,
            //draggable: true,
           // geodesic: true
        });
        c.polygonC = polygonC;
        c.polygonT = polygonT;
        const _setLength = (poly, latlng) => {
            let needle = {
                minDistance: 9999999999, //silly high
                index: -1,
                latlng: null
            };
            let needle2 = {
                maxDistance: 0, //silly low
                index: -1,
                latlng: null,
                first: false
            };

            poly.getPath().forEach(function (routePoint, index) {
                let dist = google.maps.geometry.spherical.computeDistanceBetween(latlng, routePoint);
                if (dist < needle.minDistance) {
                    needle.minDistance = dist;
                    needle.index = index;
                    needle.latlng = routePoint;
                }
            });

            poly.getPath().forEach(function (routePoint, index) {
                let dist = google.maps.geometry.spherical.computeDistanceBetween(latlng, routePoint);
                let distT = google.maps.geometry.spherical.computeDistanceBetween(needle.latlng, routePoint);
                dist += needle.minDistance
                dist -= distT
                if (Math.round(dist) === 0 && !needle2.first) {
                    needle2.maxDistance = dist;
                    needle2.index = index;
                    needle2.latlng = routePoint;
                    needle2.first = Math.abs(needle.index - index) === 1
                }
            });

            let distance = google.maps.geometry.spherical.computeDistanceBetween(needle.latlng, needle2.latlng);
            const area = google.maps.geometry.spherical.computeArea(poly.getPath())
            let infowindow = new google.maps.InfoWindow();
            infowindow.setContent(`<div><b>Area: ${c.round(area,3)}</b></div>${c.round(distance,3)} Metros`);
            
            // infowindow.position = event.latLng;
            infowindow.setPosition(latlng);
            infowindow.open(c.map);

        }
        const onPathUpC = (e) => {
            let latlng = e.latLng;
            let poly = null
            poly = c.polyC
            _setLength(poly, latlng)
        }

        const onPathUpT = (e) => {
            let latlng = e.latLng;
            let poly = null
            poly = c.polyT
            _setLength(poly, latlng)
        }

        google.maps.event.addListener(c.polyC, 'mouseup', onPathUpC)
        google.maps.event.addListener(c.polyT, 'mouseup', onPathUpT)
         c.markerInfo = new google.maps.Marker({
             draggable: true,
         });
         c.infoWindow = new google.maps.InfoWindow();
         let infowindowContent = document.getElementById('infowindow-content');
         c.infoWindow.setContent(infowindowContent);
         function getIMarker(e) {
             a.getInfoMarker(c.map, e.latLng, infowindowContent);
         }
         this.searchAddr(c.map);
         google.maps.event.addListener(c.markerInfo, 'mouseup', getIMarker);
        function addLatLng(event) {
            let path = null
            let marker = new google.maps.Marker({
                position: event.latLng,
                draggable: true,
               // title: '#' + path.getLength(),
              //  map: map
            });
            if (c.bandC){
                path = c.polyC.getPath();
                marker.setTitle(`#${path.getLength()+1}`)
                marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png")
                c.markersC.push(marker)
            }else if(c.bandT){
                path = c.polyT.getPath();
                marker.setTitle(`#${path.getLength()+1}`)
                marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png")
                c.markersT.push(marker)
            }else{
               // c.markerInfo.setMap(map)
                a.getInfoMarker(c.map, event.latLng, infowindowContent);
                return;
            }
            let l = path.getLength();
            // Because path is an MVCArray, we can simply append a new coordinate
            // and it will automatically appear.
            path.push(event.latLng);
            marker.setMap(c.map);
            if(l>0){
               // const latlng = `(${path.getAt(l).getLat()}, ${path.getAt(l).getLng()})`
               // const latlng2 = `(${path.getAt(l-1).getLat()}, ${path.getAt(l-1).getLng()})`
                //console.log(path.getAt(l - 1))
                let distance = google.maps.geometry.spherical.computeDistanceBetween(event.latLng, path.getAt(l - 1));
                //const area = google.maps.geometry.spherical.computeArea(path)
                let infowindow = new google.maps.InfoWindow();
                infowindow.setContent(`${c.round(distance,3)} Metros`);

                // infowindow.position = event.latLng;
                infowindow.setPosition(event.latLng);
                infowindow.open(c.map);
            }
            const onMarkerClick = (e) => {
                if (c.polyC.getPath().getLength() > 2 && c.bandC && l===0) {
                  //  path.push(e.latLng);
                    c.polygonC.setMap(c.map);
                    google.maps.event.clearListeners(c.polygonC, 'mouseup')
                    google.maps.event.addListener(c.polygonC, 'mouseup', onPathUpC)

                    //c.markersC.push(c.markersC[0]);
                }else if (c.polyT.getPath().getLength() > 2 && l===0){
                   // path.push(e.latLng);
                    c.polygonT.setMap(c.map);
                    google.maps.event.clearListeners(c.polygonT, 'mouseup')
                    google.maps.event.addListener(c.polygonT, 'mouseup', onPathUpT)
                   // c.markersT.push(c.markersT[0]);
                }
                
            }
            const onMarkerDb = (e) => {
                let x = l
                
                if(c.bandC){
                    while (x < path.getLength()) {
                        path.removeAt(x);
                    }
                    while (c.markersC.length>x) {
                        c.markersC[c.markersC.length-1].setMap(null);
                        c.markersC.pop()
                    }
                }
                if(c.bandT){
                    while (x < path.getLength()) {
                        path.removeAt(x);
                    }
                    while (c.markersT.length>x) {
                        c.markersT[c.markersT.length-1].setMap(null);
                        c.markersT.pop()
                    }
                }
                
            }
            const calcArea = () => {
                if (c.polyT.getPath().getLength() > 2) {
                    const area = google.maps.geometry.spherical.computeArea(c.polyT.getPath())
                    document.getElementById('m1').value = Math.round(c.round(area, 3))
                }
                if (c.polyC.getPath().getLength() > 2) {
                    const area = google.maps.geometry.spherical.computeArea(c.polyC.getPath())
                    document.getElementById('m2').value = Math.round(c.round(area, 3))
                }
                
            }
            const onMarkerUp = (e) => {
                path.removeAt(l);
                path.insertAt(l, e.latLng);
                calcArea()
            }
            
            marker.addListener('click', onMarkerClick)
            marker.addListener('dblclick', onMarkerDb)
            marker.addListener('mouseup', onMarkerUp)
            //polyC.addListener('mouseup', onPathUp)
            calcArea()
        }
       
        // Add a listener for the click event
        //map.addListener('click', getInfoMarker);
        c.map.addListener('click', addLatLng);
        /*this.setState({
            map
        })*/
    }
    componentDidMount(){
        this.getLocation()
        const map = document.getElementById('rootMap')
        map.style.display='none'
       // map.style.height='0'
       // this.findCoordinates();
    }
    render() {
        const {position} = this.state
        return (
            <div id='rootMap' style={{ position: 'relative', height: "100vh", width: "100%" }}> 
                <MapsFun c={this} /> 
            </div>    
        );
    }
}

const LoadingContainer = (props) => ( <div> Cargando mapa... </div>)

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhC-bWwWeNI0XrC6kFH5KinWGUUWBtJBo'),
  language: 'es',
  LoadingContainer: LoadingContainer
})(MapContainer)

//}