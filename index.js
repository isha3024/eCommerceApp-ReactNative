/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

const AppRedux = () => (
    <App />
)

AppRegistry.registerComponent(appName, () => AppRedux);
