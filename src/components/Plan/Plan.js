import React, { PropTypes as T } from 'react'
import styles from './styles.module.css';

import classnames from 'classnames'


export class Plan extends React.Component{

	render(){
		return(
			<div className={styles.divspace}>
        <label>city</label>
  			<input className={styles.search_input} name="cityinp" onChange={ this.props.onChange } />
        <input className={styles.search_input} name="placeinp"  onChange={ this.props.onChange } />
        <input className={styles.search_input} name="radiusinp"  onChange={ this.props.onChange } />
        
			
        <button className={styles.searchbtn} onClick={this.props.onClick}>Search</button>
			</div>
		)
	}
}

export default Plan