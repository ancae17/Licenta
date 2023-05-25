import * as React from 'react';
import NavBar from '../NavBar';
import GlassesImage from './GlassesImage';

const products = [
    { id: 1, title: 'Product 1', image: 'https://pentrubar.ro/5858-large_default/amber-golden-touch-wine-glass-pasabahce-295ml.jpg' },
    { id: 2, title: 'Product 2', image: 'https://pentrubar.ro/5858-large_default/amber-golden-touch-wine-glass-pasabahce-295ml.jpg' },
    { id: 3, title: 'Product 3', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 4, title: 'Product 4', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 5, title: 'Product 5', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 6, title: 'Product 6', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 7, title: 'Product 7', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
];

const GlassesMain = () => {

  return (
    <div>
    <NavBar/>
    <GlassesImage products={products} />
    </div>
  );
}
export default GlassesMain;