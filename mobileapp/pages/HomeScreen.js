import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, StatusBar} from 'react-native';
import * as firebase from "firebase";
import QRCode from 'react-native-qrcode';
import {withNavigation} from 'react-navigation'
import Header from '../components/Header'
import { Icon } from 'react-native-elements'
import Drawer from 'react-native-drawer'
import DrawerContent from '../components/DrawerContent'

class HomeScreen extends Component {

  constructor(props){
   super(props)
   this.state={
     balance: 0,
     time: "",
     expiration: "",
     payment_type: 'Time',
   }
   this.qrreplacer = ""
 }

  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };

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
    this.qrreplacer = setInterval(()=>this.generateQRCode(), 5000);
    var userID = firebase.auth().currentUser.uid;
    var balance = firebase.database().ref('users/' + userID + '/balance');
    balance.on('value', (snapshot)=> {
      this.setState({balance: snapshot.val()});
    });
    var time = firebase.database().ref('users/' + userID + '/time');
    time.on('value', (snapshot)=> {
      this.setState({time: snapshot.val()});
    });
    var expiration = firebase.database().ref('users/' + userID + '/expiration');
    expiration.on('value', (snapshot)=> {
      this.setState({expiration: snapshot.val()});
    });
   }

  componentWillUnmount(){
    clearInterval(this.qrreplacer)
  }

  render() {
    return (
      <Drawer ref={(ref) => this._drawer = ref}
              styles={drawerStyles}
              tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
              })}
              type="overlay"
              tapToClose={true}
              openDrawerOffset={0.3}
              panCloseMask={0.2}
              closedDrawerOffset={-3}
              content={<DrawerContent closeDrawer={this.closeDrawer}/>}
        >
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={[styles.container, {backgroundColor: this.state.payment_type == "Time" ? "#eaeadc" : '#3d3d3d'}]}>
          <Header withMenuButton openDrawer={this.openDrawer}/>
          <View style={{flexDirection: 'row', marginTop: -1, height: 60 , width: '100%'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: '#3d3d3d', justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Value")}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'white'}}>
                  Value $
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, backgroundColor: "#eaeadc", justifyContent: 'center'}} onPress={()=>this.switchPaymentType("Time")}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontWeight: "800", fontSize: 24, color: 'black'}}>
                  Time  {' '}
                </Text>
                <Icon name='schedule' color='black' />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{textAlign: 'center', color: this.state.payment_type=="Time"?'black':'white', fontSize: 28, fontWeight: "600", margin: 16}}>{this.state.payment_type=="Time"? (this.state.time == "none" ? "No Time" : this.state.time + " expires " + this.state.expiration) :"Balance: $" + this.state.balance}</Text>
            <QRCode
              value={this.state.qrcode_value}
              size={225}
              bgColor={this.state.payment_type=="Time" ? "black" : 'white'}
              fgColor={this.state.payment_type=="Time" ? "#eaeadc" : '#3d3d3d'}/>
            <Text style={{textAlign: 'center', color: this.state.payment_type=="Time"?'black':'white', fontSize: 26, fontWeight: "bold", margin: 20, width: 350}}>Please hold this code a few inches from the scanner.</Text>
            <TouchableOpacity style={{backgroundColor: '#2352a3', width: 300, marginTop: 10, padding: 8}} onPress={()=>this.props.navigation.navigate('FundingScreen', {balance: this.state.balance})}>
              <Text style={{color: 'white', fontWeight: "bold", fontSize: 30, padding: 8, textAlign: 'center'}}>Add Funds</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Drawer>
    );
  }
}

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const drawerStyles = {
  drawer: { shadowColor: 'black', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
