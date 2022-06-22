import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import App from './entry-app';

const renderRoot = (Component: any) => { 
    ReactDOM.render(
        <Component />
        ,document.getElementById('root')
    )
}

renderRoot(App);

// if (module.hot) {
//     console.log('wenai-module.hot')
//     module.hot.accept('./app.tsx', () => { 
//         console.log('wenai-cb')
//         renderRoot(App)
//     })
// }