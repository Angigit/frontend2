import React from 'react';
import { render } from 'react-dom'; //a böngésző miatt kell, mert böngészőn belül futtatjuk
import App from './App'; //ez már a mi komponensünk


render(<App />, document.getElementById('app'));
