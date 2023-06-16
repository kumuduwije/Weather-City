import './App.css'
import CustomCard from "./components/CustomCard";
import InputBox from "./components/InputBox";


function App() {
  return (
    <div className="App">
        <h1>Weather City</h1>
       <CustomCard/>

        <div className="footer-area">
            <p>© By Kumudu Wijewardhana</p>
        </div>
    </div>

  );
}

export default App;
