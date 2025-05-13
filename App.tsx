import React from 'react';
import {
  StyleSheet,
  NativeModules,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {DynamicIslandModule} = NativeModules;

function App(): React.JSX.Element {
  const onPress = () => {
    DynamicIslandModule.testFunc();
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text>TEST Swift Module</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
  },
});

export default App;
