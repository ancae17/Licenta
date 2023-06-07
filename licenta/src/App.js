import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import TshirtsMain from './components/Tshirts/TshitsMain'
import PackagesMain from './components/Packagess/PackagesMain';
import GlassesMain from './components/Glasses/GlassesMain';
import BottlesMain from './components/Bottles/BottlesMain';
import AdminBottlesMain from './components/AdminBottles/AdminBottlesMain';
import CartPage from './components/ShoppingCart/CartPage';
import AddBottle from './components/AdminBottles/AddBottle';
import AdminGlassesMain from './components/AdminGlasses/AdminGlassesMain';
import AdminPackagesMain from './components/AdminPackages/AdminPackagesMain';
import AdminTshirtsMain from './components/AdminTshirts/AdminTshirtsMain';
import AddTshirt from './components/AdminTshirts/AddTshirt';
import AddGlass from './components/AdminGlasses/AddGlass';
import AddPackage from './components/AdminPackages/AddPackage';
import GlassesPage from "./components/Glasses/GlassesPage";
import PackagesPage from "./components/Packagess/PackagesPage";
import TshirtsPage from "./components/Tshirts/TshirtsPage";
import BottlesPage from './components/Bottles/BottlesPage';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<BottlesMain />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tshirtsmain' element={<TshirtsMain />} />
          <Route path='/packagesmain' element={<PackagesMain />} />
          <Route path='/glassesmain' element={<GlassesMain />} />
          <Route path='/bottlesmain' element={<BottlesMain />} />
          <Route path='/bottlespage' element={<BottlesPage />} />
          <Route path='/glassespage' element={<GlassesPage />} />
          <Route path='/tshirtspage' element={<TshirtsPage />} />
          <Route path='/packagespage' element={<PackagesPage />} />
          <Route path='/cartpage' element={<CartPage />} />
          <Route path='/addbottle' element={<AddBottle />} />
          <Route path='/adminbottlesmain' element={<AdminBottlesMain />} />
          <Route path='/adminglassesmain' element={<AdminGlassesMain />} />
          <Route path='/adminpackagesmain' element={<AdminPackagesMain />} />
          <Route path='/admintshirtsmain' element={<AdminTshirtsMain />} />
          <Route path='/addtshirt' element={<AddTshirt />} />
          <Route path='/addglass' element={<AddGlass />} />
          <Route path='/addpackage' element={<AddPackage />} />
          

          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}


export default App;
