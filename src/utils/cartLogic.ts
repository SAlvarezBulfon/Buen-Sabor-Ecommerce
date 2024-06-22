import { useState, useEffect } from 'react';

// Hook personalizado para la lógica del carrito de compras

const useCartLogic = () => {
   // Estado para almacenar el carrito de compras, inicializado con el contenido del localStorage o un array vacío si no hay datos guardados
  const [cart, setCart] = useState<any[]>(
    () => JSON.parse(localStorage.getItem('cart') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para añadir un producto al carrito
  const addToCart = (productId: number, products: any[]) => {
       // Buscar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    if (existingProductIndex !== -1) {
       // Si existe, actualizar la cantidad del producto
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Si no existe, añadir el producto al carrito con cantidad inicial 1
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

   // Función para remover un producto del carrito
  const removeFromCart = (productId: number) => {
     // Buscar el índice del producto en el carrito
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    if (existingProductIndex !== -1) {
       // Si existe, crear una copia del carrito actual
      const updatedCart = [...cart];
       // Decrementar la cantidad del producto
      updatedCart[existingProductIndex].quantity -= 1;
      // Si la cantidad llega a cero, eliminar el producto del carrito
      if (updatedCart[existingProductIndex].quantity === 0) {
        updatedCart.splice(existingProductIndex, 1);
      }
      setCart(updatedCart);
    }
  };
// Función para limpiar completamente el carrito
  const clearCart = () => {
    setCart([]);
  };

  return { cart, addToCart, removeFromCart, clearCart };
};

export default useCartLogic;
