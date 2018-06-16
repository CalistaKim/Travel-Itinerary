import React, { PropTypes as T } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './styles.module.css';
import {searchNearby} from 'utils/googleApiHelpers';

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
  onMarkerClick(item) {
    const {place} = item; // place prop
    const {push} = this.context.router;
    push(`/map/detail/${place.place_id}`)
  }
  render() {
    let children = null;
    if (this.props.children) {
      // We have children in the Container component
       children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          onMarkerClick: this.onMarkerClick.bind(this)
        });
    }
    return (
      <div>
        Hello from the container
        <Map
          google={this.props.google}
          className={styles.wrapper}
          onReady={this.onReady.bind(this)}
          visible={false}>
          <Header/>
          <Sidebar
            title={'Restaurants'}
            places={this.state.places}
            />
          <div className={styles.content}>
            {/* Setting children routes to be rendered*/}
            {children}
          </div>
        </Map>
      </div>
    )
  }
}
Container.contextTypes = {
  router: React.PropTypes.object
}

// Container.contextTypes = {
//   router: T.object
// }

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)

// export default Container
