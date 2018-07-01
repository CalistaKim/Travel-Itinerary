import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Rating from 'components/Rating/Rating';
import styles from './styles.module.css'

export class Item extends React.Component {

  renderPhotostrip(){
    const {place} = this.props;
    const maxsize = {maxWidth: 100, maxHeight: 100}
    let photostrip
    if(this.props.gotDetails){
      photostrip =  
      <div className={styles.photoStrip}>
          {place.photos.map(p => {
            const url = `${p.getUrl(maxsize)}.png`
            return (<img key={url} src={url} />)
          })}
      </div>
    }
    return photostrip
  }

  renderDirections() {
    let directionsTab
    if (this.props.directions){
      // console.log('directions from item: ',this.props.directions)
      const directions = this.props.directions
      let travel_time=directions.duration.text
      let steps = directions.steps
      directionsTab= 
      <div> 
        <h3>DIRECTIONS </h3> <span>travel time: {travel_time} </span> 
        { 
        steps.map((step, index)=>{
          let text = step.instructions
          return(<div key={'step_'+index} className={styles.step} > <p dangerouslySetInnerHTML={{__html: text}}/> </div>)
        })}
      </div>
    }
    return directionsTab
  }

  renderItem() {
    const {place} = this.props;
    let address=place.vicinity;
    let price_level = '';
    switch (place.price_level){
      case 1:
        price_level = 'thrifty'
      case 2:
        price_level = 'normal'
      case 3:
        price_level = 'moderate'
      case 4:
        price_level = 'expensive'
    }
    let item=
      <div>
        <div className={styles.item}>
          <h1 className={classnames(styles.title)}>{place.name}</h1>
          <Rating percentage={place.rating/5}/>
        </div>
        <p>{price_level}</p>
        <p>address: {address}</p>
      </div>
    return item
  }

  render() {

    return (
      <div className={ classnames(styles.itemContainer, { [styles.active]: this.props.isActive }) } onClick={this.props.onClick}>
          {this.renderItem()}
          {this.renderPhotostrip()}
          {this.renderDirections()}

      </div>
    )
  }
}

export default Item