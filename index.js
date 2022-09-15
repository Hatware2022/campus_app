import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as StoreProvider } from "react-redux";
import store from "./src/store/store";


export default function Main() {
    return (
        <StoreProvider store={store}>
            <App />
        </StoreProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
