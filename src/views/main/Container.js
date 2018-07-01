
import React, { PropTypes as T } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './styles.module.css';
import {searchNearby, getDirections, getDetails} from 'utils/googleApiHelpers';
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
      home:{formatted_address:'Toronto, Ontario', types:["locality", "political"]},
      location: {lat: 43.653226, lng: -79.383184}, // Toronto
      directions: null, 
      details:null,
      map:null
    }
  }

  setContainerState = (stateobj) => {
    var stateObject = function() {
      var returnObj = {};
      returnObj[stateobj.id] = stateobj.value;
      console.log('returnObj ',returnObj)
      return returnObj;
    }.bind(event)();

    console.log('stateobject: ',stateObject)
    this.setState( stateObject );    
  }

  onReady(mapProps, map) {
    const {google} = this.props;
    let placetypes=['cafe', 'restaurant'];
    let places=[];

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
        
        if (results.length==0){
          places=[{
            name:'No nearby '+placetypes[i]+'s found',
            rating:0,
            place_id:'invalid',
          }]
          return
        }
        else{ 
          // selecting 1 random place for each placetype (eg. 1 cafe, 1 restauarant)
          places.push(results[getRandomInt(results.length)] ) }
          
          // console.log('nearby state place',this.state.places[0])
        }).then(() => {

          var placesarray=[]

          for (let i=0; i<places.length; i++){
            let placeid=places[i].place_id
            getDetails(google,map,placeid).then(details => {

              placesarray.push(details)
              this.setState({
                places: placesarray
              })
            })
          }
        })
      } 
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    } 

  createDirections(google, map, opts){
    // console.log('creating directions')
    getDirections(google, map, opts).then((response) => {
      this.setState({
        directions: response.routes[0].legs[0],
        map:map
      })
      // console.log('map : ', this.state.map)
    }).catch((result, status) => {
      // There was an error
      console.log('createDirections error: \nstatus: '+status+' \nresult: '+result)
    })
  }

  onMarkerClick(item) {
    const {place} = item; // place prop
    const {push} = this.context.router;
    push(`/map/detail/${place.place_id}`)
  }

  onItemClick(google,map,opts){
    console.log('CLICKED1!!')
    // let opts = {
    //   origin: mapCenter,
    //   destination: destination,
    //   travelMode: google.maps.TravelMode[selectedMode]
    // }
    // this.createDirections(google,map,opts)
  }

  shouldComponentUpdate(nextProps,nextState){
    if( (this.state.places != nextState.places) || (this.state.directions != nextState.directions)  
      || (this.state.home != nextState.home) || (this.state.location != nextState.location)
    ){
      // console.log('places changed: \n this.state: ',this.state.places,'next state: ', nextState.places)
      return true
    }

    return false
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
            map={this.state.map}
            google={this.props.google}
            callback={this.onItemClick.bind(this)}
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
