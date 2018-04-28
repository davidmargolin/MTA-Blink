import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";
export default class FundingScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the funding screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
