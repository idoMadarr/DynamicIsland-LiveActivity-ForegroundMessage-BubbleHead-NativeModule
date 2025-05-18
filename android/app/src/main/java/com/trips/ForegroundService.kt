package com.trips

import android.app.Service
import android.content.Intent
import android.os.IBinder
import androidx.core.app.NotificationCompat

class ForegroundService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val notification = NotificationCompat.Builder(this, "trip_channel")
            .setContentTitle("Starting new drive")
            .setContentText("This is a foreground message...")
            .setSmallIcon(R.mipmap.ic_launcher) // replace with your own icon
            .setOngoing(true)
            .build()

        startForeground(1, notification)
        // Do any background work here (e.g., start tracking)
        return START_NOT_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
