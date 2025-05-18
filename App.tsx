import React, {useEffect} from 'react';
import {
  StyleSheet,
  NativeModules,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import useLiveActivities from './hooks/useLiveActivities';
const {ForegroundServiceModule} = NativeModules;

function App(): React.JSX.Element {
  const {
    requestLocationPermission,
    initNotifiationWidget,
    updateNotificationWidget,
    removeNotificationWidget,
  } = useLiveActivities();

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
    if (Platform.OS === 'ios') {
      ForegroundServiceModule.testFunc('ido', 'madarr').then((data: any) => {
        console.log('Return to JS', data);
      });
    }
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={onTest} style={styles.button}>
        <Text style={styles.text}>TEST Swift Module</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={initNotifiationWidget} style={styles.button}>
        <Text style={styles.text}>Start Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={updateNotificationWidget}
        style={styles.button}>
        <Text style={styles.text}>Update Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={removeNotificationWidget}
        style={styles.button}>
        <Text style={styles.text}>End Activity</Text>
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
  text: {
    color: 'white',
  },
});

export default App;
