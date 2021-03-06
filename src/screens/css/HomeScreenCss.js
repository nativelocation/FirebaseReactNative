/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

import { StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get('window');

export default StyleSheet.create({

  icon: {
    width: 24,
    height: 24,
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sliderBox: {
    height: 150,
    width: 250,
    backgroundColor: 'grey'
  },

  headerBox: {
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerTitle: {
    width: 85,
    marginLeft: 10,
    textAlign: 'left',
    color: '#FFF',
    // fontFamily: 'Rubik',
    fontSize: 16,
    lineHeight: 19
  },


  container: { backgroundColor: '#FFF' },
  infoSpecBox: { paddingHorizontal : 10 },
  // - - Description Box - -
  description: {
    marginTop: 15,
    marginBottom: 13,
    textAlign: 'left',
    // fontFamily: 'Rubik',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.12,
    lineHeight: 22
  },
  hrDivider: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#1181FF',
    marginTop: 10,
    marginBottom: 10
  },
  titleDivider: {
    position: 'absolute',
    top: 1,
    paddingRight: 10,
    backgroundColor: '#FFF',
    color: '#1181FF',
    // fontFamily: 'Rubik',
    fontSize: 14,
    letterSpacing: 0.12,
    lineHeight: 17
  },
  // - - Color Box - -
  colorItemBox: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  colorItem: {
    alignItems: 'center',
    width: 70,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  colorImage: {
    height: 85,
    width: 40
  },
  colorTitle: {
    height: 28,
    width: 50,
    color: '#3E3F42',
    // fontFamily: 'Roboto',
    fontSize: 12,
    letterSpacing: 0.1,
    lineHeight: 14,
    textAlign: 'center',
    marginVertical: 5
  },
  // - - Storage Box - -
  storageBox: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  storageItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    minWidth: '48%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E3E9EF',
    borderRadius: 6,
    backgroundColor: '#FFFFFF'
  },
  storageGB: {
    color: '#3E3F42',
    // fontFamily: 'Roboto',
    fontSize: 18,
    lineHeight: 21
  },
  storagePrice: {
    color: '#AEBECD',
    // fontFamily: 'Roboto',
    fontSize: 18,
    lineHeight: 21
  },
  // - - Display Box - -
  displayBox: {
    marginTop: 8,
    justifyContent: 'space-evenly'
  },
  displaySizeItem: {
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displaySizeHr: {
    position: 'absolute',
    height: '110%',
    width: 2,
    backgroundColor: '#E3E9EF',
    transform: [{ rotate: '45deg' }]
  },
  displaySize: {
    backgroundColor: 'white',
    color: '#3E3F42',
    // fontFamily: 'Rubik',
    fontSize: 20,
    letterSpacing: 0.17,
    lineHeight: 22
  },
  displayTextItem: {
    height: 50,
    justifyContent: 'center'
  },
  displayText: {
    color: '#3E3F42',
    // fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0.12,
    lineHeight: 20
  },
  // - - Camera Box - -
  cameraItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,
    minWidth: '48%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E3E9EF',
    borderRadius: 6,
    backgroundColor: '#FFFFFF'
  },
  cameraTitle: {
    color: '#3E3F42',
    // fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.12,
    lineHeight: 20
  },
  cameraText: {
    color: '#3E3F42',
    // fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0.12,
    lineHeight: 20
  },
  // - - Camera Box - List - -
  cameraList: { marginVertical: 10 },
  cameraListItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cameraListDot: {
    width: 3,
    height: 3,
    borderRadius: 5,
    backgroundColor: '#1181FF'
  },
  cameraListText: { marginLeft: 5 },
  // - - Performance Box - -
  performanceBox: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  performanceItem: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  performanceViewImage: {
    height: 30,
    width: 30,
    transform: [{ rotate: '90deg' }]
  },
  performanceViewText: { width: width - 30 },
  performanceText: {
    color: '#3E3F42',
    // fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0.12,
    lineHeight: 20
  },
  performanceTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  // - - Expandable Storage Box - -
  expandableBox: { marginTop: 10 },
  expandableViewText: { marginBottom: 8 }
});
