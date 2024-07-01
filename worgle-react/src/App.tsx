import { Component } from 'react';
import './App.css';
import TileGrid from './TileGrid';

function App() {
  return (
    <div 
      className="App">
      <TileGrid/>
      <Welcome/>
    </div>
  );
}

class Welcome extends Component {
  componentDidMount() {
    // call api or anything
    document.addEventListener('click', this.handleClick);
    console.log("Component has been rendered");
  }

  handleClick() {
    console.log("You clicked");
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handleClick);
    console.log("Component will be removed");
  }



  render() {
    return <h1>Hello, World</h1>;
   }
 }

export default App;
