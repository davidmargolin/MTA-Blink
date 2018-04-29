import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, Button, StatusBar} from 'react-native';
import {Constants} from 'expo'
import {withNavigation} from 'react-navigation'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";

class Header extends Component {

  render() {
    return (
        <View
          style={styles.header}>
          <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
          />
          {
            this.props.withMenuButton &&
            <TouchableOpacity style={{marginLeft: 14}}
              onPress={() => this.props.openDrawer()}
              >
              <Icon name="dehaze" color="white" size={36}/>
            </TouchableOpacity>
          }
          {
            this.props.withBackButton &&
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              >
              <Image
                resizeMode="contain"
                style={styles.back}
                source={Platform.OS === 'ios' ?  require('../images/ic_action_chevron_left.png') : require('../images/ic_action_arrow_back.png')}
              />
            </TouchableOpacity>
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
          <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold', margin: 16}}>MTA Blink</Text>

          {
            this.props.withLogOutButton &&
            <TouchableOpacity style={{position: 'absolute', flex: 1, width: 30, top: 10, right: 20}}
              onPress={() => firebase.auth().signOut()}
              >
              <Icon name='exit-to-app' color='white' size={36}/>
            </TouchableOpacity>
          }
          </View>
      </View>
    );
  }
}

export default withNavigation(Header);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: 'center',
    backgroundColor:'#222',
  },
  back: {
    width: 24,
    height:24,
    margin: 16,
  },
});
