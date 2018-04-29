import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, Button, StatusBar} from 'react-native';
import * as firebase from "firebase";
import {Constants} from 'expo'
import Header from '../components/Header'
import {withNavigation} from 'react-navigation'
import { CreditCardInput as CreditCardWidget} from "react-native-credit-card-input";
var stripe = require('stripe-client')('pk_test_Eslvav5ELSvHrXpJ2GZmqE1q');

class CreditCardInput extends Component {

  constructor(props){
    super(props)
    this.state={
      errorText: ""
    }
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
            amount: this.props.navigation.state.params.fund_amount*100,
            stripeToken: card.id ,
          }),
        }).then((response) => {
          response.json().then(response=>{
            if (response.status=="succeeded"){
              if(this.props.navigation.state.params.payment_type == 'Value'){
                this.addBalance(uid);
              }
              else{
                this.addTime(uid);
              }
              this.props.navigation.navigate('PaymentSuccessful', {goBack: () => {
                this.props.navigation.state.params.goBack()
                this.props.navigation.goBack()
              }})
            }else{
              this.setState({errorText: "There was an error with your transaction. Please confirm your details and please try again."})
            }
          }).catch((error)=>{
              this.setState({errorText: "There was an error with your transaction. Please confirm your details and please try again."})
          })
        })
      });
    }else{
      this.setState({errorText: "Your credit card information is incomplete or malformed."})
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
      />
        <Header withBackButton/>
        <CreditCardWidget
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
            <Text style={{textAlign:'center', margin: 4, color: 'red'}}>{this.state.errorText}</Text>
        <View style={{marginTop: 25, height: 60, width: "100%", backgroundColor: '#3cba54', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>this.purchase()}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30, padding: 8, textAlign: 'center'}}>
              Finish Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(CreditCardInput);

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
