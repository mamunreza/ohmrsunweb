// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Header;
