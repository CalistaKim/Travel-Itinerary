import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import { Marker } from 'google-maps-react'
import homeIcon from './images/home.png'

export class mapMarker extends React.Component {

  componentWillReceiveProps(newprops){
    // console.log('componentWillReceiveProps')
    if ( (newprops.places !== this.props.places )){
      this.renderMarker(newprops)
    } 
  }

  renderMarker(newprops) {
    let {
      map, google, position, mapCenter, places, 
    } = newprops;

    var image = {
      url:homeIcon,
      scaledSize: new google.maps.Size(35, 35),
    };
    // let hpref = {
    //     map: map,
    //     position:mapCenter,
    //     icon:image
    //   }
    // this.marker = new google.maps.Marker(hpref);
    // places.map(p => {
    //   let pref = {
    //     map: map,
    //     position:p.geometry.location
    //   }
    //   this.marker = new google.maps.Marker(pref);
    // })

    // this will be dynamically set as the user browses through steps
    let step=0;

    if(places[step].geometry.location){
      let destination = places[step].geometry.location
      let selectedMode='DRIVING'
      let opts = {
        origin: mapCenter,
        destination: destination,
        travelMode: google.maps.TravelMode[selectedMode]
      }
      newprops.callback(google, map, opts)
    }else{
      // erase items directions
    }
  

  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default mapMarker