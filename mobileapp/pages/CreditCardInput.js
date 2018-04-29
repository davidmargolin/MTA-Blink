import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Image, Button} from 'react-native';
import * as firebase from "firebase";
import {Constants} from 'expo'
import Header from '../components/Header'
import {withNavigation} from 'react-navigation'
import { CreditCardInput } from "react-native-credit-card-input";
var stripe = require('stripe-client')('pk_test_Eslvav5ELSvHrXpJ2GZmqE1q');

class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.formData = {}
  }

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
    else if(time == "Yearly"){
      var today = new Date();
      var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+365);
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
    if (this.formData.valid){
      stripe.createToken({
        card: {
          number: this.formData.values.number,
          exp_month: this.formData.values.expiry.split("/")[0],
          exp_year: this.formData.values.expiry.split("/")[1],
          cvc: this.formData.values.cvc,
          name: this.formData.values.name
        }
      }).then((card)=>{
        fetch('https://us-central1-mta-scanner.cloudfunctions.net/helloWorld', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 2000,
            stripeToken: card.id ,
          }),
        }).then((response) => {
          response.json().then(response=>{
            if (response.status=="succeeded"){
              //go to the next page
            }
          })
        })
      });
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
              validatePostalCode={()=>("valid")}
              labelStyle={{color: 'black', fontSize: 12}}
              inputStyle={{fontSize: 16, color: 'black'}}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onChange={(formData)=>this.formData=formData} />

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
