import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";
import QRCode from 'react-native-qrcode';
import {withNavigation} from 'react-navigation'
class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      payment_type: 'Time'
    }
  }

  switchPaymentType=(type)=>{
      this.setState({payment_type: type})
  }

  generateQRCode=()=>{
    var date = new Date();
    var time = date.getTime();
    this.setState({qrcode_value: this.state.payment_type + "02" + time})
  }

  componentDidMount() {
     setInterval(()=>this.generateQRCode(), 5000);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{height: 80, backgroundColor: 'brown'}}>
            <Text style={{paddingTop: 25, margin: 8, color: 'white', fontSize: 25}}>MTA Scanner</Text>
        </View>
        <View>
          <Text style={{textAlign: 'center', margin: 8, fontSize: 18}}>David Margolin</Text>
        </View>
        <View style={{flexDirection: 'row', height: 40 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Value"?'#5191f7':'#b1c1db', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
            <Text style={{textAlign: 'center', fontSize: 16, color: this.state.payment_type=="Value"?'white':'black'}}>
              Value $
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Time"?'#5191f7':'#b1c1db', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <Text style={{textAlign: 'center', fontSize: 16, color: this.state.payment_type=="Time"?'white':'black'}}>
              Time
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 16, margin: 8}}>{this.state.payment_type=="Time"?"Monthly (Expires 12/7/2018)":"$25.00"}</Text>
        <QRCode
          value={this.state.qrcode_value}
          size={300}
          bgColor='black'
          fgColor='white'/>
    <Text style={{textAlign: 'center', margin: 8, width: 350}}>Instructions: Hold this a few inches from the scanner. Add funds by clicking the button below.</Text>
  <TouchableOpacity style={{backgroundColor: '#3ede5b', padding: 8}} onPress={()=>this.props.navigation.navigate('FundingScreen')}>
      <Text style={{color: 'white', padding: 8}}>Add Funds</Text>
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
    backgroundColor: '#b1c1db',
  },
});
