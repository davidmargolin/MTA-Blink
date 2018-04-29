import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";

class DrawerContent extends Component {
  render () {
    return (
      <View style={{backgroundColor: 'black', height: '100%', opacity: 0.8}}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <TouchableOpacity
            style={{width: 30}}
            onPress={() => this.props.closeDrawer()}
            >
            <Image
              resizeMode="contain"
              style={styles.back}
              source={Platform.OS === 'ios' ?  require('../images/ic_action_chevron_left.png') : require('../images/ic_action_arrow_back.png')}
            />
          </TouchableOpacity>
          <Text style={{marginTop: 10, position: 'absolute', right: 90, fontSize: 28, fontWeight: '800', color: 'white'}}>Menu</Text>
        </View>
        <View style={{marginTop: 20, height: 240, width: '100%'}}>
          <TouchableOpacity style={{borderWidth: 1, flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '600', color: 'white'}}>
              Nearby Stations
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1, flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '600', color: 'white'}}>
              Subway Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1, flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '600', color: 'white'}}>
              Bus Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 1, flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '600', color: 'white'}}>
              Find Routes
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', bottom: 10, right: 15, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: 'white', width: 80, fontWeight: 'bold', fontSize: 18}}>
            Log Out
          </Text>
          <TouchableOpacity
            style={{marginTop: -5}}
            onPress={() => firebase.auth().signOut()}
            >
            <Icon name='exit-to-app' color='white' size={36}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default withNavigation(DrawerContent);

const styles = StyleSheet.create({
  back: {
    width: 24,
    height:24,
    margin: 16,
  },
});
