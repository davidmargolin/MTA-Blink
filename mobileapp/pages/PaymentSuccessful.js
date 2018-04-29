import React, { Component } from 'react';
import { StyleSheet, Text, Image, Keyboard, View, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import Header from '../components/Header'

export default class PaymentSuccessful extends Component {
  componentDidMount(){
    setTimeout(this.endscreen,2000)
  }

  endscreen=()=>{
    this.props.navigation.state.params.goBack()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
                resizeMode="contain"
                style={{width: '100%', height: 300}}
                source={require('../images/payment-succeed.png')}
              />
            <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#0ad12b,', textAlign: 'center'}}>
              Payment Succesful {"\n"} Thank you for choosing MTA!
            </Text>
          </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
