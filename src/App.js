
import { Carousel } from 'react-responsive-carousel';
import './App.css';
import Header from './Components/Header/Header';
import LowerHeader from './Components/Header/LowerHeader';
import CarouselEffect from './Components/Carousel/Carousel';

function App() {
  return (
    <div className="App">
    <Header/>
    <LowerHeader/>
    <CarouselEffect/>
    </div>
  );
}

export default App;
