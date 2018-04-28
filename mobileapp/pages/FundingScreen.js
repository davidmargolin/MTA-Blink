import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Button} from 'react-native';
import * as firebase from "firebase";

export default class FundingScreen extends Component {

  constructor(props){
    super(props)
    this.state={
      payment_type: 'Value',
      fund_amount: "10",
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
        <View style={{height: 80, backgroundColor: 'brown'}}>
            <Text style={{paddingTop: 25, margin: 8, color: 'white', fontSize: 25}}>MTA Scanner</Text>
        </View>
        <View style={{flexDirection: 'row', height: 60 , width: '100%'}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Value"?'#5191f7':'#b1c1db', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
            <Text style={{textAlign: 'center', fontSize: 16, color: this.state.payment_type=="Value"?'white':'black'}}>
              Add Value $
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, backgroundColor: this.state.payment_type=="Time"?'#5191f7':'#b1c1db', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
            <Text style={{textAlign: 'center', fontSize: 16, color: this.state.payment_type=="Time"?'white':'black'}}>
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
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Weekly" ? '#5191f7' : '#b1c1db', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Weekly")}>
              <Text style={{textAlign: 'center', fontSize: 16, color: this.state.time_amount=="Weekly"?'white':'black'}}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Monthly" ? '#5191f7' : '#b1c1db', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Monthly")}>
              <Text style={{textAlign: 'center', fontSize: 16, color: this.state.time_amount=="Monthly"?'white':'black'}}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.time_amount=="Yearly" ? '#5191f7' : '#b1c1db', justifyContent: 'center'}} onPress={()=>this.selectTimeAmount("Yearly")}>
              <Text style={{textAlign: 'center', fontSize: 16, color: this.state.time_amount=="Yearly"?'white':'black'}}>
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
          <View style={{height: 300 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="10" ? '#5191f7' : '#b1c1db', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("10")}>
              <Text style={{textAlign: 'center', fontSize: 16, color: this.state.fund_amount=="10"?'white':'black'}}>
                $10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="25" ? '#5191f7' : '#b1c1db', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("25")}>
              <Text style={{textAlign: 'center', fontSize: 16, color: this.state.fund_amount=="25"?'white':'black'}}>
                $25
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: this.state.fund_amount=="50" ? '#5191f7' : '#b1c1db', justifyContent: 'center'}} onPress={()=>this.selectFundAmount("50")}>
              <Text style={{textAlign: 'center', fontSize: 16, color: this.state.fund_amount=="50"?'white':'black'}}>
                $50
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#b1c1db', justifyContent: 'center'}}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(fund_amount) => this.setState({fund_amount})}
              value={this.state.fund_amount}
            />
            </TouchableOpacity>
          </View>
        </View>

        }

        <View style={{position: 'absolute', bottom: 0, height: 60, width: "100%", backgroundColor: 'green', justifyContent: 'center'}}>
          <TouchableOpacity>
            <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
              Next
            </Text>
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
