import { StackNavigator } from 'react-navigation';
import HomeScreen from '../pages/HomeScreen'
import FundingScreen from '../pages/FundingScreen'
import CreditCardInput from '../pages/CreditCardInput'
import PaymentSuccessful from '../pages/PaymentSuccessful'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  FundingScreen: {
    screen: FundingScreen
  },
  CreditCardInput:{
    screen: CreditCardInput
  },
  PaymentSuccessful:{
    screen: PaymentSuccessful
  }
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
