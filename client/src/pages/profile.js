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
    // this.formatNumber = this.formatNumber.bind(this);
    // this.handleSearchChange = this.handleSearchChange.bind(this);
    // this.displayRateHandler = this.displayRateHandler.bind(this);
  }

  static contextType = AuthContext;

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

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
            search:'',
          };
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    return (
      <div className="container" id="container-padding">
        <h1 className="text-center margin-bottom">Welcome to the <span className="bold-text">countryLookup</span> Searchboard</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputSearch1" className="form-label">Country Search</label>
            <input type="text" onChange={this.handleSearchChange} className="form-control" id="exampleInputSearch1" placeholder="Enter a country" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary form-control" id="country-button">Search</button>
          </div>
        </form>

        <div>
            <form onSubmit={this.handleSEKSubmit}>
              <div className="converter">
                <label htmlFor="exampleInputCurrency1" className="form-label margin-right">Currency Converter (SEK)</label>
                <input type="text" onChange={this.displayRateHandler} className="form-control converter-input" id="exampleInputCurrency1" placeholder="Enter SEK & Hit Enter" value={this.state.SEK} />
                <button type="submit" className="btn btn-primary display-none">Submit</button>
              </div>
              {this.state.countries.map((country) => (
                <div key={country.name} className="country-card">
                  <div className="country-left">
                    <div className="country-left-box" >
                      <img src={country.flag} alt="flag" id="country-flag" />
                    </div>
                    <div className="contry-left-text">
                      <h3>{country.name}</h3>
                      <p>Population: {this.formatNumber(country.population)}</p>
                    </div>
                  </div>
                  <div className="country-right">
                    {!this.state.showSEK && <h3> 0 SEK = <span className="exchange">0 {country.currencies} </span></h3>}
                    {this.state.showSEK && <h3>{this.formatNumber(this.state.SEK)} SEK = <span className="exchange">{this.formatNumber((this.state.SEK * country.exchangeRate).toFixed(2))} {country.currencies}</span></h3>}
                    <p>1 SEK = {country.exchangeRate.toFixed(2)} {country.currencies}</p>
                  </div>
                </div>
              ))}
            </form>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
