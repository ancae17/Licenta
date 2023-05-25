import * as React from 'react';
import NavBar from '../NavBar';
import TshirtsImage from './TshirtsImage';

const products = [
    { id: 1, title: 'Product 1', image: 'https://zajo.bwcdn.net/media/2022/06/1/5/sk-leon-t-shirt-ss-15869-size-large-v-2.jpg' },
    { id: 2, title: 'Product 2', image: 'https://zajo.bwcdn.net/media/2022/06/1/5/sk-leon-t-shirt-ss-15869-size-large-v-2.jpg' },
    { id: 3, title: 'Product 3', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 4, title: 'Product 4', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 5, title: 'Product 5', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 6, title: 'Product 6', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 7, title: 'Product 7', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
];

const TshirtsMain = () => {

  return (
    <div>
    <NavBar/>
    <TshirtsImage products={products} />
    </div>
  );
}
export default TshirtsMain;
