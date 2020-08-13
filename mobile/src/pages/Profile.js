import React from 'react';
import { WebView } from 'react-native-webview';


export default function Profile({route}) {
    const {github_username} = route.params;

    console.log(github_username);

    return (
      <WebView 
          style={{ flex: 1 }} 
          source={{ uri: `https://github.com/${github_username}` }}
        >
      </WebView>
    );
}