import {View, StyleSheet, Animated, Image, Easing} from 'react-native';
import React, {useEffect} from 'react';
import {IMAGES} from './assets';

const App = () => {
  const upperPosition = new Animated.ValueXY(0, 0);
  const lowerPosition = new Animated.ValueXY(0, 0);
  const imageScale = new Animated.Value(0);
  const imageRotation = new Animated.Value(0);

  useEffect(() => {
    const upperAnimation = Animated.timing(upperPosition, {
      toValue: {x: 0, y: -200},
      useNativeDriver: true,
      duration: 2000,
    });

    const lowerAnimation = Animated.timing(lowerPosition, {
      toValue: {x: 0, y: 200},
      useNativeDriver: true,
      duration: 2000,
    });

    Animated.parallel([upperAnimation, lowerAnimation]).start(() => {
      startImageAnimation();
    });
  }, []);

  const startImageAnimation = () => {
    Animated.timing(imageScale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 2000,
    }).start(() => {
      startRotationAnimation();
    });
  };

  const startRotationAnimation = () => {
    const rotationAnimation = Animated.timing(imageRotation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 5000,
      easing: Easing.linear,
    });

    Animated.loop(rotationAnimation).start();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Animated.View
        style={[
          styles.upperbox,
          {transform: upperPosition.getTranslateTransform()},
        ]}
      />
      <Animated.View
        style={[
          styles.lowerbox,
          {transform: lowerPosition.getTranslateTransform()},
        ]}
      />
      <Animated.View
        key="uniqueKey"
        style={[
          styles.circleContainer,
          {
            transform: [
              {scale: imageScale},
              {
                rotate: imageRotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}>
        <Image source={IMAGES.flag} style={{width: 200, height: 200}} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperbox: {
    backgroundColor: '#FF671F',
    flex: 0.5,
  },
  lowerbox: {
    backgroundColor: 'green',
    flex: 0.5,
  },
  circleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '38%',
  },
});

export default App;
