import ReactDOM from 'react-dom'
import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import styles from './styles.module.css'


import {getquizcontent} from './Questions'
// import {test, obj} from './Test'
const qcontent = getquizcontent()


export class Quiz extends React.Component{

 constructor(props) {
    
    super(props);
    this.state = {
      page:0,
      content: qcontent,
      stylekey:{tempo:0, price: 0, metropolitan:0, artistic:0, nature:0},
      quizend:false
    }
    // this.getQuestions= this.getQuestions.bind(this)
  }

  getQuestions(page){
    console.log('page: ',page)
    var content = this.state.content.content[page]
    var question = content.question
    var answers = content.answers

    var intro = ''
    if (page == 0) intro = 'Let\'s answer a few quick questions to get you started'

    return(
      <div className={styles.quizlet}>
        <h3>{intro}</h3>
        <h3>{question}</h3>
        {answers.map((answer,index) => {
          return(
            <p key={'answer_'+index} onClick={() =>this.selectAnswer(page,answer.weight)} className={styles.answer}>{answer.answer}</p>
          )
        })}
        
      </div>
      )
    }
    selectAnswer(page, weight){
      var stylekey = this.state.stylekey
      Object.keys(weight).map(key =>{
        if(key in stylekey){
          stylekey[key]=stylekey[key]+weight[key]
        }
      })
      if (page == 4) {
        // checking to see if are any two styles which are weighted the same at the end of the quiz 
        // if a match is found, another question is asked to give one style more weighting
        var sk = this.state.stylekey
        var met = sk.metropolitan
        var art = sk.artistic
        var nat = sk.nature

        if ( ( [art,nat].indexOf(met) > -1 &&  met !=0 )
          || ( [met,nat].indexOf(art) > -1 &&  art !=0 )
          || ( [met,art].indexOf(nat) > -1 &&  nat !=0 ) ){
          console.log('FOUND A MATCH!')

        }else{
          // Setstate has an optional second parameter which is a callback function!
          this.setState({
            quizend:true
          })

          var stylekeyobj={ id: 'stylekey', value:stylekey}
          var showquizobj={ id: 'showquiz', value:false}
          this.props.callback(stylekeyobj)
          setTimeout(() => {this.props.callback(showquizobj)},500)
          return
        }
      }
      console.log(stylekey)
      this.setState({
        page:page+1
      })

    }

  shouldComponentUpdate(nextState){

    if(this.state.page != nextState.page){
      // console.log('shouldComponentUpdate: page')
      // console.log('this.state.page: '+this.state.page+' nextState.page:'+nextState.page)
      return true
    }
    return false
  }

  render(){

    return(
      <div className={classnames(styles.quizContainer, { [styles.quizFade]: this.state.quizend })}>
        {this.getQuestions(this.state.page)}
      </div>
    )
  }
}

export default Quiz