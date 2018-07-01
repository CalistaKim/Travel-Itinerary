import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export function searchNearby(google, map, request) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status, pagination) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        results = results.map(function(item){
            getLatLng(item).then(latLng => {
              item.geometry.location = latLng
            }) 
           return item;   
        });
        resolve(results, pagination);
      } else {
        reject(results, status);
      }
    })
  });
}

export function getDetails(google, map, placeId) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);
    const request = {placeId}

    service.getDetails(request, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return reject(status);
      } else {

        function getloc(item){
            getLatLng(item).then(latLng => {
              item.geometry.location = latLng
            }) 
           return item;   
        };
        place = getloc(place)

        resolve(place);
      }
    })
  })
}

export function getDirections(google, map, request){
  return new Promise((resolve, reject) => {
    const service = new google.maps.DirectionsService(map);
    const directionsDisplay = new google.maps.DirectionsRenderer();

    service.route(request, function(response, status) {
      if (status == 'OK') {
        // console.log('DIRECTIONS STATUS OK')

        directionsDisplay.setMap(map)
        directionsDisplay.setDirections(response);
        resolve(response);
      } else {
        // console.log('DIRECTIONS STATUS NOT OK')
        reject(results, status);
      }
    })
  })
}