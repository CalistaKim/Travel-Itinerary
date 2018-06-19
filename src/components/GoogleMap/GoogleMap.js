import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import { Marker } from 'google-maps-react'

import Searchbar from '../../components/Searchbar/Searchbar';

export class GoogleMap extends React.Component {

  componentWillReceiveProps(newprops){
    console.log('google maps got new props', newprops)
    this.loadMap(newprops);
  }
  componentDidMount(newprops) {
    this.loadMap();
  }

  loadMap(newprops=null) {
    console.log('map loading')
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.googlemap;
      const node = ReactDOM.findDOMNode(mapRef);

      var {center, zoom} = this.props;
      var {lat, lng} = center;

      if (newprops){
        center = newprops.center;
        zoom = newprops.zoom;
        var {lat, lng} = center;
      }

      

      console.log('2> map loading lat, lng: '+lat, lng)
      // const {lat, lng} = this.props.currentLocation;
      const coords = new maps.LatLng(lat, lng)
      
      const mapConfig = Object.assign({}, {
        center: coords,
        zoom: zoom,
        mapTypeControl:false,
      })

      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    return (
        <div ref='googlemap'>
          Loading map...
        </div>
    )
  }
}

Map.propTypes = {
  google:T.object,
  zoom:T.number,
  initialCenter:T.object
}

Map.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  mapTypeControl:false
}

export default GoogleMap