import React, {useEffect} from 'react';
import {
  StyleSheet,
  NativeModules,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from 'react-native';

const {DynamicIslandModule} = NativeModules;

function App(): React.JSX.Element {
  useEffect(() => {
    Linking.getInitialURL().then(url => {
      Alert.alert('Cold Start', JSON.stringify(url));
    });

    const listener = Linking.addEventListener('url', ({url}) => {
      Alert.alert('Hot Start', JSON.stringify(url));
    });

    return () => {
      listener.remove();
    };
  }, []);

  const onTest = () => {
    DynamicIslandModule.testFunc('ido', 'madarr').then((data: any) => {
      console.log('Return to JS', data);
    });
  };

  const onStart = () => {
    DynamicIslandModule.startNotificationActivity();
  };

  const onUpdate = () => {
    DynamicIslandModule.updateNotificationActivity('update from react native!');
  };

  const onEnd = () => {
    DynamicIslandModule.endNotificationActivity();
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={onTest} style={styles.button}>
        <Text>TEST Swift Module</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onStart} style={styles.button}>
        <Text>Start Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onUpdate} style={styles.button}>
        <Text>Update Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onEnd} style={styles.button}>
        <Text>End Activity</Text>
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
    height: 30,
    width: 250,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});

export default App;
