import React, { PropTypes as T } from 'react'
import styles from './styles.module.css'
import Listing from '../Listing/Listing'

export class Sidebar extends React.Component {

  shouldComponentUpdate(nextProps, nextState){

    if(nextProps.places && nextProps.directions && nextProps.home 
    || this.props.places && this.props.directions && this.props.home){
      // console.log('GOT ALL THE PROPS')
      return true
    }
   // console.log('MISSING PROPS')
   return false 
  } 
  
  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>{this.props.title}</h1>
        </div>
        <Listing 
        home={this.props.home}
        places={this.props.places}
        directions={this.props.directions}
        map={this.props.map}
        google={this.props.google}
        callback={this.props.callback}
        activeIndex={this.props.activeIndex}
        />
      </div>
    )
  }
}

export default Sidebar