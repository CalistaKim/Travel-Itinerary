
import React, { PropTypes as T } from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import styles from './styles.module.css';
import {searchNearby, getDirections, getDetails} from 'utils/googleApiHelpers';
import classNames from 'classnames';

import Marker from 'components/Marker/Marker';
import Searchbar from 'components/Searchbar/Searchbar';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Quiz from 'components/Quiz/Quiz';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      home:{formatted_address:'Toronto, Ontario', types:["locality", "political"]},
      location: {lat: 43.653226, lng: -79.383184}, // Toronto
      directions: null, 
      details:null,
      map:null,
      directionsDisplay:null,
      activeIndex:null,
      stylekey:null,
      showquiz:true
    }
    this.onReady = this.onReady.bind(this)
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
    var placetypes=['cafe', 'restaurant'];
    var places=[];

    if (this.state.stylekey){

      var typekey=this.state.stylekey.types[0] 
      console.log('onready typekey',typekey)
      // find the highest value key in types
      var travelType = Object.keys(typekey).reduce((a, b) => typekey[a] > typekey[b] ? a : b);
      console.log('travel type is: '+travelType)
      switch(travelType){
        case 'nature':
          placetypes=['cafe','campground','aquarium','restaurant'];
          break
        case 'artistic':
          placetypes=['bakery', 'book_store', 'art_gallery','restaurant'];
          break
        case 'metropolitan':
          placetypes=['cafe', 'shopping_mall', 'restaurant'];
          break
      }
    }

    for (let i=0; i < placetypes.length; i++){
      const opts = {
        location: this.state.location,
        radius: '5000',
        types: [placetypes[i]]
      }
      searchNearby(google, map, opts)
      .then((results, pagination) => {
        var numplaces=results.length;
        
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
            var placeid=places[i].place_id
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

  createDirections(google, map, opts, index){
    // console.log('creating directions')
    // console.log('createDirections index '+index)
    var directionsDisplay = null
    if (!this.state.directionsDisplay){
      directionsDisplay = new google.maps.DirectionsRenderer();
      this.setState({directionsDisplay:directionsDisplay})
    }

    getDirections(google, map, opts, this.state.directionsDisplay)
    .then((response) => {
      this.setState({
        directions: response.routes[0].legs[0],
        map:map
      })
      if(index!=null){
        this.setState({activeIndex:index})
        // console.log('setstate index '+this.state.activeIndex)
      }
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

  onItemClick(google,map,places,index, isActive){
    // console.log('all places: ',places)
    // console.log('onItemClick index '+index)
    var origin = this.state.location
    let destination = this.state.places[index].geometry.location
    
    if(isActive == true){
      console.log('step is already active')
      return
    }
    if(index > 0){
      origin = this.state.places[index-1].geometry.location
    }

    let opts = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode['DRIVING']
    }
    this.createDirections(google,map,opts,index)
  }

  shouldComponentUpdate(nextProps,nextState){
    if( (this.state.places != nextState.places) || (this.state.directions != nextState.directions)  
      || (this.state.home != nextState.home) || (this.state.location != nextState.location)
      || (this.state.activeIndex != nextState.activeIndex)
    ){
      // console.log('places changed: \n this.state: ',this.state.places,'next state: ', nextState.places)
      return true
    }
    else if(this.state.showquiz != nextState.showquiz){
      return true
    }
    else if(this.state.stylekey != nextState.stylekey){
      console.log('stylekey different')
      return true
    }

    return false
  }
  renderQuiz(){
    if(this.state.showquiz){
      return(
        <Quiz callback={this.setContainerState}/> 
      )
    }
  }
  renderEverything(){
    if(!this.state.showquiz){
      return(
      <div>
        <Header/>
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
            activeIndex={this.state.activeIndex}
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
              activeIndex={this.state.activeIndex}
              />
            </GoogleMap>
          </div>
        </div>
      </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderQuiz()}
        {this.renderEverything()}
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
