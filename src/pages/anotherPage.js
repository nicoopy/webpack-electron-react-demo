import React from 'react';
import { render } from 'react-dom';
import AnotherPage from '../components/AnotherPage';

const pageWrap = document.createElement('div');
pageWrap.className = 'page-wrap';
document.body.appendChild(pageWrap);

render(<AnotherPage />, pageWrap);
