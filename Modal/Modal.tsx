/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useModal} from './useModal';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

export default function Modal() {
  const {modal, hideModal} = useModal();
  const [heightContent, setHeightContent] = useState<number>(0);
  const yHeight = useSharedValue(0);
  const reset = useSharedValue(0);
  const pan = Gesture.Pan()
    .onStart(() => {
      reset.value = yHeight.value;
    })
    .onUpdate(e => {
      yHeight.value = e.translationY + reset.value;
    })
    .onEnd(() => {
      if (yHeight.value < -650 || yHeight.value > 30) {
        downModal();
      }
    })
    .runOnJS(true);
  function downModal() {
    yHeight.value = withTiming(0, {duration: 400});
  }
  const animatedView = useAnimatedStyle(() => ({
    transform: [{translateY: yHeight.value}],
  }));
  if (!modal) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={hideModal}>
        <View style={styles.background} />
      </Pressable>
      <Animated.View
        style={[
          styles.modal,
          animatedView,
          {top: height - heightContent - 64},
        ]}>
        <GestureDetector gesture={pan}>
          <View
            onLayout={e => {
              setHeightContent(e.nativeEvent.layout.height);
            }}
            style={{
              width,
              height: 30,
              position: 'absolute',
            }}>
            <View
              style={{
                backgroundColor: '#000',
                width: 100,
                height: 3,
                borderRadius: 30,
                top: 20,
                alignSelf: 'center',
              }}
            />
          </View>
        </GestureDetector>
        {modal}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
  },
  background: {
    height,
    width,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  modal: {
    width,
    height,
    position: 'absolute',
    padding: 32,
    backgroundColor: '#fff',
    bottom: 0,
    borderRadius: 30,
  },
});
