import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player'; // Thêm dòng này
import '@react-native-firebase/app';

AppRegistry.registerComponent(appName, () => App);

// Đăng ký dịch vụ chạy nhạc nền ngay sau khi khởi tạo App
TrackPlayer.registerPlaybackService(() => require('./service.js')); // Thêm dòng này