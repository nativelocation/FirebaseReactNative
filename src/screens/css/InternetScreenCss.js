/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

import { StyleSheet, Dimensions } from 'react-native';

export const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: width
  },
  topIconView: {
    flexDirection: 'row', 
    backgroundColor: '#0060C4', 
    width: width - 120, 
    height: 60, 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 5,
    borderStyle: 'solid',
    elevation: 2,
    borderRadius: 6,
    marginBottom: 14
  },
  directvCardView: {
    width: width-20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 14
  },
  txtTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26,
    marginTop: 20,
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  txtSmall: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  askRepBox: {
    backgroundColor: '#000',
    width: width - 20,
    marginVertical: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
})
