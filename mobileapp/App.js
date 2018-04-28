import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";

export default class App extends Component {

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyByWpAy1yK5XrD5ENlXEIIsC5VxQOxLY7A",
      authDomain: "mta-scanner.firebaseapp.com",
      databaseURL: "https://mta-scanner.firebaseio.com",
      projectId: "mta-scanner",
      storageBucket: "mta-scanner.appspot.com",
      messagingSenderId: "1081675998683"
    };
    firebase.initializeApp(config);
  }

  render() {

    console.log("test")

    return (
      <View style={styles.container}>
        <Text>TestTest</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
