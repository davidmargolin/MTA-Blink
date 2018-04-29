import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Image, Button} from 'react-native';
import {Constants} from 'expo'
import {withNavigation} from 'react-navigation'
import { Icon } from 'react-native-elements'
import * as firebase from "firebase";

class Header extends Component {

  render() {
    return (
        <View
          style={styles.header}>
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
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1, paddingRight: 10}}
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
