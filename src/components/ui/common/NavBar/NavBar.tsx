import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import CartProduct from '../../../../types/CartProduct';
import NavLinks from './NavLinks';

interface NavbarProps {
  cart: CartProduct[];
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, onCartClick }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleCartClick = () => {
    onCartClick();
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/productos">
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem button component={Link} to="/promociones">
          <ListItemText primary="Promociones" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FastfoodIcon />
            <Typography variant="h6">Buen Sabor</Typography>
          </Link>
        </Box>
        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinks />
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
