import React, { PropTypes as T } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './styles.module.css';
import {searchNearby, getDirections} from 'utils/googleApiHelpers';
import classNames from 'classnames';

// import Plan from 'components/Plan/Plan';
import Marker from 'components/Marker/Marker';
import Searchbar from 'components/Searchbar/Searchbar';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      home:null,
      location: {lat: 43.653226, lng: -79.383184}, // Toronto
      directions: null, 
    }
  }

  setContainerState = (stateobj) => {
    var stateObject = function() {
      var returnObj = {};
      returnObj[stateobj.id] = stateobj.value;
      console.log('returnObj ',returnObj)
         return returnObj;
    }.bind(event)();

    // console.log('stateobject: ',stateObject)
    this.setState( stateObject );    
  }

  onReady(mapProps, map) {
    const {google} = this.props;

    // 1. update places in state to only contain one cafe
    // 2. add arrival / departure to schedule, under name + rating 
    // 3. create loop to search Nearby for cafe + restaurant
    // 4. create travel style test

    let placetypes=['cafe', 'restaurant']
    var places=[];

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    
    for (let i=0; i < placetypes.length; i++){
      const opts = {
        location: this.state.location,
        radius: '500',
        types: [placetypes[i]]
      }

      searchNearby(google, map, opts)
      .then((results, pagination) => {

        // collecting places a minimum of 4 star rating
        let numplaces=results.length;
        let temparray=[]
        for (let i=0; i< numplaces; i++){
          if(results[i].rating >= 4.0){
            // console.log(results[i].name+' rating: '+results[i].rating)
            temparray.push(results[i])
          }
        }
        if (temparray.length==0){
          console.log('NO NEARBY '+placetypes[i]+'s FOUND')
          places=[{
            name:'No nearby '+placetypes[i]+'s found',
            rating:0,
            id:'invalid',
          }]
        }
        else{ places.push(temparray[getRandomInt(temparray.length)]) }

        this.setState({
          places: places
        })
      }).catch((status, result) => {
        // There was an error
        console.log('status: '+status+' \nresult: '+result)
      })
    }

  }

  createDirections(google, map, opts){
    console.log('creating directions')

    getDirections(google, map, opts).then((response) => {
      // console.log('directions object: ',response.routes[0].legs[0])
      this.setState({
        directions: response.routes[0].legs[0]
      })
    }).catch((result, status) => {
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
    // console.log('updated places :', this.state.places)
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
        <Searchbar
        callback={this.setContainerState}
        />
        <div className={styles.wrapper}>
          <Sidebar
            title={'Schedule'}
            places={this.state.places}
            directions={this.state.directions}
            home={this.state.home}
          />
          <div id="mapcontainer" className={[styles.mapcontainer, styles.content].join(' ')}>
            <GoogleMap 
            places={this.state.places}
            google={this.props.google} 
            center={this.state.location}
            zoom={15}
            onReady={this.onReady.bind(this)}
            >
              <Marker 
              center={this.state.location}
              google={this.props.google} 
              callback={this.createDirections.bind(this)}
              />
            </GoogleMap>
          </div>

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
