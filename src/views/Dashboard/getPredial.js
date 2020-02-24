import ip from "variables/ip.js";
import genImp from "./genImp";


export default async(idOrden, tp, c) => {
   
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
            let dist = c.google.maps.geometry.spherical.computeDistanceBetween(latlng, routePoint);
            if (dist < needle.minDistance) {
                needle.minDistance = dist;
                needle.index = index;
                needle.latlng = routePoint;
            }
        });

        poly.getPath().forEach(function (routePoint, index) {
            let dist = c.google.maps.geometry.spherical.computeDistanceBetween(latlng, routePoint);
            let distT = c.google.maps.geometry.spherical.computeDistanceBetween(needle.latlng, routePoint);
            dist += needle.minDistance
            dist -= distT
            if (Math.round(dist) === 0 && !needle2.first) {
                needle2.maxDistance = dist;
                needle2.index = index;
                needle2.latlng = routePoint;
                needle2.first = Math.abs(needle.index - index) === 1
            }
        });

        let distance = c.google.maps.geometry.spherical.computeDistanceBetween(needle.latlng, needle2.latlng);
        const area = c.google.maps.geometry.spherical.computeArea(poly.getPath())
        console.log(`area: ${area}`)
        let infowindow = new c.google.maps.InfoWindow();
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
     const onMarkerClick = (e, l) => {
         if (c.polyC.getPath().getLength() > 2 && c.bandC && l === 0) {
             c.polygonC.setMap(c.map);
             c.google.maps.event.addListener(c.polygonC, 'mouseup', onPathUpC)
         } else if (c.polyT.getPath().getLength() > 2 && l === 0) {
             c.polygonT.setMap(c.map);
             c.google.maps.event.addListener(c.polygonT, 'mouseup', onPathUpT)
         }

     }
     const onMarkerUp = (e,path,l) => {
         //let l2 = null
         path.removeAt(l);
         path.insertAt(l, e.latLng);
         calcArea()
     }
     const onMarkerDb = (e,path,l) => {
         let x = l
         if (c.bandC) {
             while (x < path.getLength()) {
                 path.removeAt(x);
             }
             while (c.markersC.length > x) {
                 c.markersC[c.markersC.length - 1].setMap(null);
                 c.markersC.pop()
             }
         }
         if (c.bandT) {
             while (x < path.getLength()) {
                 path.removeAt(x);
             }
             while (c.markersT.length > x) {
                 c.markersT[c.markersT.length - 1].setMap(null);
                 c.markersT.pop()
             }
         }

     }
     const calcArea = () => {
         if (c.polyT.getPath().getLength() > 2) {
             const area = c.google.maps.geometry.spherical.computeArea(c.polyT.getPath())
             document.getElementById('m1').value = Math.round(c.round(area, 3))
         }
         if (c.polyC.getPath().getLength() > 2) {
             const area = c.google.maps.geometry.spherical.computeArea(c.polyC.getPath())
             document.getElementById('m2').value = Math.round(c.round(area, 3))
         }

     }
    try {
        const sendUri = ip('3022');
        const bodyJSON = {
            CTA: c.state.CTA,
            idOrden: idOrden,
            tp: tp
        }
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            //console.log(`Response1: ${r}`)

            if (r.predial !== undefined) {
                genImp(r.predial, c);
            }
            c.markerInfo.setMap(null)
            if (r.loca) {
                const latLng = {lat: parseFloat(r.loca[0].lat), lng: parseFloat(r.loca[0].lng)}
                c.map.setCenter(latLng)
                c.map.setZoom(16)
                c.markerInfo.setMap(c.map)
                c.markerInfo.setPosition(latLng)
            }
            let path = c.polyC.getPath();
            c.polyC.setMap(null)
            c.polyC.setMap(c.map)
            while (0 < c.markersC.length) {
                c.markersC[c.markersC.length - 1].setMap(null);
                c.markersC.pop()
            }
            while (0 < path.length) {
                path.pop()
            }
            if (r.pc) {
                let i = 0
                r.pc.forEach(e => {
                    const latLng = {lat: parseFloat(e.latC), lng: parseFloat(e.lngC)}
                    console.log(e)
                    let marker = new c.google.maps.Marker({
                        position: latLng,
                        draggable: true,
                        map: c.map
                    });
                    marker.setTitle(`#${path.getLength()+1}`)
                    marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png")
                    c.markersC.push(marker)

                    path.push(new c.google.maps.LatLng(parseFloat(e.latC), parseFloat(e.lngC)))
                    const l = i
                    c.google.maps.event.addListener(marker, 'mouseup', (e) => {
                        onMarkerUp(e, c.polyC.getPath(), l)
                    })
                    marker.addListener('dblclick', (e) => {
                        onMarkerDb(e, c.polyC.getPath(), l)
                    })
                    i++

                });
                if(!r.loca){
                    c.map.setCenter(c.markersC[0].getPosition())
                    c.map.setZoom(16)
                }
                if(path.length>2){
                    c.polygonC.setMap(c.map)
                    c.google.maps.event.clearListeners(c.polygonC, 'mouseup')
                    c.google.maps.event.addListener(c.polygonC, 'mouseup', onPathUpC)
                }else{
                    c.google.maps.event.clearListeners(c.polyC, 'mouseup')
                    c.google.maps.event.addListener(c.polyC, 'mouseup', onPathUpC)
                }
                
            }
            path = c.polyT.getPath();
            c.polyT.setMap(null)
            c.polyT.setMap(c.map)
            while (0 < c.markersT.length) {
                c.markersT[c.markersT.length - 1].setMap(null);
                c.markersT.pop()
            }
            while (0 < path.length) {
                path.pop()
            }
            if (r.pt) {
                let i = 0
                r.pt.forEach(e => {
                    const latLng = {lat: parseFloat(e.latT), lng: parseFloat(e.lngT)}
                    console.log(e)
                    let marker = new c.google.maps.Marker({
                        position: latLng,
                        draggable: true,
                        map: c.map
                    });
                    marker.setTitle(`#${path.getLength()+1}`)
                    marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png")
                    c.markersT.push(marker)

                    path.push(new c.google.maps.LatLng(parseFloat(e.latT), parseFloat(e.lngT)))
                    const l = i
                    c.google.maps.event.addListener(marker, 'mouseup', (e) => {
                        onMarkerUp(e, c.polyT.getPath(), l)
                    })
                    marker.addListener('dblclick', (e) => {
                        onMarkerDb(e, c.polyT.getPath(), l)
                    })
                    i++

                });
                if (!r.loca && !r.pc) {
                    c.map.setCenter(c.markersT[0].getPosition())
                    c.map.setZoom(16)
                }
                if(path.length>2){
                    c.google.maps.event.clearListeners(c.polygonT, 'mouseup')
                    c.polygonT.setMap(c.map)
                    c.google.maps.event.addListener(c.polygonT, 'mouseup', onPathUpT)
                }else{
                    c.google.maps.event.clearListeners(c.polyT, 'mouseup')
                    c.google.maps.event.addListener(c.polyT, 'mouseup', onPathUpT)
                }
                
            }
            /*else if (r.error.name === "error01") {
                       this.removeCookies()
                       confirmAlert({
                         title: "¡Error!",
                         message: "La contraseña es incorrecta.",
                         buttons: [{
                           label: "Aceptar",
                           onClick: () => {
                             this.props.history.push("/entrar");
                           }
                         }]
                       });
                     }*/
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}