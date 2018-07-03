/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import { Image, Text, View,
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
  NativeModules, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-carousel-view';

// My Styles
import styles from './ProductsNearCss';

// My Customs
import Icon from '../../assets/images/Icon';
import ButtonCompare from './ButtonCompare';

// Walkbase Engage
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
// const io = require('socket.io');
// var wsUri = "wss://wai.walkbase.com/api/v2/subscribe/device";

class ProductsNear extends Component {
  constructor() {
    super();
    this.state = {
      walkbaseState: '',
      coords: {
        latitude: 0,
        longitude: 0
      },
      bleState: 0 // 0: off, 1: on
    };
    this.handleEventNotDetermined = this.handleEventNotDetermined.bind(this);
    this.handleEventInitializing = this.handleEventInitializing.bind(this);
    this.handleEventPause = this.handleEventPause.bind(this);
    this.handleEventScanning = this.handleEventScanning.bind(this);
    this.handleEventFailed = this.handleEventFailed.bind(this);
    this.handleEventReceivedAdvertisement = this.handleEventReceivedAdvertisement.bind(this);
    this.handleEventErrors = this.handleEventErrors.bind(this);
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({coords: position.coords});
        var initialPosition = JSON.stringify(position);
        alert(initialPosition);
      }
    )
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({coords: position.coords});
        var initialPosition = JSON.stringify(position);
        alert(initialPosition);
      }
    )
  };

  componentDidMount() {
    this.handlerDiscover1 = bleManagerEmitter.addListener('WBEngageManagerStateNotDetermined', this.handleEventNotDetermined );
    this.handlerDiscover2 = bleManagerEmitter.addListener('WBEngageManagerStateInitializing', this.handleEventInitializing );
    this.handlerDiscover3 = bleManagerEmitter.addListener('WBEngageManagerStatePaused', this.handleEventPause );
    this.handlerDiscover4 = bleManagerEmitter.addListener('WBEngageManagerStateScanning', this.handleEventScanning );
    this.handlerDiscover5 = bleManagerEmitter.addListener('WBEngageManagerStateFailed', this.handleEventFailed );
    this.handlerDiscover6 = bleManagerEmitter.addListener('WBEngageManagerReceivedAdvertisement', this.handleEventReceivedAdvertisement );
    this.handlerDiscover7 = bleManagerEmitter.addListener('WBEngageManagerOff', this.handleEventErrors );
    this.fetchLocation();
    // io.on('connection', (client) => {

    // })
  };

  handleEventNotDetermined(data) { console.log("Not determined"); };
  handleEventInitializing(data) { console.log("Initializing"); };
  handleEventPause(data) { console.log("Pause"); };
  handleEventScanning(data) { console.log("Scanning"); };
  handleEventFailed(data) { console.log("Failed"); };

  handleEventReceivedAdvertisement(data) {
    console.log(data);
    this.handleFetchData(data);
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
    this.handlerDiscover1.remove();
    this.handlerDiscover2.remove();
    this.handlerDiscover3.remove();
    this.handlerDiscover4.remove();
    this.handlerDiscover5.remove();
    this.handlerDiscover6.remove();
    this.handlerDiscover7.remove();
    // navigator.geolocation.clearWatch(this.watchID);
    // LocationServicesDialogBox.stopListener();
  };

  checkLocationPermission() {
    if (Platform.OS === 'android') {
    } else {
      this.fetchLocation();
    }
  }

  fetchLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.currentCoord = {
          latitude: coords.latitude,
          longitude: coords.longitude
        };
      },
      error => console.log('Location Error1', error),
      {
        timeout: 20000,
        enableHighAccuracy: true,
      });
    this.watchID = navigator.geolocation.watchPosition(
      ({ coords }) => {
        this.currentCoord = {
          latitude: coords.latitude,
          longitude: coords.longitude
        };
      },
      (error) => {
        console.log('Location Error2', error)
      });
  }

  render() {
    return (
      <LinearGradient colors={['#2b3748', '#43597D']}>
        <Text style={styles.title}>PRODUCTS NEAR YOU</Text>
        <Carousel
          animate={false}
          height={136}
          indicatorOffset={4}
          indicatorColor={'#FFF'}
          indicatorSize={6}
          inactiveIndicatorColor={'rgba(255, 255, 255, 0.3)'}
          indicatorSpace={8}
          >
          <View style={styles.itemContainer}>
            <View style={styles.itemBox}>
              <View style={styles.imageBox}>
                <Image style={{ width: 84 }} source={require('../../assets/images/files/S9-Dual.png')} />
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.titleItem}>Samsung Galaxy S9</Text>

                <View style={styles.hrDivider}></View>

                <View style={styles.deviceOptionsBox}>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="Storage" viewBox="0 0 24 24" />
                    <Text style={styles.deviceOptionText}>64GB</Text>
                  </View>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="BatteryInclined" viewBox="0 0 20 20" />
                    <Text style={styles.deviceOptionText}>16hrs</Text>
                  </View>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="Camera" viewBox="0 0 24 24" />
                    <Text style={styles.deviceOptionText}>18MP + 8MP</Text>
                  </View>
                </View>

                <ButtonCompare />
              </View>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.itemBox}>
              <View style={styles.imageBox}>
                <Image style={{ width: 84 }} source={require('../../assets/images/files/S9-Dual.png')} />
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.titleItem}>Samsung Galaxy S9</Text>

                <View style={styles.hrDivider}></View>

                <View style={styles.deviceOptionsBox}>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="Storage" viewBox="0 0 24 24" />
                    <Text style={styles.deviceOptionText}>64GB</Text>
                  </View>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="BatteryInclined" viewBox="0 0 20 20" />
                    <Text style={styles.deviceOptionText}>16hrs</Text>
                  </View>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="Camera" viewBox="0 0 24 24" />
                    <Text style={styles.deviceOptionText}>18MP + 8MP</Text>
                  </View>
                </View>
                <ButtonCompare />
              </View>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <View style={styles.itemBox}>
              <View style={styles.imageBox}>
                <Image style={{ width: 84 }} source={require('../../assets/images/files/S9-Dual.png')} />
              </View>

              <View style={styles.detailsBox}>
                <Text style={styles.titleItem}>Samsung Galaxy S9</Text>

                <View style={styles.hrDivider}></View>

                <View style={styles.deviceOptionsBox}>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="Storage" viewBox="0 0 24 24" />
                    <Text style={styles.deviceOptionText}>64GB</Text>
                  </View>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="BatteryInclined" viewBox="0 0 20 20" />
                    <Text style={styles.deviceOptionText}>16hrs</Text>
                  </View>
                  <View style={styles.deviceOptionItem}>
                    <Icon height="14" width="14" name="Camera" viewBox="0 0 24 24" />
                    <Text style={styles.deviceOptionText}>18MP + 8MP</Text>
                  </View>
                </View>

                <ButtonCompare />
              </View>
            </View>
          </View>
        </Carousel>
      </LinearGradient>
    );
  }
}

export default ProductsNear;
