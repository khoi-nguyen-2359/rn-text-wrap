import React from 'react'
import { Text as RNText, View, StyleSheet } from 'react-native'
import {TextWrap as Text} from 'rn-text-wrap'

export default class example extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text
          left={{
            icon: require('./ic_launcher.png'),
            onPress: ()=>console.log('on left press')
          }}
          onPress={()=>{console.log('on text press')}}
					style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
				<Text
					style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});