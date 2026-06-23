import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const HOME_ADS_PAGE_WIDTH = width;
export const HOME_ADS_CARD_HEIGHT = 300;
export const HOME_ADS_CAROUSEL_HEIGHT = HOME_ADS_CARD_HEIGHT + 12;

export const adSlideStyles = StyleSheet.create({
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '58%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  cardShadow: {
    height: HOME_ADS_CARD_HEIGHT,
    elevation: 4,
    shadowColor: '#0B1324',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
});
