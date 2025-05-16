package com.trips

import android.content.Intent
import android.os.Build
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class TripServiceModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "TripServiceModule"

    @ReactMethod
    fun startTripService() {
        Log.d("TripService", "Foreground Service Started")
        val intent = Intent(reactContext, TripService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactContext.startForegroundService(intent)
        } else {
            reactContext.startService(intent)
        }
    }

    @ReactMethod
    fun stopTripService() {
        Log.d("TripService", "Foreground Service Stopped")
        val intent = Intent(reactContext, TripService::class.java)
        reactContext.stopService(intent)
    }
}
