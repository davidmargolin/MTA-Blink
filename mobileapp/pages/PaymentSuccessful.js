import React, { Component } from 'react';
import { StyleSheet, Text, Image, Keyboard, View, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import Header from '../components/Header'
import {withNavigation} from 'react-navigation'


class PaymentSuccessful extends Component {




  render() {
    return (
      <View style={styles.container}>

          <View style={{alignItems: 'center'}}>
                <Image
                    resizeMode="contain"
                    style={{width: '100%', height: 300}}
                    source={require('../images/payment-succeed.png')}
                  />
                <Text style={{margin: 20, fontSize: 20, fontweight: 'bold', color: '#0ad12b,', textAlign: 'center'}}>
                  Payment Succesful {"\n"} Thank you for choosing MTA!
                </Text>

          </View>


         <View style={{position: 'absolute', bottom: 0, height: 60, width: "100%", backgroundColor: '#e09216', justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('HomeScreen')}>
                  <Text style={{color: 'white', fontWeight: "bold", fontSize: 30, padding: 8, textAlign: 'center'}}>
                      Go Back
                  </Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }
}

export default withNavigation(PaymentSuccessful);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
