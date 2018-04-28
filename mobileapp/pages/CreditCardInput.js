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
  }

  _onChange = (formData) => {}

  //console.log(JSON.stringify(formData, null, " "));

  addBalance(uid) {
    var balanceRef = firebase.database().ref('users/' + uid + "/balance");
    console.log(this.props.navigation.state.params.fund_amount)
    balanceRef.set(parseInt(this.props.navigation.state.params.balance) + parseInt(this.props.navigation.state.params.fund_amount))
  }

  addTime(uid){
    var time = this.props.navigation.state.params.time_amount
    var timeRef = firebase.database().ref('users/' + uid + "/time");
    timeRef.set(time);
    var expirationRef = firebase.database().ref('users/' + uid + "/expiration");
    if(time == "Weekly"){
      var today = new Date();
      var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
      expirationRef.set(nextWeek.toLocaleDateString())
    }
    else if(time == "Monthly"){
      var today = new Date();
      var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+30);
      expirationRef.set(nextWeek.toLocaleDateString())
    }
  }

  purchase() {
    var uid = firebase.auth().currentUser.uid;
    if(this.props.navigation.state.params.payment_type == 'Value'){
      this.addBalance(uid);
    }
    else{
      this.addTime(uid);
    }
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

        <View style={{marginTop: 25, height: 60, width: "100%", backgroundColor: '#3cba54', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>this.purchase()}>
            <Text style={{color: 'white', fontWeight: "bold", fontSize: 30, padding: 8, textAlign: 'center'}}>
              Finish Transaction
            </Text>
          </TouchableOpacity>
        </View>
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
