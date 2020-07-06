import React from 'react';
import axios from 'axios';
import $, { timers } from 'jquery';
import './card.css';

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
  backApiCall = () => {
    axios.get('https://localhost:44393/api/collection')
      .then(res => {
        if(this.state.cardIndex == -1){
          this.setState({ 
            categoryIndex: this.state.categoryIndex - 1,
            cardIndex: res.data[this.state.categoryIndex - 1].cards.length - 1
          })
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

  minusIndex = () => {
    if(this.state.categoryIndex != 0 || this.state.cardIndex != 0){
      this.setState({ cardIndex: this.state.cardIndex - 1 })
      this.backApiCall(); 
    }
  }

  render = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="theCard">
              <div id="front">
                  <h5 id="category">{ this.state.category }</h5>
                  <h1 id="word">{ this.state.word }</h1>
              </div>
              <div id="back" className="card-body">
                <h4 id="def">{ this.state.def }</h4>
              </div>
            </div>
            <div id="buttons">
                <button className="btn btn-warning" id="backBtn" onClick={this.minusIndex}>Back</button>
                <button className="btn btn-primary" id="next" onClick={this.addIndex}>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;
