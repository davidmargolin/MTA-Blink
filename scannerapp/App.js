import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import * as firebase from 'firebase'
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasCameraPermission: null,
      scanning: true,
      uservalid: false
    }
  }

  componentDidMount=()=>{
    Permissions.askAsync(Permissions.CAMERA).then((response)=>this.setState({hasCameraPermission: response.status === 'granted'}));
    var config = {
      apiKey: "AIzaSyByWpAy1yK5XrD5ENlXEIIsC5VxQOxLY7A",
      authDomain: "mta-scanner.firebaseapp.com",
      databaseURL: "https://mta-scanner.firebaseio.com",
      projectId: "mta-scanner",
      storageBucket: "mta-scanner.appspot.com",
      messagingSenderId: "1081675998683"
    };
    firebase.initializeApp(config);
  }

  _handleBarCodeRead = (data) => {
    this.setState({scanning: false})

    let time = data.slice(-13);
    console.log("code time is: "+time)
    let date = new Date();
    let currenttime = date.getTime();
    console.log("current time is: "+currenttime)
    if (time <= currenttime+8000 && time >= currenttime-8000){
      this.setState({ uservalid: true})
    }else{
      this.setState({ uservalid: false})
    }
    setTimeout(()=>{
      this.setState({scanning: true})
    }, 2000);

  }

  render() {
    const { hasCameraPermission } = this.state;
    if (this.state.scanning){
      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeRead={(result)=>this._handleBarCodeRead(result.data)}
              style={StyleSheet.absoluteFill}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          </View>
        );
      }
    }else{
      return (
        <View style={{flex: 1, backgroundColor: (this.state.uservalid)?'green': 'red'}}>

        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
