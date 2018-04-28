import { StackNavigator } from 'react-navigation';
import HomeScreen from '../pages/HomeScreen'

export default StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
},
{
  initialRouteName: 'HomeScreen',
  headerMode: 'none'
});
