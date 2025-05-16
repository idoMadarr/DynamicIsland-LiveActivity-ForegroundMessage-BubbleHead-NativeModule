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
import useLiveActivity from './hooks/useLiveActivity';
const {DynamicIslandModule} = NativeModules;

function App(): React.JSX.Element {
  const {
    requestLocationPermission,
    initNotifiationWidget,
    updateNotificationWidget,
    removeNotificationWidget,
  } = useLiveActivity();

  useEffect(() => {
    requestLocationPermission();
    Linking.getInitialURL().then(url => {
      // Alert.alert('Cold Start', JSON.stringify(url));
    });

    const listener = Linking.addEventListener('url', ({url}) => {
      // Alert.alert('Hot Start', JSON.stringify(url));
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

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={onTest} style={styles.button}>
        <Text>TEST Swift Module</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={initNotifiationWidget} style={styles.button}>
        <Text>Start Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={updateNotificationWidget}
        style={styles.button}>
        <Text>Update Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={removeNotificationWidget}
        style={styles.button}>
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
