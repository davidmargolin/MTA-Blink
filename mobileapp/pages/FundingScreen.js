import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";
export default class FundingScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      payment_type: 'Time',
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 80, backgroundColor: 'brown'}}>
            <Text style={{paddingTop: 25, margin: 8, color: 'white', fontSize: 25}}>MTA Scanner</Text>
        </View>

        <View style={{flexDirection: 'row', height: 80 , width: '100%'}}>
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

    <TouchableOpacity style={{backgroundColor: '#3ede5b', padding: 8}} onPress={()=>this.props.navigation.navigate('FundingScreen')}>
      <Text style={{color: 'white', padding: 8}}>Add Funds</Text>
    </TouchableOpacity>
    </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
