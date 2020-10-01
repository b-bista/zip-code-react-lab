import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function ZipCode(props) {
  return (
    <div>
      <li>
        {props.data}
      </li>
    </div>
  );
}

function CitySearchField(props) {
  return (<div>
    <p>City:</p>
    <input 
      placeholder="Enter a city name"
      type="text"
      onChange={props.cityChanged}
    />
  </div>);
}


class App extends Component {

  state = {
    userInputValue: "",
    results: []
  };

  handleCityChange = (event)=>{
    fetch(`http://ctp-zip-api.herokuapp.com/city/${event.target.value.toUpperCase()}`)
    .then(res => res.json())
    .then(body => {
      console.log(body);
      this.setState({results: body})
    })
    .catch(err=>console.error('Error:', err))
    
    console.log(this.state.results);

    this.setState({
      userInputValue: event.target.value.toUpperCase()
    });

  }

  render() {
    
    return (
      <div className="text-center">
        <div className="bg-dark py-4 mb-3">
          <h2 className="text-light">City Search</h2>
        </div>
        <CitySearchField cityChanged={(e) => this.handleCityChange(e)} zipValue={this.state.userInputValue}/>
        <div>
          {
            
            this.state.results.map(item => {
              //return <p>{item.City}</p>
              return <ZipCode data={item}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
