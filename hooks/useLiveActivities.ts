import {NativeModules, PermissionsAndroid, Platform} from 'react-native';

const {
  DynamicIslandModule,
  ForegroundServiceModule,
  BubbleOverlayPermission,
  BubbleHead,
} = NativeModules;

const isAndroid = () => Platform.OS === 'android';

const useLiveActivities = () => {
  const initDynamicIsland = async () => {
    if (!isAndroid()) {
      await DynamicIslandModule.startNotificationActivity();
    }
  };

  const removeDynamicIsland = async () => {
    if (!isAndroid()) {
      await DynamicIslandModule.endNotificationActivity();
    }
  };

  const initForegroundService = async () => {
    if (isAndroid()) {
      await ForegroundServiceModule.initForegroundService();
    }
  };

  const removeForegroundService = async () => {
    if (isAndroid()) {
      await ForegroundServiceModule.stopForegroundService();
    }
  };

  const updateDynamicIsland = async () => {
    if (!isAndroid()) {
      await DynamicIslandModule.updateNotificationActivity('updaete from JS');
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

  const initBuubleHead = async () => {
    if (isAndroid()) {
      const result = await BubbleOverlayPermission.requestOverlayPermission();
      if (result) {
        await BubbleHead.startBubble();
      }
    }
  };

  const removeBubbleHead = async () => {
    if (isAndroid()) {
      await BubbleHead.removeBubble();
    }
  };

  return {
    requestLocationPermission,

    initDynamicIsland,
    removeDynamicIsland,
    updateDynamicIsland,

    initForegroundService,
    removeForegroundService,

    initBuubleHead,
    removeBubbleHead,
  };
};

export default useLiveActivities;
