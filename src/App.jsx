import './App.css';
import Hero from './components/Hero';
import CreditsContainer from './components/CreditsContainer';


function App() {

  return (
    <div className='containerRoot'>
      <div className='heroArea'>
        <Hero/> 
      </div>

      <div className='creditsArea'>
        <CreditsContainer/>     
      </div>
    </div>
    
  );
}

export default App;
