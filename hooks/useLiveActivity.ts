import {NativeModules, PermissionsAndroid, Platform} from 'react-native';

const {DynamicIslandModule, TripServiceModule} = NativeModules;

const isAndroid = () => Platform.OS === 'android';

const useLiveActivity = () => {
  const initNotifiationWidget = async () => {
    if (!isAndroid()) {
      // Starting IOS Dynamic Island
      await DynamicIslandModule.startNotificationActivity();
    } else {
      // Starting Foreground Message
      await TripServiceModule.startTripService();
    }
  };

  const updateNotificationWidget = async () => {
    if (!isAndroid()) {
      await DynamicIslandModule.updateNotificationActivity('updaete from JS');
    } else {
      console.log('Update widget on android');
    }
  };

  const removeNotificationWidget = async () => {
    if (!isAndroid()) {
      // End Dynamic Island
      await DynamicIslandModule.endNotificationActivity();
    } else {
      // End Foreground Message
      await TripServiceModule.stopTripService();
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      const fine =
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const coarse =
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED;

      return fine || coarse;
    } catch (err) {
      console.warn('Failed to request location permission', err);
      return false;
    }
  };

  return {
    requestLocationPermission,
    initNotifiationWidget,
    updateNotificationWidget,
    removeNotificationWidget,
  };
};

export default useLiveActivity;
