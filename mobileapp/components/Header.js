import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Platform, Image, Button} from 'react-native';
import {Constants} from 'expo'
import {withNavigation} from 'react-navigation'

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

          <Text style={{color: 'white', fontSize: 18, margin: 16}}>MTA Scanner</Text>
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
    backgroundColor:'brown',
    marginBottom: 1,
  },
  back: {
    width: 24,
    height:24,
    margin: 16,
  },
});
