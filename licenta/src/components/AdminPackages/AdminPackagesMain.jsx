import * as React from 'react';
import AdminNavBar from '../AdminNavBar';
import AdminPackagesImage from './AdminPackagesImage';

const products = [
    { id: 1, title: 'Product 1', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 2, title: 'Product 2', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 3, title: 'Product 3', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 4, title: 'Product 4', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 5, title: 'Product 5', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 6, title: 'Product 6', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
    { id: 7, title: 'Product 7', image: 'https://bluebarrows.in/wp-content/uploads/2020/10/IMG20200520231727-scaled-1-1.jpg' },
];

const AdminPackagesMain = () => {

  return (
    <div>
    <AdminNavBar/>
    <AdminPackagesImage products={products} />
    </div>
  );
}
export default AdminPackagesMain;