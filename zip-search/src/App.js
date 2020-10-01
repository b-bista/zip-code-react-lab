import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


function City(props) {
  return (
    <div className="card text-center mx-auto my-4 px-1" style={{width: "18rem"}}>
      <div className="card-header">
        <h5 className="card-title">{props.data.City}, {props.data.State}</h5>
      </div>  

      <div className="card-body">
        <h6 className="card-subtitle mb-2">State: {props.data.State}</h6>
        <h6 className="card-subtitle mb-2">Location: ({props.data.Lat}, {props.data.Long})</h6>
        <h6 className="card-subtitle mb-2">Population (estimated): {props.data.EstimatedPopulation}</h6>
        <h6 className="card-subtitle mb-2">Total Wages: {props.data.TotalWages}</h6>
      </div>

    </div>
  );
}

function ZipSearchField(props) {
  return (<div>
    <p>Zip Code:</p>
    <input 
      placeholder="Enter Zip Code"
      type="number"
      onChange={props.zipChanged}
    />
  </div>);
}


class App extends Component {

  state = {
    userInputValue: "",
    results: []
  };

  handleZipChange = (event)=>{
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
    .then(res => res.json())
    .then(body => {
      console.log(body);
      this.setState({results: body})
    })
    .catch(err=>console.error('Error:', err))
    
    console.log(this.state.results);

    this.setState({
      userInputValue: event.target.value
    });
  }

  render() {
    
    return (
      <div className="text-center">
        <div className="bg-dark py-4 mb-3">
          <h2 className="text-light">Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e) => this.handleZipChange(e)} zipValue={this.state.userInputValue}/>
        <div>
          {
            
            this.state.results.map(item => {
              //return <p>{item.City}</p>
              return <City data={item}/>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
