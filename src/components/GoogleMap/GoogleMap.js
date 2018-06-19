import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import { Marker } from 'google-maps-react'

export class GoogleMap extends React.Component {
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.googlemap;
      const node = ReactDOM.findDOMNode(mapRef);
      console.log(node)

      let {initialCenter, zoom, defaultOptions} = this.props;
      // let {lat, lng} = initialCenter;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng)
      
      console.log(defaultOptions)
      
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        defaultOptions: defaultOptions
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