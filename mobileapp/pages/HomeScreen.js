import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";

export default class HomeScreen extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{height: 80, backgroundColor: 'red'}}>
            <Text style={{paddingTop: 25, margin: 8, color: 'white', fontSize: 25}}>MTA Scanner</Text>
        </View>
        <View>
          <Text style={{textAlign: 'center', margin: 8, fontSize: 18}}>David Margolin</Text>
        </View>
        <View style={{flexDirection: 'row', height: 40 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
              Value $
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>
              Time
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 16, margin: 8}}>$25.00</Text>
      <Image style={{width: 300, height: 300, marginHorizontal: 8}} resizeMode="contain" source={{uri: "https://www.qrstuff.com/images/default_qrcode.png"}}/>
    <Text style={{textAlign: 'center', margin: 8, width: 350}}>Instructions: Hold this a few inches from the scanner. Add funds by clicking the button below.</Text>
  <TouchableOpacity style={{backgroundColor: '#3ede5b', padding: 8}}>
    <Text style={{color: 'white', padding: 8}}>Add Funds</Text>

    </TouchableOpacity>
  </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
