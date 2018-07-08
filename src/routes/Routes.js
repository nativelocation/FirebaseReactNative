/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import { NativeEventEmitter, NativeModules, Button, ScrollView, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createDrawerNavigator, createBottomTabNavigator, SafeAreaView } from 'react-navigation';

// My Customs
import MyDrawer from '../components/Drawer/Drawer';
import Icon from '../assets/images/Icon';

// My Layouts
import ProductLayout from '../screens/ProductLayout';
import CompareLayout from '../screens/CompareLayout';
import ExclusiveVodLayout from '../screens/ExclusiveVodLayout';
import OnBoardingLayout from '../screens/OnBoardingLayout';

// My Actions
import { setLocationInfo, setBLEInfo } from '../actions/BLEManage';

// Walkbase Engage
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const ws = new WebSocket('wss://wai.walkbase.com/api/v2/subscribe/device');
// My Screens
import HomeScreen from '../screens/HomeScreen';
import InfoSpecsScreen from '../screens/InfoSpecsScreen';
import ReviewsScreen from '../screens/ReviewsScreen';

class Routes extends Component  {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.handleEventNotDetermined = this.handleEventNotDetermined.bind(this);
    this.handleEventInitializing = this.handleEventInitializing.bind(this);
    this.handleEventPause = this.handleEventPause.bind(this);
    this.handleEventScanning = this.handleEventScanning.bind(this);
    this.handleEventFailed = this.handleEventFailed.bind(this);
    this.handleEventReceivedAdvertisement = this.handleEventReceivedAdvertisement.bind(this);
    this.handleEventErrors = this.handleEventErrors.bind(this);
  };
  componentDidMount() {
    const { dispatch } = this.props;
    // this.watchID = navigator.geolocation.watchPosition(
    //   (position) => {
    //     dispatch(setLocationInfo(position));
    //     // this.props.saveLocationData(position);
    //    },
    //    (error) => this.setState({ error: error.message }),
    //    { enableHighAccuracy: true, timeout: 2000, maximumAge: 0, distanceFilter: 1},
    // );

    this.handlerDiscover1 = bleManagerEmitter.addListener("EngageManagerStateNotDetermined", this.handleEventNotDetermined );
    this.handlerDiscover2 = bleManagerEmitter.addListener("EngageManagerStateInitializing", this.handleEventInitializing );
    this.handlerDiscover3 = bleManagerEmitter.addListener("EngageManagerStatePaused", this.handleEventPause );
    this.handlerDiscover4 = bleManagerEmitter.addListener("EngageManagerStateScanning", this.handleEventScanning );
    this.handlerDiscover5 = bleManagerEmitter.addListener("EngageManagerStateFailed", this.handleEventFailed );
    this.handlerDiscover6 = bleManagerEmitter.addListener("EngageManagerReceivedAdvertisement", this.handleEventReceivedAdvertisement );
    this.handlerDiscover7 = bleManagerEmitter.addListener("EngageManagerOff", this.handleEventErrors );
    this.webAPI();
  }

  handleEventNotDetermined(data) { console.log("Not determined"); alert("a")};
  handleEventInitializing(data) { console.log("Initializing");  alert("b")};
  handleEventPause(data) { console.log("Pause");  alert("c")};
  handleEventScanning(data) { console.log("Scanning");  alert("d")};
  handleEventFailed(data) { console.log("Failed");};

  handleEventReceivedAdvertisement(data) {
    console.log(data);
    dispatch(setBLEInfo(data));
    // this.handleFetchData(data);
    // alert(JSON.stringify(data));
  };

  handleEventErrors(data) {
    if(data.state === 'WBErrorUnknown') {
      console.log(data);
    } else if(data.state === 'WBErrorBluetoothOff') {
      alert("Bluetooth is OFF. Please ON the Bluetooth");
      this.setState({bleState:0})
    } else if(data.state === 'Not error code') {
      this.setState({bleState:1})
    }
  };

  handleFetchData(data) { /* Analyzing the data */ };
  
  componentWillUnmount() {
    this.websocketClose();
    this.handlerDiscover1.remove();
    this.handlerDiscover2.remove();
    this.handlerDiscover3.remove();
    this.handlerDiscover4.remove();
    this.handlerDiscover5.remove();
    this.handlerDiscover6.remove();
    this.handlerDiscover7.remove();
    navigator.geolocation.clearWatch(this.watchID);
  };

  webAPI() {    
    ws.onopen = () => {
      // connection opened
      ws.send('{"user_id": "office_dev", "api_key": "VZHkscRFhAjkScc"}'); // send a message
      alert("sent websocket api");
    };
    
    ws.onmessage = (e) => {
      console.log("received---", e);
      // a message was received
      // if(e.data === "") { //Auth true
      //   // this.setState({auth:"TRUE", receivedData: e});
      //   console.log("received---", e);
      // } else { //Auth false
      //   this.setState({auth:"FALSE"});
      //   console.log("received---", e);
      // }
    };
    
    ws.onerror = (e) => {
      // an error occurred
      alert("error");
      console.log(e.message);
    };
  }
  websocketClose() {    
    ws.onclose = (e) => {
      // connection closed
      alert("close");
      console.log(e.code, e.reason);
    };
  }

  render() {
    return (
      <DrawerNav/>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // saveLocationData: (data) => dispatch(BLEAction.setLocationInfo(data)),

  }
}
export default connect(mapDispatchToProps)(Routes);

