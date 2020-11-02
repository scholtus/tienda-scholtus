import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default () => <WebView
  source={{ uri: 'https://scholtus.olistshops.com/' }}
  style={{ marginTop: Constants.statusBarHeight }}
/>

