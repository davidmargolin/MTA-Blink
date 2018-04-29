import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Button, Keyboard } from 'react-native';
import * as firebase from "firebase";
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'

class FundingScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      payment_type: 'Value',
      fund_amount: "10",
      time_amount: "Weekly"
    }
  }

  dismissEvent = event => {
    event.preventDefault();
    if(this.state.fund_amount.length < 1){
      this.setState({fund_amount: "0"})
    }
    Keyboard.dismiss();
  }

  selectFundAmount=(amt)=>{
    this.setState({fund_amount: amt})
  }

  selectTimeAmount=(time)=>{
    this.setState({time_amount: time})
  }


  switchPaymentType=(type)=>{
    this.setState({payment_type: type})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header withBackButton/>
        <View style={{flexDirection: 'row', height: 60 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Value"?'#5d535e':'#eaeadc', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.payment_type=="Value"?'white':'black'}}>
                Add Value $
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Time"?'#5d535e':'#eaeadc', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.payment_type=="Time"?'white':'black'}}>
                Add Time
              </Text>
              <Icon name='schedule' color='black' />
            </View>
          </TouchableOpacity>
        </View>

        {this.state.payment_type == "Time" ?

        <View>
          <View style={{height: 80, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 24, color: 'gray'}}>
              Select Time:
            </Text>
          </View>
          <View style={{height: 240 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Weekly" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Weekly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.time_amount=="Weekly"?'white':'black'}}>
                Weekly $32
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="WeeklyEXP" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("WeeklyEXP")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.time_amount=="WeeklyEXP"?'white':'black'}}>
                Weekly Express $59.50
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Monthly" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Monthly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.time_amount=="Monthly"?'white':'black'}}>
                Monthly $121
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        :

        <View>
          <View style={{height: 60, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 24, color: 'gray'}}>
              Enter Amount:
            </Text>
          </View>
          <View style={{height: 140, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{flex: 1, fontSize: 100, color: 'gray', fontWeight: '600'}}>  $ </Text>
            <TextInput style={{marginLeft: 40, flex: 2, fontWeight: '600', color: 'gray', fontSize: 100, textAlign: 'center'}}
                       keyboardType="phone-pad"
                       onChangeText={(fund_amount) => this.setState({fund_amount})}
                       value={(this.state.fund_amount)}
                       maxLength={3}/>
          </View>
          <View style={{height: 267, width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#eaeadc', justifyContent: 'center'}} onPress={(event) => this.dismissEvent(event)}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: 'black'}}>
                Enter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="10" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("10")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.fund_amount=="10"?'white':'black'}}>
                $10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="20" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("20")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.fund_amount=="25"?'white':'black'}}>
                $20
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="40" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("40")}>
              <Text style={{textAlign: 'center',fontWeight: "bold", fontSize: 16, color: this.state.fund_amount=="50"?'white':'black'}}>
                $40
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        }

        <View style={{position: 'absolute', bottom: 0, height: 60, width: "100%", backgroundColor: '#e09216', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreditCardInput', {balance: this.props.navigation.state.params.balance, payment_type: this.state.payment_type, fund_amount: this.state.fund_amount, time_amount: this.state.time_amount})}>
            <Text style={{color: 'white', fontWeight: "bold", fontSize: 30, padding: 8, textAlign: 'center'}}>
              Purchase
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(FundingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