const MyNavScreen = ({ navigation, banner }) => (
  <View style={{ flex: 1 }}>
    <ScrollView>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <Text style={{ fontSize: 14}}>{banner}</Text>
        <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
        <Button
          onPress={() => navigation.navigate('Email')}
          title="Open other screen"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back" />
      </SafeAreaView>
      <StatusBar barStyle="default" />
    </ScrollView>
  </View>
);

const TestScreen = () => (

  <View style={{ flex: 1 }}>
    <ScrollView>
      <SafeAreaView forceInset={{ top: 'always' }}>
        <Text >PRODUCTS NEAR YOU</Text>
        <Text > Latitude :    Longitude :  </Text>
        <Text > Auth :  </Text>
        <Text > Sent Data :  </Text>
        <Text > Received Data :  </Text>
      </SafeAreaView>
    </ScrollView>
    </View>
);

// Drawer Navigator - Screens
const AboutRetailCompanion = ({ navigation }) => (
  <MyNavScreen banner={'About Retail Companion'} navigation={navigation} />
);

const Experiences = ({ navigation }) => (
  <MyNavScreen banner={'Experiences'} navigation={navigation} />
);

const Events = ({ navigation }) => (
  <MyNavScreen banner={'Events'} navigation={navigation} />
);

const AccountSettings = ({ navigation }) => (
  <MyNavScreen banner={'Account Settings'} navigation={navigation} />
);

const DebugViews = () => (
  <TestScreen  />
);
// Bottom Tab Navigator - Screens
const SharedSession = ({ navigation }) => (
  <MyNavScreen banner={'Shared Session'} navigation={navigation} />
);

const BottomTabNav = createBottomTabNavigator(
  {
    Products: {
      screen: ProductLayout,
      navigationOptions: {
        title: 'Shopping',
        tabBarIcon: ({tintColor}) => {
          if (tintColor === "#3E3F42")
            return <Icon name="ProductsUnFill" width="23" height="18" viewBox="0 0 23 18" />;
          else
            return <Icon name="ProductsFill" width="23" height="18" viewBox="0 0 23 18" />;
        }
      }
    },
    Compare: {
      screen: CompareLayout,
      navigationOptions: {
        title: 'Compare',
        tabBarIcon: ({tintColor}) => {
          return <Icon name="Compare" width="22" height="22" fill={tintColor} viewBox="0 0 22 22" />;
        }
      }
    },
    ExclusiveVod: {
      screen: ExclusiveVodLayout,
      navigationOptions: {
        title: 'Exclusive VOD',
        tabBarIcon: ({tintColor}) => {
          if (tintColor === "#3E3F42")
            return <Icon name="ExclusiveVodUnFill" width="22" height="18" viewBox="0 0 22 18" />;
          else
            return <Icon name="ExclusiveVodFill" width="22" height="18" viewBox="0 0 22 18" />;
        }
      }
    },
    SharedSession: {
      screen: SharedSession,
      navigationOptions: {
        title: 'Shared Session',
        tabBarIcon: ({tintColor}) => {
          return <Icon name="SharedSession" width="22" height="22" fill={tintColor} viewBox="0 0 22 22" />;
        }
      }
    }
  },
  {
    initialRouteName: 'Products',
    tabBarOptions: {
      activeTintColor: '#FFF',
      activeBackgroundColor: '#1181FF',
      inactiveTintColor: '#3E3F42',
      style: { height: 55 },
      labelStyle: {
        marginTop: -4,
        marginBottom: 8,
        fontFamily: 'SF Pro Text',
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.13,
        lineHeight: 13,
        textAlign: 'center'
      }
    }
  }
);

const DrawerNav = createDrawerNavigator(
  {
    Home: {
      screen: BottomTabNav,
      navigationOptions: { title: 'Home' }
    },
    AboutRetailCompanion: {
      screen: AboutRetailCompanion,
      navigationOptions: { title: 'About Retail Companion' }
    },
    Experiences: {
      screen: Experiences,
      navigationOptions: { title: 'Experiences' }
    },
    Events: {
      screen: Events,
      navigationOptions: { title: 'Events' }
    },
    OnBoarding: {
      screen: OnBoardingLayout,
      navigationOptions: { title: 'OnBoarding' }
    },
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: {
        title: 'Account Settings',
        drawerIcon: ({ tintColor }) => (
          <Icon name="SettingsApp" width="14" height="14" fill={tintColor} viewBox="3 1 20 20" />
        )
      }
    },
    DebugViews: {
      screen: DebugViews
    }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#1181FF',
      activeBackgroundColor: '#EEF1F4',
      inactiveTintColor: '#3E3F42',
      itemsContainerStyle: { marginTop: 26 },
      iconContainerStyle: {
        marginLeft: 0,
        height: 16,
        width: 16,
        marginRight: 5
      }
    },
    contentComponent: props => <MyDrawer {...props} />
  }
);

