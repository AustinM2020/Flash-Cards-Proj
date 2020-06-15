import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './card.css';
import { render } from '@testing-library/react';

class Card extends React.Component {
  state = {
    word: null,
    def: null,
    category: null,
    cardIndex: 0,
    categoryIndex: 0 
  }

  componentDidMount () {
    axios.get('https://localhost:44393/api/collection')
      .then(res => {
        if(this.state.cardIndex > res.data[this.state.categoryIndex].cards.length - 1){
          this.setState({ 
            cardIndex: 0,
            categoryIndex: this.state.categoryIndex + 1
           })
           if(this.state.categoryIndex > res.data.length - 1){
            this.setState({ 
              cardIndex: 0,
              categoryIndex: 0
             })
           }
        }
        this.setState({
          word: res.data[this.state.categoryIndex].cards[this.state.cardIndex].word,
          def: res.data[this.state.categoryIndex].cards[this.state.cardIndex].definition,
          category: res.data[this.state.categoryIndex].title
        });
      })
  }

  addIndex = () => {
    this.setState({ cardIndex: this.state.cardIndex + 1 })
    this.componentDidMount(); 
  }

  render = () => {
    const cardStyle = {
      width: "50rem",
      margin: "0 auto",
      float: "none", 
      position: "relative",
      top: "300px"
    }
    return (
      <div>
         <div className="card" style={cardStyle}> 
            <div className="card-body">
              <h1 className="card-title">{ this.state.word }</h1>
              <h3 className="card-subtitle mb-2 text-muted">{ this.state.category }</h3>
              <h4 className="card-text">{ this.state.def }</h4>
              <button onClick={this.addIndex}>next</button>
          </div>
        </div>
      </div>
     
    )
  }
}

export default Card;
