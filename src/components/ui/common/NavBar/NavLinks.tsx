import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC = () => {
  return (
    <nav style={{ display: 'flex', gap: '16px' }}>
      <CustomLink to="/">Inicio</CustomLink>
      <CustomLink to="/productos">Productos</CustomLink>
      <CustomLink to="/promociones">Promociones</CustomLink>
    </nav>
  );
};

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  );
};

export default NavLinks;
