import {View, StyleSheet} from 'react-native';
import React from 'react';
import Screen from './Screen';
import Modal from './Modal/Modal';
import {ModalProvider} from './Modal/ModalProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ModalProvider>
        <View style={styles.container}>
          <Screen />
          <Modal />
        </View>
      </ModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
