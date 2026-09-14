import {AppRegistry} from 'react-native';

// 1. Nạp lõi Firebase ngay từ đầu (TRƯỚC KHI IMPORT APP)
import '@react-native-firebase/app'; 

// 2. Sau đó mới nạp App và các thư viện khác
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player'; 

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));