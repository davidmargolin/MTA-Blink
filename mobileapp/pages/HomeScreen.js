import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";
import QRCode from 'react-native-qrcode';
import {withNavigation} from 'react-navigation'

class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.state={
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
    this.setState({qrcode_value: this.state.payment_type + firebase.auth().currentUser.uid + time})
  }

  componentDidMount() {
     setInterval(()=>this.generateQRCode(), 5000);
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.payment_type == "Time" ? "#FCCC0A" : '#00A1DE'}]}>
        <View style={{height: 80, backgroundColor: 'brown'}}>
          <Text style={{paddingTop: 25, margin: 8, color: 'white', fontSize: 25}}>MTA Scanner</Text>
        </View>
        <View style={{flexDirection: 'row', height: 60 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: '#00A1DE', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
            <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 24, color: 'black'}}>
              Value $
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: "#FCCC0A", justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 24, color: 'black'}}>
              Time
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: "bold", margin: 16}}>{this.state.payment_type=="Time"?"Monthly (Expires 12/7/2018)":"Balance: $25.00"}</Text>
          <QRCode
            value={this.state.qrcode_value}
            size={225}
            bgColor='black'
            fgColor='white'/>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: "bold", margin: 20, width: 350}}>To use, hold the code a few inches from the scanner.</Text>
          <TouchableOpacity style={{backgroundColor: 'brown', width: 300, padding: 8}} onPress={()=>this.props.navigation.navigate('FundingScreen')}>
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
