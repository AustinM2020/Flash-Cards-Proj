import React from 'react';
import axios from 'axios';

class Create extends React.Component {
    state = {
        stackId: 0,
        word: " ",
        definition: " "
    }
    
    addCard(){
        axios.post('https://localhost:44393/api/card', {
            "stackId": this.state.stackId,
            "word": this.state.word,
            "definition": this.state.definition
        })
        .then(function (response) {
            console.log(response);
        })
    }

    render = () => {
        return (
          <div>
              <form onSubmit={this.addCard}>
                <input value={this.state.stackId}></input><br></br>
                <input value={this.state.word}></input><br></br>
                <input value={this.state.definition}></input><br></br>
              </form>
              <button type="submit" onClick={this.addCard}>Add New Word</button>
          </div>
        )
      }
}

export default Create;