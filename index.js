/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { name as appName } from './app.json';
import App from './src/App';

function Root() {
    return <App hideSplashScreen={() => RNBootSplash.hide({ fade: true })} />;
}

AppRegistry.registerComponent(appName, () => Root);
export default Root;
