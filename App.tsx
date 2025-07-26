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
    initDynamicIsland,
    removeDynamicIsland,
    initForegroundService,
    removeForegroundService,
    requestLocationPermission,
    updateDynamicIsland,
    initBuubleHead,
    removeBubbleHead,
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

  // const onTest = () => {
  //   if (Platform.OS === 'ios') {
  //     ForegroundServiceModule.testFunc('ido', 'madarr').then((data: any) => {
  //       console.log('Return to JS', data);
  //     });
  //   }
  // };

  return (
    <View style={styles.screen}>
      <Text>IOS Native Modules:</Text>

      {/* <TouchableOpacity onPress={onTest} style={styles.button}>
        <Text style={styles.text}>TEST Swift Module</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={initDynamicIsland} style={styles.button}>
        <Text style={styles.text}>Start Dynamic Island + LiveActivity</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeDynamicIsland} style={styles.button}>
        <Text style={styles.text}>Remove Dynamic Island + LiveActivity</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={updateDynamicIsland} style={styles.button}>
        <Text style={styles.text}>Update Dynamic Island + LiveActivity</Text>
      </TouchableOpacity>

      <Text>Android:</Text>

      <TouchableOpacity onPress={initBuubleHead} style={styles.button}>
        <Text style={styles.text}>Start Bubble Head</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeBubbleHead} style={styles.button}>
        <Text style={styles.text}>Remove Bubble Head</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={initForegroundService} style={styles.button}>
        <Text style={styles.text}>Start General Foreground Service</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeForegroundService} style={styles.button}>
        <Text style={styles.text}>Remove General Foreground Service</Text>
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
