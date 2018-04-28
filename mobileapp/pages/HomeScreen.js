import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";
import QRCode from 'react-native-qrcode';
import {withNavigation} from 'react-navigation'
import Header from '../components/Header'
import { Icon } from 'react-native-elements'

class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      balance: 0,
      time: "",
      expiration: "",
      payment_type: 'Time',
    }
  }

  switchPaymentType=(type)=>{
      this.setState({payment_type: type})
      this.generateQRCode()
  }

  generateQRCode=()=>{
    var date = new Date();
    var time = date.getTime();
    this.setState({qrcode_value: this.state.payment_type.charAt(0) + firebase.auth().currentUser.uid + time})
  }

  componentDidMount() {
     setInterval(()=>this.generateQRCode(), 5000);
  }

  componentWillMount() {
    var current = this;
    var userID = firebase.auth().currentUser.uid;
    var balance = firebase.database().ref('users/' + userID + '/balance');
    balance.on('value', function(snapshot) {
      current.setState({balance: snapshot.val()});
    });
    var time = firebase.database().ref('users/' + userID + '/time');
    time.on('value', function(snapshot) {
      current.setState({time: snapshot.val()});
    });
    var expiration = firebase.database().ref('users/' + userID + '/expiration');
    expiration.on('value', function(snapshot) {
      current.setState({expiration: snapshot.val()});
    });
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.payment_type == "Time" ? "#ffd621" : '#eaeadc'}]}>
        <Header withLogOutButton='true'/>
        <View style={{flexDirection: 'row', marginTop: -1, height: 60 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: '#eaeadc', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'black'}}>
                Value
              </Text>
              <Icon name='credit' color='black' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: "#ffd621", justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'black'}}>
                Time
              </Text>
              <Icon name='schedule' color='black' />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 28, fontWeight: "600", margin: 16}}>{this.state.payment_type=="Time"? (this.state.time == "none" ? "No Time" : this.state.time + " expires " + this.state.expiration) :"Balance: $" + this.state.balance}</Text>
          <QRCode
            value={this.state.qrcode_value}
            size={225}
            bgColor='black'
            fgColor='white'/>
          <Text style={{textAlign: 'center', fontSize: 26, fontWeight: "bold", margin: 20, width: 350}}>Please hold this code a few inches from the scanner.</Text>
          <TouchableOpacity style={{backgroundColor: 'black', width: 300, marginTop: 10, padding: 8}} onPress={()=>this.props.navigation.navigate('FundingScreen', {balance: this.state.balance})}>
            <Text style={{color: 'white', fontWeight: "bold", fontSize: 30, padding: 8, textAlign: 'center'}}>Add Funds</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
