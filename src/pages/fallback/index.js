import logo from 'logo.svg';
import 'App.css';

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          App is going to <code>CRASH</code>
        </p>
        <p>
          Reload or Open the Apps from the Beginning
        </p>
      </header>
    </div>
  );
}

export default Index;
