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
    this.fetchText = this.fetchText.bind(this);
    this.showState = this.showState.bind(this);
  }

  fetchText() {
    console.log(`http://localhost:8000/login/${String(this.state.login)}`);
    fetch(`http://localhost:8000/login/${String(this.state.login)}`)
      .then(response => response.json())
      .then(data => {
        this.text = data;
        this.setState({
          text : this.text,
        });
        

      })
      .catch(err => console.error(err));
  }

  showText() {
    this.fetchText();
    this.setState({
      isLogged: true,
    })
    console.log(this.state.login);
  }

  showLogin() {
    this.setState({
      isLogged: false,
    })
  }
  showState(){
    console.log(this.state.login);
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
          <button className="Log-btn" onClick={() => this.showText()}>Loguj</button>
        </div>
      </div>
    );

    var text = (
      <div>
        <div className="Log-menu">
          Notatki
          </div>
        <div className = "Text-container">
          <div className="Text-header">Nowa notatka</div>
          <textarea type="text" className="input-text" onChange={this.handleChange} placeholder="Search..." />
          <button className = "Text-add" onClick={this.showState}>Dodaj notatkę</button>
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
