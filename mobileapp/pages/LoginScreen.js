import React, { Component } from 'react';
<<<<<<< HEAD
import { StyleSheet, Text, Image, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
=======
import { StyleSheet, Text, Image, Keyboard, View, TextInput,KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
>>>>>>> 95558687d4ff6f65f4536b3a4c5bfb170c152818
import * as firebase from "firebase";


export default class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      errorCode: ''
    }
  }

  _registerUser(){
     let replaced = this.name.split(' ').join('');
     if (replaced!=""){
       firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(() => {
         this.props.updateName(this.name)
         console.log("Created New User")
       }).catch(error => {
         this.setState({errorCode: error.message})
       });
     }else{
       this.setState({errorCode: "Name cannot be empty."})
     }
 }

   login = (email, pass) => {
    this.setState({errorCode: ""})
     if (this.state.newUser){
      this._registerUser()
    }else{
     firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
       if (error.code == "auth/user-not-found"){
         console.log("User Doesn't Exist - Requesting Name")
         this.setState({newUser: true})
       }else{
         this.setState({errorCode: error.message})
       }
     });
   }
 }

  componentDidMount() {
  }

  render() {
    return (
<<<<<<< HEAD

      <View style = {styles.container}>
            <Image
                resizeMode="contain"
                style={{width: null, height: 300}}
                source={require('../images/mta-logo.png')}
              />
=======
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={180}>
            <Image
                resizeMode="contain"
                style={{width: '100%', height: 300}}
                source={require('../images/mta-logo.png')}
              />
            <Text style={{margin: 4, textAlign: 'center'}}>{this.state.errorCode}</Text>
          {this.state.newUser &&
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
                returnKeyType="next"
                onSubmitEditing={(event) => Keyboard.dismiss()}
               onChangeText = {(text)=>this.name=text}/>
          }
>>>>>>> 95558687d4ff6f65f4536b3a4c5bfb170c152818
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
                returnKeyType="next"
                 keyboardType='email-address'
               autoCapitalize = "none"
               onSubmitEditing={(event) => this.refs.PassInput.focus()}
               onChangeText = {(text)=>this.email=text}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
                ref = 'PassInput'
                returnKeyType="next"
               autoCapitalize = "none"
                onSubmitEditing={(event) => Keyboard.dismiss()}
               secureTextEntry
               onChangeText = {(text)=>this.password=text}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.email, this.password)
               }>
               <Text style = {styles.submitButtonText}> {this.state.newUser? "Register" : "Sign In / Register"} </Text>
            </TouchableOpacity>
<<<<<<< HEAD
         </View>
=======
         </KeyboardAvoidingView>
>>>>>>> 95558687d4ff6f65f4536b3a4c5bfb170c152818
    )
  }
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    flex:1,
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
=======
      alignItems: 'center',
      justifyContent: 'center',
      flex:1,
      padding: 40
   },
   input: {
      padding: 8,
      width: '100%',
      margin: 4,
>>>>>>> 95558687d4ff6f65f4536b3a4c5bfb170c152818
      borderColor: '#c5c8cc',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#2352a3',
      padding: 10,
      margin: 4,
      width: '100%'
   },
   submitButtonText:{
      textAlign: 'center',
      color: 'white'
   }
});
