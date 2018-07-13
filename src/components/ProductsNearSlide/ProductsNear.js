/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import moment from 'moment';
import { Image, Text, View, YellowBox, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-carousel-view';
import Spinkit from 'react-native-spinkit';

import { connect } from 'react-redux';
// My Styles
import styles from './ProductsNearCss';

// My Customs
import Icon from '../../assets/images/Icon';
import ButtonCompare from './ButtonCompare';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Class RCTCxxModule']);

class ProductsNear extends Component {
  constructor() {
    super();
  };

  render() {
    const areaData = this.props.areaData || {};
    const { currentProducts } = this.props;
    const getProduct = (productId) => {
      const match = currentProducts.filter(product => product.id === productId);
      return match.length > 0 ? match[0] : null;
    };
    console.log("-=-=-=", currentProducts, this.props);
    const matching = {};
    (areaData.products || []).forEach(element => {
      matching[element] = getProduct(element);
    });

    return (
      <LinearGradient colors={['#2b3748', '#43597D']} height={166}>
        <TouchableOpacity onPress={this.props.zone}>
          <Text style={styles.title}>PRODUCTS NEAR YOU</Text>
        </TouchableOpacity>
        {
          (currentProducts || []).length > 0 ?
            <Carousel
              animate={false}
              height={136}
              indicatorOffset={4}
              indicatorColor={'#FFF'}
              indicatorSize={6}
              inactiveIndicatorColor={'rgba(255, 255, 255, 0.3)'}
              indicatorSpace={8}
              onPageChange={(index) =>
                (areaData.products) ?
                  this.props.onProductIdChange(areaData.products[index])
                  : null}
            >
              {
                (areaData.products || []).map((productId, index) => (
                  <View style={styles.itemContainer} key={index}>
                    <View style={styles.itemBox}>
                      <View style={styles.imageBox}>
                        <Image style={{ width: 84 }} source={require('../../assets/images/files/S9-Dual.png')} />
                      </View>

                      <View style={styles.detailsBox}>
                        <Text style={styles.titleItem}>{matching[productId].manufacture} {matching[productId].model}</Text>

                        <View style={styles.hrDivider}></View>

                        <View style={styles.deviceOptionsBox}>
                          <View style={styles.deviceOptionItem}>
                            <Icon height="14" width="14" name="Storage" viewBox="0 0 24 24" />
                            <Text style={styles.deviceOptionText}>64GB</Text>
                          </View>
                          <View style={styles.deviceOptionItem}>
                            <Icon height="14" width="14" name="BatteryInclined" viewBox="0 0 20 20" />
                            <Text style={styles.deviceOptionText}>{matching[productId].battery.capacity}</Text>
                          </View>
                          <View style={styles.deviceOptionItem}>
                            <Icon height="14" width="14" name="Camera" viewBox="0 0 24 24" />
                            <Text style={styles.deviceOptionText}>{matching[productId].camera.front.sensor} + {matching[productId].camera.rear.sensor}</Text>
                          </View>
                        </View>

                        <ButtonCompare />
                      </View>
                    </View>
                  </View>
                ))
              }
            </Carousel>
            :
            <View style={styles.itemContainer}>
              {
                !areaData.products ?
                  null
                  :
                  <View style={styles.loadingBox}>
                    <Spinkit isVisible={true} type={'Circle'} color={'gray'} size={20} />
                  </View>
              }
            </View>
        }
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  const { current } = state;

  return { areaData: current.allAreas[0] };
}
export default connect(mapStateToProps)(ProductsNear);
