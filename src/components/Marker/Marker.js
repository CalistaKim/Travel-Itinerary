import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import { Marker } from 'google-maps-react'
import homeIcon from './images/home.png'

export class mapMarker extends React.Component {

  componentWillReceiveProps(newprops){
    // console.log('componentWillReceiveProps')
    if ( newprops.places !== this.props.places) {
      // console.log('newprops', newprops.places)
      this.renderMarker(newprops)
    }
  }

  renderMarker(newprops) {
    let {
      map, google, position, mapCenter, places, 
    } = newprops;

    // this will be dynamically set as the user browses through steps
    var step=0;
    if (this.props.activeIndex){
      step = this.props.activeIndex
    }
  
    if(places[step].geometry.location){
      let destination = places[step].geometry.location
      let selectedMode='DRIVING'
      let opts = {
        origin: mapCenter,
        destination: destination,
        travelMode: google.maps.TravelMode[selectedMode]
      }
      newprops.callback(google, map, opts, step)
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