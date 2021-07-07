
import './App.css';
import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date().toLocaleString('zh-TW', { timeZone: props.data.timezone })
    }
  }
  
  tick(timezone) {
    this.setState({time: new Date().toLocaleString('zh-TW', { timeZone: timezone })});
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(this.props.data.timezone),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <tr>
        <td className="area">
          {this.props.data.area}
        </td>
        <td className="country">
          {this.props.data.country}
        </td>
        <td className="time">
          {this.state.time}
        </td>
      </tr>
    )
  }
}

class ClockTableTwo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAreas: [],
      clockItems: this.props.countryList.map((country) =>
        <Clock key={country.country.trim()} data={country} />
      )
    }

    this.areaItems = this.props.areaList.map((area, index) =>
      <label key={`${area}-${index}`}>
        <input type="checkbox" name="color1" value={area} onChange={(event) => this.handleSelected(event)}/>
          {area}
      </label>
    );

    this.handleSelected = this.handleSelected.bind(this);
  } 

  handleSelected(event) {
    const selectedArea = event.target.value;
    let selectedAreas = this.state.selectedAreas;

    if (event.target.checked) {
      selectedAreas.push(selectedArea);
    }
    else {
      selectedAreas = selectedAreas.filter( area => area !== selectedArea);
    }
    
    let countryList = [];
    if (selectedAreas.length !== 0){
      countryList = this.props.countryList.filter( country => {
        return selectedAreas.indexOf(country.area) !== -1;
      })
      .map((country) =>
        <Clock key={country.country.trim()} data={country} />
      );
    }
    else{
      countryList = this.props.countryList.map((country) =>
        <Clock key={country.country.trim()} data={country} />
      );
    }

    this.setState({
      selectedAreas: selectedAreas,
      clockItems: countryList
    });
  };

  render() {
    return (
      <div>
        <div className="center">{this.areaItems}</div>
        <table>
          <thead>
            <tr>
              <th colSpan="3">Time Zone</th>
            </tr>
            <tr>
              <th>Area</th>
              <th>Country</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clockItems}
          </tbody>
        </table>
      </div>
      )
  }
}

class APP extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ClockTableTwo areaList={this.props.areaList} countryList={this.props.countryList}/>
  }
}

export default APP;
