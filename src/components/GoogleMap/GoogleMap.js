import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import { Marker } from 'google-maps-react'

import Searchbar from '../../components/Searchbar/Searchbar';

export class GoogleMap extends React.Component {
  _renderChildren() {
    const {children} = this.props;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        })
      })
    } else {
      return this._renderMarkers();
    }
  }
  _renderMarkers() {
    if (!this.props.places) {
      return;
    }
    return this.props.places.map(p => {
      return <Marker
                key={p.id}
                name={p.id}
                place={p}
                onClick={this.props.onMarkerClick.bind(this)}
                map={this.props.map}
                position={p.geometry.location} />
    });
  }

  componentWillReceiveProps(newprops){
    if (newprops.center !== this.props.center){
      this.loadMap(newprops, null);
    }
  }

  componentDidMount(newprops) {
    console.log('componentDidMount')
    this.loadMap();
  }

  loadMap(newprops=null, sendonce=null) {
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

      const coords = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign({}, {
        center: coords,
        zoom: zoom,
        mapTypeControl:false,
      })

      this.map = new maps.Map(node, mapConfig);

      this.map.addListener('ready', (evt) => {
        this.props.onReady(google, this.map)
      })
      maps.event.trigger(this.map, 'ready');

    }
  }

  render() {
    const {children} = this.props;
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
  initialCenter:T.object,
  onReady: React.PropTypes.func
}

Map.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  mapTypeControl:false,
  onReady: function() {console.log('default prop fired')}
}

export default GoogleMap