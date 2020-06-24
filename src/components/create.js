import React from 'react';
import axios from 'axios';

class Create extends React.Component {
    state = {
        word: " ",
        definition: " ",
        stackCategory: " ",
        categories: []
    }

    componentDidMount () {
        var items = [];
        axios.get('https://localhost:44393/api/collection')
          .then(res => {
            let categories = this.state.categories;
            for(var i = 0; i < res.data.length; i++){
                categories.push(res.data[i].title)
            }
            this.setState({ categories })
            console.log(items)
          })
      }
    
    addCard = () => {
        var stackId = 0;
        for(var i = 0; i < this.state.categories.length; i++){
            if(this.state.stackCategory == this.state.categories[i]){
                stackId = i + 1;
            }
        }
        console.log(stackId)
        axios.post('https://localhost:44393/api/card', {
            "stackId": stackId,
            "word": `${this.state.word}`,
            "definition": `${this.state.definition}`
        })
        .then(function (response) {
            console.log(response);
        })
    }

    handleWordChange = (event) => {
        this.setState({
            word: event.target.value
        })
    }

    handleDefChange = (event) => {
        this.setState({
            definition: event.target.value
        })
    }

    handleStackChange = (event) => {
        this.setState({
            stackCategory : event.target.value
        })
    }

    render() {
        console.log(this.state.categories)
        return (
          <div>
            <select value={this.state.stackCategory} onChange={this.handleStackChange}>
                <option>Select</option>
                {this.state.categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <br></br>
            <input type="text" value={this.state.word} onChange={this.handleWordChange}></input><br></br>
            <input type="text" value={this.state.definition} onChange={this.handleDefChange}></input><br></br>
            <button type="submit" onClick={this.addCard}>Add New Word</button>
          </div>
        )
      }
}

export default Create;