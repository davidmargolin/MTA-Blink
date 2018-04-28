import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";


export default class LoginScreen extends Component {
      state = {
        email: '',
        password: ''
     }
     handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
     login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
     }

  componentDidMount() {
  }

  render() {
    return (

      <View style = {styles.container}>
            <Image
                resizeMode="contain"
                style={{width: null, height: 300}}
                source={require('../images/mta-logo.png')}
              />
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#605b6d"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#605b6d"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#c5c8cc',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#2352a3',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      textAlign: 'center',
      color: 'white'
   }
});
