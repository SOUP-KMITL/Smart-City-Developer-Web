import React from 'react';
import ReactDOM from 'react-dom';
import Product from './product.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Product />, div);
});

