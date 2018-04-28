import { StackNavigator } from 'react-navigation';
import HomeScreen from '../pages/HomeScreen'
import FundingScreen from '../pages/FundingScreen'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  FundingScreen: {
    screen: FundingScreen
  }
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
