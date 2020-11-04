import React, { useRef, useEffect } from 'react'
import { BackHandler, Text, ToastAndroid } from 'react-native'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'

const App = () => {

  const webviewRef = useRef(null)
  const canGoBack = useRef(false)

  const backAction = () => {
    if (canGoBack.current) {
      webviewRef.current.goBack()
      return true
    }
  }

  const handleNavigationStateChange = (navState) => {
    canGoBack.current = navState.canGoBack
  }

  const handleMessage = ({ nativeEvent: state }) => {
    if (state.data === "navigationStateChange") {
      canGoBack.current = state.canGoBack
    }
  }

  const injectedJavaScript = `
          (function() {
            function wrap(fn) {
              return function wrapper() {
                var res = fn.apply(this, arguments);
                window.ReactNativeWebView.postMessage('navigationStateChange');
                return res;
              }
            }

            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function() {
              window.ReactNativeWebView.postMessage('navigationStateChange');
            });
          })();

          true;
        `

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    )

    return () => backHandler.remove()
  }, [])

  return (
    <WebView
      source={{ uri: 'https://scholtus.olistshops.com/' }}
      style={{ marginTop: Constants.statusBarHeight }}
      ref={webviewRef}
      onNavigationStateChange={handleNavigationStateChange}
      injectedJavaScript={injectedJavaScript}
      onMessage={handleMessage}
    />
  )
}

export default App
