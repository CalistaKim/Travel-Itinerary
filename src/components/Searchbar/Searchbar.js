import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styles from './styles.module.css';
import classnames from 'classnames';
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { address: '' }
  }
 
  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    console.log('handleSelect')
    geocodeByAddress(address)
      .then( (results) => { 
        console.log(results)
        var stateobject ={ id: 'home', value:results[0] }
        this.props.callback(stateobject);
        return getLatLng(results[0]) })
      .then(
        latLng => {
          // console.log('Success', latLng)
          var stateobject ={ id: 'location', value:latLng }
          this.props.callback(stateobject);
        })
      .catch(error => console.error('Error', error))
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        callback={this.props.callback}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className={styles.searchbar}>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput