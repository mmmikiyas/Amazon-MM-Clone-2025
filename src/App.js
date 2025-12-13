
import { Carousel } from 'react-responsive-carousel';
import './App.css';
import Header from './Components/Header/Header';
import LowerHeader from './Components/Header/LowerHeader';
import CarouselEffect from './Components/Carousel/Carousel';
import Category from './Components/Category/Category.jsx';
import Product from './Components/Product/Product.jsx';

function App() {
  return (
    <div className="App">
    <Header/>
    <LowerHeader/>
    <CarouselEffect/>
    <Category/>
    <Product/>
    </div>
  );
}

export default App;
