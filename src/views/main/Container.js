import React, { PropTypes as T } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './styles.module.css';
import {searchNearby} from 'utils/googleApiHelpers';

import Plan from 'components/Plan/Plan';
import Searchbar from 'components/Searchbar/Searchbar';
import GoogleMap from 'components/GoogleMap/GoogleMap';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null,
      cityinp: null,
      placeinp:null,
      radiusinp:null,
      lat: 35.689487 , 
      lng: 139.691706 // Tokyo
      // location: {lat: 43.653226 , lng: -79.383184} // Toronto
    }
  }

  //SEARCHBAR


  // PLAN
  search(){
    console.log('search called')
  }

  handleChange( {target} ) {
    console.log('handleChange called')
    this.setState({
      [target.name]: target.value
    });

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
      location: {lat: 43.653226 , lng: -79.383184},
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
        console.log('status: '+status+' \nresult: '+result)
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

    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div id="mapcontainer" className={styles.mapcontainer}>
        <GoogleMap 
        google={this.props.google} 
        initialCenter={{lat: 37.774929,lng: -122.419416}}
        zoom={15}
        defaultOptions={{mapTypeControl: false}}
        />
          {/*
          <Header/>
          <Searchbar/>
          <Plan
          onChange={this.handleChange.bind(this)}
          onClick={this.search.bind(this)}
          />
          <Map
            google={this.props.google}
            className={styles.wrapper}
            onReady={this.onReady.bind(this)}
            center={{lat:this.state.lat, lng:this.state.lng}}
            visible={false}>
            <Sidebar
              title={'Cafes'}
              places={this.state.places}
              />
            <div className={styles.content}> 
              {children} // Setting children routes to be rendered. Contains Map and Details 
            </div>
          </Map> */}
      </div>
    )
  }
}

// when user clicks on a map marker, will need to send to details route with placeID
// router used to push the user's browser to another route 
// contextType used to define the context of the container (used in onMarkerClick)
Container.contextTypes = {
  router: React.PropTypes.object
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)

// export default Container
