import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => (
  <header className="py-4 bg-gray-900 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sao kê MTTQ</h1>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-400">Trang chủ</Link>
            <Link to="/statistical" className="hover:text-gray-400">Thống kê</Link>
          </div>
        </div>
      </header>
);