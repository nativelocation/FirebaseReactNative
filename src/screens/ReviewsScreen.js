/**
 * Conexus-Tech - Retail Companion AT&T
 * https://conexustech.com/
 * @flow
 */

import React, { Component } from 'react';
import { Animated, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { connect } from 'react-redux';

// My Styles
import styles from './css/ReviewsScreenCss';

// My Customs
import SkeletonLoading from './components/SkeletonLoading';
import CustomerReview from './components/CustomerReview';
import WebReview from './components/WebReview';
import VideoContent from './components/VideoContent';
import FeedbackSurvey from './components/FeedbackSurvey';

var { width } = Dimensions.get('window');

const getWidth = (number) => {
  return (((width - 20)/2) - number);
};

const ReviewsSkeleton = () => (
  <View style={styles.skeletonLoading}>
    <SkeletonLoading height={235}>
      <Rect x={getWidth(100)} y="0" rx="3" ry="3" width="200" height="10"/>
      <Rect x={getWidth(90)} y="15" rx="3" ry="3" width="180" height="10"/>
      <Rect x="0" y="40" rx="5" ry="5" width="100%" height="80"/>

      <Rect x="0" y="130" rx="3" ry="3" width="120" height="10"/>
      <Rect x="0" y="145" rx="5" ry="5" width="100%" height="80"/>
    </SkeletonLoading>
  </View>
);

class ReviewsScreen extends Component {
  constructor(props) {
    super(props);
  }

  setNewValue(a, b, c, d, e) {
    return {
      hideHeader: a,
      heightHeader: b,
      hideSlide: c,
      heightSlide: d,
      heightScrolled: e
    }
  }

  renderCustomerReviews() {
    const { customerReviews, model, manufacture } = this.props.reviews;

    if (typeof customerReviews != "undefined" && customerReviews.length > 0) {
      return (
        <View>
          <Text style={styles.webReviewTitle}>Reviews from myAT&T</Text>

          <View style={[styles.cardContainer, { borderTopColor: '#1181FF' }]}>
            <View style={styles.headerCard}>
              <Image style={[styles.logoReview, { width: 60 }]} source={require('../assets/images/files/myAtt.jpg')} />
              <Text style={[styles.titleReview, { marginTop: -4 }]}>Customer Reviews</Text>
            </View>

            { customerReviews.map((item, index) => {
                return <CustomerReview key={index} index={index} item={item} model={model} manufacture={manufacture}/>;
              })
            }
          </View>
        </View>
      );
    }
  }

  renderWebReviews() {
    const { webReviews,  model, manufacture } = this.props.reviews;

    if (typeof webReviews != "undefined" && webReviews.length > 0) {
      return (
        <View>
          { webReviews.map((item, index) => {
              return <WebReview key={index} index={index} item={item} model={model} manufacture={manufacture} publication={webReviews[index].publication}/>;
            })
          }
        </View>
      );
    }
  }

  renderVideoContent() {
    const { videoContent,  model, manufacture } = this.props.reviews;

    if (typeof videoContent != "undefined" && videoContent.length > 0) {
      return (
        <View>
          { videoContent.map((item, index) => {
              return <VideoContent key={index} index={index} item={item} model={model} manufacture={manufacture}/>;
            })
          }
        </View>
      );
    }
  }

  renderContent() {
    const { reviews } = this.props;
    if (Object.keys(reviews).length === 0 && reviews.constructor === Object) {
      return ( <ReviewsSkeleton /> );
    } else {
      return (
        <View style={styles.reviewsBox}>
          <View style={styles.headerPrincipal}>
            <Text style={styles.textTitleUno}>Make an informed decision.</Text>
            <Text style={styles.textSubtitle}>Read what the reviews are saying.</Text>
          </View>

          { this.renderWebReviews() }
          { this.renderCustomerReviews() }
          { this.renderVideoContent() }
        </View>
      );
    }
  }

  render() {
    return (
      <Animated.ScrollView contentContainerStyle={styles.container} scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.props.onScrollCustom } } }],
          {
            /*useNativeDriver: true*//*,
            listener: event => {
              const offsetY = event.nativeEvent.contentOffset.y
              this.props.onScrollCustom(offsetY);
            }*/
          }
        )}
        >
        { this.renderContent() }
        <FeedbackSurvey />
      </Animated.ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { current, common } = state;

  return { reviews: current.product };
}

export default connect(mapStateToProps)(ReviewsScreen);
