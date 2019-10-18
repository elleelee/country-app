import React, { Component } from 'react';
import AuthContext from '../context/auth-context'


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      countries:[],
      SEK: '',
      showSEK: false,
      result: ''
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.displayRateHandler = this.displayRateHandler.bind(this);
  }

  static contextType = AuthContext;

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  }

  displayRateHandler = (event) => {
    let updatedSEK = event.target.value;
    this.setState({SEK: updatedSEK});
  }

  handleSEKSubmit = (e) => {
    e.preventDefault();
    this.setState({
      showSEK: true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/users/data?country=${this.state.search}`, {
      method:"GET",
      headers: {
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then((res) => {
        if(res.status !== 200) {
          throw new Error('Unable to connect to the web service!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData === undefined) {
          throw new Error('Country has been added to the list!')
        }
        if (resData.error) {
          throw new Error('Cannot find country!')
        }
        this.setState(state => {
          const countries = state.countries.concat(resData)
          return {
            countries,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    return (
      <div className="container">
        <h1>The Profile Page</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputSearch1">Search</label>
            <input type="text" onChange={this.handleSearchChange} className="form-control" id="exampleInputSearch1" placeholder="Enter country" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>

        <div>
            <form onSubmit={this.handleSEKSubmit}>
              <label htmlFor="exampleInputCurrency1">Currency Converter</label>
              <input type="text" onChange={this.displayRateHandler} className="form-control"  id="exampleInputCurrency1" placeholder="Enter SEK" value={this.state.SEK} />
              <button type="submit" onClick={this.handleSEKSubmit} className="btn btn-primary display-none">Submit</button>
              {this.state.countries.map((country) => (
                <div key={country.name}>
                  <h3>{country.name}</h3>
                  <p>{country.population}</p>
                  <p>{country.currencies} {country.exchangeRate.toFixed(2)}</p>
                  {!this.state.showSEK && <p>{country.currencies}: 0 </p>}
                  {this.state.showSEK && <p>{country.currencies}: {(this.state.SEK * country.exchangeRate).toFixed(2)} </p>}
                </div>
              ))}
            </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
