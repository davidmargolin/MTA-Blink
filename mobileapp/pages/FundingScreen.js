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
      fund_amount: 10,
      time_amount: "Weekly"
    }
  }

  dismissEvent = event => {
    event.preventDefault();
    if(this.state.fund_amount.length < 1){
      this.setState({fund_amount: 0})
    }
    Keyboard.dismiss();
  }

  selectFundAmount=(amt)=>{
    this.setState({fund_amount: amt})
  }

  selectTimeAmount=(time)=>{
    let funding = 0
    if (time == "WeeklyEXP"){
      funding = 59.50
    }else if(time == "Monthly"){
      funding = 121.00
    }else if(time == "Weekly"){
      funding = 32.00
    }
    this.setState({time_amount: time, fund_amount: funding})
  }


  switchPaymentType=(type)=>{
    this.setState({payment_type: type})
  }

  render() {
    console.log("the amount is "+this.state.fund_amount)
    return (
      <View style={styles.container}>
        <Header withBackButton/>
        <View style={{flexDirection: 'row', height: 60 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'white'}}>
                Add Value $
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: '#eaeadc', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: '#3d3d3d'}}>
                Add Time {' '}
              </Text>
              <Icon name='schedule' color= 'black' />
            </View>
          </TouchableOpacity>
        </View>

        {this.state.payment_type == "Time" ?

        <View>
          <View style={{height: 80, backgroundColor: '#eaeadc', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 24, color: '#3d3d3d'}}>
              Select Time:
            </Text>
          </View>
          <View style={{height: 240 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Weekly" ? '#2352a3' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Weekly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20, color: this.state.time_amount=="Weekly"?'white':'#8e8e8e'}}>
              Weekly $32.00
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="WeeklyEXP" ? '#2352a3' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("WeeklyEXP")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20, color: this.state.time_amount=="WeeklyEXP"?'white':'#8e8e8e'}}>
              Weekly Express $59.50
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Monthly" ? '#2352a3' : '#eaeadc', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Monthly")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20, color: this.state.time_amount=="Monthly"?'white':'#8e8e8e'}}>
              Monthly $121.00
              </Text>
            </TouchableOpacity>

          </View>
          <Text style={{backgroundColor:'#eaeadc'}}>
            {"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}
          </Text>
        </View>

        :

        <View>
          <View style={{height: 60, backgroundColor: '#3d3d3d', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: '900', fontSize: 24, color: 'white'}}>
              Enter Amount:
            </Text>
          </View>
          <View style={{height: 120, width: '100%', backgroundColor: '#3d3d3d', flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{flex: 1, marginTop: 10, fontSize: 100, backgroundColor:'#3d3d3d', color: 'white', fontWeight: '600'}}>  $ </Text>
            <TextInput style={{marginTop: 20, marginLeft: 40, flex: 2, fontWeight: '600', color: 'white', fontSize: 100, textAlign: 'center'}}
                       keyboardType="phone-pad"
                       onChangeText={(fund_amount) => this.setState({fund_amount})}
                       value={this.state.fund_amount.toString()}
                       maxLength={3}/>
          </View>
          <View style={{height: 260, backgroundColor: '#3d3d3d', width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#3d3d3d', justifyContent: 'center'}} onPress={(event) => this.dismissEvent(event)}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20, color: '#8e8e8e'}}>
                Enter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="10" ? '#2352a3' : '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("10")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20, color: this.state.fund_amount=="10"?'white':'#8e8e8e'}}>
                $10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="20" ? '#2352a3' : '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("20")}>
              <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20, color: this.state.fund_amount=="25"?'white':'#8e8e8e'}}>
                $20
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="40" ? '#2352a3' : '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("40")}>
              <Text style={{textAlign: 'center',fontWeight: "bold", fontSize: 20, color: this.state.fund_amount=="50"?'white':'#8e8e8e'}}>
                $40
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{backgroundColor:'#3d3d3d'}}>
            {"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}
          </Text>
        </View>

        }

        <View style={{position: 'absolute', bottom: 0, height: 80, width: "100%", backgroundColor: '#73605b', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreditCardInput', {balance: this.props.navigation.state.params.balance, payment_type: this.state.payment_type, fund_amount: this.state.fund_amount, time_amount: this.state.time_amount, goBack: () => {
            this.props.navigation.goBack()
          }})}>
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
