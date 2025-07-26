package com.trips;


import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BubbleHeadModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public BubbleHeadModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "BubbleHead";
    }

    @ReactMethod
    public void startBubble() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
                !Settings.canDrawOverlays(reactContext)) {

            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + reactContext.getPackageName()));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
            return;
        }

        Intent serviceIntent = new Intent(reactContext, BubbleHeadService.class);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactContext.startForegroundService(serviceIntent);
        } else {
            reactContext.startService(serviceIntent);
        }
    }

    @ReactMethod
    public void removeBubble() {
        Intent serviceIntent = new Intent(reactContext, BubbleHeadService.class);
        serviceIntent.setAction(BubbleHeadService.ACTION_CLOSE_WITH_ANIMATION); // 🔁 send custom stop signal
        reactContext.startService(serviceIntent);
    }
}