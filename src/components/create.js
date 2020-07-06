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
        flipped: false
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
    
    flip = (e) => {
        this.setState({
            flipped: true
        })
    }
    simulateClick = (e) => {
        e.click()
      }
    render() {
        console.log(this.state.categories)
        return (
          <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <Flippy id="createCard"
                    ref={(r) => this.flippyHorizontal = r}
                    flipOnClick={this.state.flipped}
                    >
                        <FrontSide ref={this.simulateClick}  onClick={()=> console.log('clicked')} id="createFront">
                            <button type="button" onClick={this.flip}>Toggle Me!</button>
                            <select id="categoriesInp" class="form-control" value={this.state.stackCategory} onChange={this.handleStackChange}>
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
                            <input id="wordInp" className="form-control" type="text" value={this.state.word} onChange={this.handleWordChange}></input><br></br>
                        </BackSide>
                    </Flippy>
                </div>
            </div>
        </div>            
        )
      }
}

export default Create;