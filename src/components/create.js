import React from 'react';
import axios from 'axios';
import './create.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

class Create extends React.Component {
    state = {
        word: " ",
        definition: " ",
        stackCategory: " ",
        categories: [],
        category: " "
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

    addCategory = () => {
        axios.post('https://localhost:44393/api/stack', {
            "title": `${this.state.category}`
        })
        .then(function (response) {
            console.log(response)
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
            stackCategory: event.target.value
        })
    }

    handleCategoryChange = (event) => {
        this.setState({
            category: event.target.value
        })
    }
    
    render() {
        console.log(this.state.categories)
        return (
          <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <Flippy id="createCard"
                    ref={(r) => this.flippyHorizontal = r}
                    flipOnClick={false}
                    >
                        <FrontSide id="createFront">
                            <button id="addStack" className="btn btn-primary" type="button" onClick={() => this.flippyHorizontal.toggle()}>Add New Category</button><br></br>
                            <select id="categoriesInp" className="form-control" value={this.state.stackCategory} onChange={this.handleStackChange}>
                                <option>-select-</option>
                                {this.state.categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <br></br>
                            <input id="wordInp" className="form-control" type="text" value={this.state.word} onChange={this.handleWordChange}></input><br></br>
                            <textarea id="defInp" className="form-control" type="text" value={this.state.definition} onChange={this.handleDefChange}></textarea><br></br>
                            <button className="btn btn-success" type="submit" onClick={this.addCard}>Add New Word</button>
                        </FrontSide>
                        <BackSide id="createBack">
                            <input id="wordInp" className="form-control" type="text" value={this.state.category} onChange={this.handleCategoryChange}></input><br></br>
                            <button id="cancel" className="btn btn-danger" type="button" onClick={() => this.flippyHorizontal.toggle()}>Cancel</button>
                            <button className="btn btn-success" onClick={this.addCategory}>Confirm</button>
                        </BackSide>
                    </Flippy>
                </div>
            </div>
        </div>            
        )
      }
}

export default Create;