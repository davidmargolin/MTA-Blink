import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Button, Keyboard } from 'react-native';
import * as firebase from "firebase";
import {withNavigation} from 'react-navigation'
import Header from '../components/Header'

class FundingScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      payment_type: 'Value',
      fund_amount: 10,
      time_amount: "Weekly"
    }
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
            <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.payment_type=="Value"?'white':'black'}}>
              Add Value $
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Time"?'#5d535e':'#eaeadc', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.payment_type=="Time"?'white':'black'}}>
              Add Time
            </Text>
          </TouchableOpacity>
        </View>

        {this.state.payment_type == "Time" ?

        <View>
          <View style={{height: 60, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
              Select Time:
            </Text>
          </View>
          <View style={{height: 240 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Weekly" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Weekly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.time_amount=="Weekly"?'white':'black'}}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Monthly" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Monthly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.time_amount=="Monthly"?'white':'black'}}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Yearly" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Yearly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.time_amount=="Yearly"?'white':'black'}}>
                Yearly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        :

        <View>
          <View style={{height: 60, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
              Select Amount:
            </Text>
          </View>
          <View style={{height: 240 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="10" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("10")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.fund_amount==10?'white':'black'}}>
                $10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="25" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("25")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 16, color: this.state.fund_amount==25?'white':'black'}}>
                $25
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="50" ? '#73605b' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("50")}>
              <Text style={{textAlign: 'center',fontWeight: "bold", fontSize: 16, color: this.state.fund_amount==50?'white':'black'}}>
                $50
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#eaeadc', justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <TextInput
                  style={{marginLeft: 50, flex: 1, fontWeight: "bold", fontSize: 16, textAlign: 'center'}}
                  onChangeText={(fund_amount) => this.setState({fund_amount: parseInt(fund_amount)})}
                  value={this.state.fund_amount.toString()}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={{flex: -1, height: '100%', width: 50, justifyContent: 'center'}} onPress={Keyboard.dismiss}>
                  <Text style={{fontSize: 18, fontWeight: '600'}}>Enter</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        }

        <View style={{position: 'absolute', bottom: 0, height: 60, width: "100%", backgroundColor: '#e09216', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreditCardInput', {balance: this.props.navigation.state.params.balance, fund_amount: this.state.fund_amount, payment_type: this.state.payment_type, time_amount: this.state.time_amount})}>
            <Text style={{color: 'white', fontWeight: "bold", fontSize: 30, padding: 8, textAlign: 'center'}}>
              Next
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
