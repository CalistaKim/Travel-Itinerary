import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import { Marker } from 'google-maps-react'

export class mapMarker extends React.Component {

  // componentDidUpdate(prevProps) {

  //   if ((this.props.map !== prevProps.map) ||
  //     (this.props.position !== prevProps.position) &&
  //     this.props.places) {
  //       console.log('componentDidUpdate')
  //       this.renderMarker();
  //   }
  // }

  componentWillReceiveProps(newprops){
    console.log('componentWillReceiveProps')
    if (newprops.places !== this.props.places){
      this.renderMarker(newprops);
    } 
  }
  renderMarker(newprops) {
    console.log('marker recieved places: ', newprops.places)
    let {
      map, google, position, mapCenter, places
    } = newprops;

    places.map(p => {
      let pref = {
        map: map,
        position:p.geometry.location
      }
      this.marker = new google.maps.Marker(pref);
    })

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