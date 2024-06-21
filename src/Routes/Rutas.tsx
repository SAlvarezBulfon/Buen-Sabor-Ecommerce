import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/ui/common/NavBar/NavBar';
import useCartLogic from '../utils/cartLogic';
import CartComponent from '../components/ui/common/Cart/CartComponent';
import ProductosPage from '../components/screens/Products/ProductsPage';

import Main from '../components/screens/Landing/Main';
import IProducto from '../types/IProducto';
import IPromocion from '../types/IPromocion';
import { RootState } from '../redux/store/store';
import PromocionesPage from '../components/Promocion/Promocion';

const Rutas: React.FC = () => {
  const productos = useSelector((state: RootState) => state.productos.data);
  const { cart, addToCart, removeFromCart, clearCart } = useCartLogic();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <Navbar cart={cart} onCartClick={() => setIsCartOpen(true)} />
      <CartComponent
        cart={cart}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onAddToCart={(productId) => addToCart(productId, productos)}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />

      <Routes>
        <Route
          path="/productos"
          element={
            <ProductosPage
              addToCart={(productId: number, products: IProducto[]) => addToCart(productId, products)}
            />
          }
        />
        <Route
          path="/promociones"
          element={
            <PromocionesPage
              addToCart={(promocionId: number, promociones: IPromocion[]) => addToCart(promocionId, promociones)}
            />
          }
        />
        <Route path="/" element={<Main  addToCart={(productId: number, products: IProducto[]) => addToCart(productId, products)}/>} />
      </Routes>
    </div>
  );
};

export default Rutas;
