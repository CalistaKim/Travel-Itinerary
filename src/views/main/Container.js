import React, { PropTypes as T } from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import Header from 'components/Header/Header'
import styles from './styles.module.css'
import {searchNearby} from 'utils/googleApiHelpers'

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    }
  }
  renderChildren() {
    const childProps = {
      ...this.props
    };
    const {children} = this.props;
    return React.Children.map(children,
              c => React.cloneElement(c, childProps));
  }
   onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }
  render() {
    return (
      <div>
        Hello from the container
        <Map
          google={this.props.google}
          className={styles.wrapper}
          onReady={this.onReady.bind(this)}
          visible={false}>
          <Header/>
          <div className={styles.content}>
            {this.state.places.map(place => {
              return (<div key={place.id}>{place.name}</div>)
            })}
          </div>
        </Map>
      </div>
    )
  }
}

Container.contextTypes = {
  router: T.object
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)

// export default Container
