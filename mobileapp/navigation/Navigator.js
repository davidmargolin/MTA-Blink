import { StackNavigator } from 'react-navigation';
import HomeScreen from '../pages/HomeScreen'
import FundingScreen from '../pages/FundingScreen'
import CreditCardInput from '../pages/CreditCardInput'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  FundingScreen: {
    screen: FundingScreen
  },
  CreditCardInput:{
    screen: CreditCardInput
  }
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
