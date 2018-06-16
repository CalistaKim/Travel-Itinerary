import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import Map, { Marker } from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {
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
  render() {
  	const {children} = this.props;
    return (
      <div className={styles.map}>
        <Map map={this.props.map}
	        google={this.props.google}
	        className={styles.map}
	        zoom={this.props.zoom}
	        onRecenter={this.props.onMove}
	        onDragend={this.props.onMove}
	        onClick={this.props.onClick}
	        visible={!children || React.Children.count(children) == 0}
	        >
	        {this._renderChildren()}
      </Map>
      </div>
    )
  }
}

MapComponent.propTypes = {
  onMarkerClick: T.func
}

export default MapComponent