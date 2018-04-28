import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Container from '../components/Container';
// import Button from '../components/Button';
// import Label from '../components/Label';

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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style = {styles.container}>
              <Image resizeMode='contain' style= {{width: null, height:200,margin: 40}} source={require('../images/SEGA_logo.png')}/>
              <Text style = {styles.title} >Hackathon MTA app</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email:"
               placeholderTextColor = 'rgba(255,255,255,0.7)'
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password:"
               placeholderTextColor = 'rgba(255,255,255,0.7)'
               returnKeyType="go"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> LOGIN </Text>
            </TouchableOpacity>
         </View>
         </KeyboardAvoidingView>
    );
  }
}
// export default LoginScreen
 // AppRegistry.registerComponent('AwesomeProject', () => LoginScreen);

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 23,
      backgroundColor: '#3498db'
   },
    logoContainer: {
      paddingTop: 40,
      height: 10,
      width: 10
   },
   input: {
      padding: 20,
      margin: 20,
      height: 40,
      borderColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1,
      color: '#FFF'
   },
   submitButton: {
      backgroundColor: '#2980b9',
      margin: 20,
      height: 50
   },
   submitButtonText:{
      color: 'white',
      textAlign: 'center',
      fontWeight: '700'

   },
   title: {
    textAlign: 'center',
    color:'white'
    }
});
