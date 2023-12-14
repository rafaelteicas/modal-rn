import {View, Button, Text} from 'react-native';
import React from 'react';
import {useModal} from './Modal/useModal';

export default function Screen() {
  const {setModal} = useModal();
  return (
    <View>
      <Button
        title="Mostrar modal"
        onPress={() => setModal(<Text>OLA</Text>)}
      />
    </View>
  );
}
