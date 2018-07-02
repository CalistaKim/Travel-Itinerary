
import React from 'react'

export function getquizcontent(){
  return{
    content: [
      {
        question:"1. You’ve just arrived at your accommodations ! What’s next?",
        answers:[
          {answer: 'Immediately unpack and organize, then figure out your day', weight:{tempo:3} },
          {answer: 'Lounge and relax, acquaint yourself with your surroundings', weight:{tempo:1} },
          {answer: 'Grab what you need and head out the door for adventure!', weight:{tempo:4} },
          {answer: 'Explore the neighbourhood and figure out the day as you go', weight:{tempo:2} }
        ]
      },
      {
        question:"2. Today’s activities are: ",
        answers:[
          {answer: 'Flagship stores, outdoor shopping centre', weight:{metropolitan:1, price:3} },
          {answer: 'Art museums, symphony', weight:{artistic:1, price:2} },
          {answer: 'Large park, garden conservatory ', weight:{nature:1, price:1} }
        ]
      },
      {
        question:" 3. \"Let’s drop by somewhere and pick up a snack\" ",
        answers:[
          {answer: 'Local bakery', weight:{artistic:1, price:2} },
          {answer: 'Viral trendy food', weight:{metropolitan:1, price:2} },
          {answer: 'Bulk barn ', weight:{nature:1, price:1} }
        ]
      },
      {
        question: "4. You want to try something new ",
        answers:[
          {answer: 'Michelin star', weight:{metropolitan:1, price:4} },
          {answer: 'Instagrammable atmosphere ', weight:{artistic:1, price:2} },
          {answer: 'Vegan', weight:{nature:1, price:2} }
        ]
      },
      {
        question: "5. To buy or not to buy? You're on the fence. Pick the most persuasive label. ",
        answers:[
          {answer: 'Fair-trade, ethical, and sustainable', weight:{metropolitan:1, price:4} },
          {answer: 'Designer label 60% markdown ', weight:{artistic:1, price:2} },
          {answer: 'Vegan', weight:{nature:1, price:2} }
        ]
      },
      {
        question: "6. Select a package ",
        answers:[{
          metropolitan:{answer:'Wine and cheese Tour', weight:{metropolitan:1, price:3} },
          nature:{answer:'Kayaking rental', weight:{nature:1, price:2} },
          artistic:{answer:'Local cuisine cooking class', weight:{artistic:1, price:2} }
        }]
      } 
    ]
  }
}

