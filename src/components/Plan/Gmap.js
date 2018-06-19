import React from 'react';
import ReactDOM from 'react-dom';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const SimpleMapExampleGoogleMap = withGoogleMap( props => {
    console.log("here new props are used", props)
    return <GoogleMap
      defaultZoom={15}
      defaultCenter={new google.maps.LatLng(props.lat, props.lng)}
    />
 }
);

class GMap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
        }
    }

    render() {
        console.log("New props ", this.props)

        return <SimpleMapExampleGoogleMap
                lat={this.state.lat}
                lng={this.state.lng}
                containerElement={
                  <div style={{ height: `500px` }} />
                }
                mapElement={
                  <div style={{ height: `500px` }} />
                }
            />
    }
}
export { GMap }