import React from 'react';
import ReactDOM from 'react-dom';
// import "@babel/polyfill";
import 'normalize.css';
import './styles/style.scss';
import App from './components/App';

/* Random Background Theme */
setRandomBackground();

ReactDOM.render(<App />, document.getElementById('app'));


function setRandomBackground() {
	const themes = [
		'theme-blue',
		'theme-orange',
		'theme-red',
		'theme-purple',
		'theme-purple-dark'
	];

	const rand = Math.floor(Math.random() * themes.length);
	document.body.className += themes[rand];
}