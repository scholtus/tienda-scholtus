import React, { useRef, useEffect } from 'react'
import { BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'

const App = () => {

  const webviewRef = useRef(null)

  useEffect(() => {
    const backAction = () => {
      if (this.canGoBack) {
        this.webviewRef.goBack()
        return true
      }
    }

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
      ref={this.webviewRef}
      onNavigationStateChange={(navState) => {
        this.canGoBack = navState.canGoBack
      }}
    />
  )
}

export default App
