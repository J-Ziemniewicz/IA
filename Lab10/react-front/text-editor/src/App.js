import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.text = "";

    this.state = {
      isLogged: false,
      login: "",
      text: "",
    };

    this.showText = this.showText.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showText(login) {
    this.setState({
      isLogged: true,
      login: login,
    })
  }

  showLogin() {
    this.setState({
      isLogged: false,
    })
  }

  handleChange(e) {

    if (e.target.value !== "") {
      this.setState({
        login: e.target.value
      });
    }
  }

  render() {
    var login = (
      <div>
        <div className="Log-menu">
          Menu logowania
      </div>
        <div className="Log-input">
          <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
          <button className="Log-btn" onClick={() => this.showText(login)}>Loguj</button>
        </div>
      </div>
    );

    var text = (
      <div>
        <div className="Log-menu">
          Notatka
          </div>
        <div>
          <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
        </div>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-name">
            Notatnik
        </p>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Container">
          {this.state.isLogged ? text : login}
        </div>
      </div>
    )
  }
}

export default App;
