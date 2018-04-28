import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Image, Button} from 'react-native';
import * as firebase from "firebase";
import {Constants} from 'expo'
import Header from '../components/Header'
import {withNavigation} from 'react-navigation'
import { CreditCardInput } from "react-native-credit-card-input";
class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      balance: ""
    }
  }

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));

  addBalance() {
    var balance = firebase.database().ref('users/' + userID + '/balance');
    balance.on('value', function(snapshot) {
      current.setState({balance: snapshot.val()});
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Header withBackButton/>
        <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              labelStyle={{color: 'black', fontSize: 12}}
              inputStyle={{fontSize: 16, color: 'black'}}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onChange={this._onChange} />
        <TouchableOpacity
           style = {styles.submitButton}
           onPress = {
              () => this.login(this.email, this.password)
           }>
           <Text style = {styles.submitButtonText}> {this.state.newUser? "Register" : "Sign In / Register"} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(HomeScreen);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: STATUSBAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'brown',
    marginBottom: 1,
  },
  back: {
    width: 24,
    height:24,
    margin: 16,
  },
});
