import React from 'react';
import { Button, Typography, ListItem, List, Drawer, ListItemText } from '@mui/material';
import CartProduct from '../../../../types/CartProduct';
import IProducto from '../../../../types/IProducto';


interface CartComponentProps {
  cart: CartProduct[];
  open: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, products: IProducto[]) => void;
  onRemoveFromCart: (productId: number) => void;
  onClearCart: () => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ cart, open, onClose, onAddToCart, onRemoveFromCart, onClearCart }) => {

  const total = cart.reduce((sum, product) => {
    const price = product.precioVenta ? product.precioVenta : product.precioPromocional;
    return sum + price * product.quantity;
  }, 0).toFixed(2);




  return (
    <>
    <Drawer anchor="right" open={open} onClose={onClose}>
        <List sx={{ width: 300 }}>
          <ListItem>
            <Typography variant="h6">Carrito de Compras</Typography>
          </ListItem>
          {cart.map((product) => (
            <ListItem key={product.id}>
              <ListItemText
                primary={product.denominacion}
                secondary={`$${product.precioVenta ? product.precioVenta : product.precioPromocional} x ${product.quantity}`}
              />
              <Button
                onClick={() => onAddToCart(product.id, cart)}
                size="small"
              >
                +
              </Button>
              <Button
                onClick={() => onRemoveFromCart(product.id)}
                size="small"
              >
                -
              </Button>
            </ListItem>
          ))}
          <ListItem>
            <Typography variant="body1">Total: ${total}</Typography>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              Realizar Pedido
            </Button>
          </ListItem>

          <ListItem>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={onClearCart}
            >
              Vaciar Carrito
            </Button>
          </ListItem>
        </List>
      </Drawer>
     </>
  );
};

export default CartComponent;