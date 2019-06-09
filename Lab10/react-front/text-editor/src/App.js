import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.content = [];
    this.logged = false;
    this.login = '';

    this.state = {
      isLogged: false,
      login: "",
      text: "",
      notes: [],
    };


    this.showLogin = this.showLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.loginFun = this.loginFun.bind(this);
    this.showState = this.showState.bind(this);
    this.logout = this.logout.bind(this);
    this.addNote = this.addNote.bind(this);

  }


  loginFun() {
    console.log(this.state.login);
    fetch(`http://localhost:8000/login/${String(this.state.login)}`)

      .then(response => response.json())
      .then(data => {

        this.setState({
          notes: data.notes,
          isLogged: data.success,
        });
      })
      .catch(err => console.error(err));

  }

  logout() {
    fetch('http://localhost:8000/logout')
      .then(response => response.json())
      .then(data => {

        this.setState({
          isLogged: data.logged,
        });
      })
      .catch(err => console.error(err));
  }

  addNote() {
    fetch('http://localhost:8000/add', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: this.state.text,
      })
    })
      .then(response => response.json())
      .then(data => {

        this.setState({
          notes: data.content,
          text:'',
        });
      })
      .catch(err => console.error(err));
  }

  showLogin() {
    this.setState({
      isLogged: false,
    })
  }

  showState() {
    console.log(this.state.login);
  }

  handleChange(e) {

    if (e.target.value !== "") {
      this.setState({
        login: e.target.value
      });
    }
  }

  handleChangeNote(e) {

    if (e.target.value !== "") {
      this.setState({
        text: e.target.value
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
          <button className="Log-btn" onClick={this.loginFun}>Loguj</button>
        </div>
      </div>
    );

    var notes = this.state.notes.map((data) => {
      return (
        <div className="Note-container">
          <div className="Note-content">{data.content}</div>
          <div>{data.date}</div>
        </div>
      )
    })


    var text = (
      <div>
        <div>
          <div className="Log-menu">
            Notatki
        <button className="Logout-btn" onClick={this.logout}>Wyloguj</button>
          </div>
          <div>
            {notes}
          </div>
        </div>
        <div className="Text-container">
          <div className="Text-header">Nowa notatka</div>
          <textarea type="text" className="input-text" onChange={this.handleChangeNote} placeholder="Nowa notatka" />
          <button className="Text-add" onClick={this.addNote}>Dodaj notatkę</button>
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
