package org.eliteware.rally;

import android.content.Context;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.location.*;
import android.widget.TextView;
import android.hardware.*;


public class Main extends ActionBarActivity implements LocationListener, SensorEventListener {
    protected TextView textView = null;

    protected LocationManager locationManager = null;
    protected SensorManager sensorManager = null;
    protected Sensor accelerometer = null;
    protected Sensor magnetometer = null;

    protected Location lastLocation = null;
    protected SensorEvent lastMagnetometerEvent = null;
    protected SensorEvent lastAccelerometerEvent = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        this.locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);

        this.sensorManager = (SensorManager) this.getSystemService(Context.SENSOR_SERVICE);
        this.accelerometer = this.sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        this.magnetometer = this.sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        this.sensorManager.registerListener(this, this.accelerometer, SensorManager.SENSOR_DELAY_GAME);
        this.sensorManager.registerListener(this, this.magnetometer, SensorManager.SENSOR_DELAY_GAME);

        this.textView = (TextView)this.findViewById(R.id.theTextView);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private float[] rotation = new float[9];
    private float[] orientation = new float[3];
    protected void updateDisplay() {
        String text = "";
        if (this.lastLocation != null) {
            double latitude = lastLocation.getLatitude();
            double longitude = lastLocation.getLongitude();
            text += latitude + ", " + longitude;
        }
        if (this.lastAccelerometerEvent != null && this.lastMagnetometerEvent != null) {
            this.sensorManager.getRotationMatrix(this.rotation, null,
                    this.lastAccelerometerEvent.values, this.lastMagnetometerEvent.values);
            this.sensorManager.getOrientation(this.rotation, this.orientation);
            float azimuthRad = this.orientation[0];
            float azimuthDeg = (float)(Math.toDegrees(azimuthRad)+360)%360;
            text += "\n" + azimuthDeg + " degrees";
        }

        this.textView.setText(text);
    }

    /******** GPS *********/
    public void onProviderEnabled(String provider) {
        System.out.println("enabled: " + provider);
    }
    public void onProviderDisabled(String provider) {
        System.out.println("disabled: " + provider);
    }
    public void onStatusChanged(String provider, int status, Bundle extras) {
        System.out.println(status + ": " + provider);
    }
    public void onLocationChanged(Location location) {
        this.lastLocation = location;
        this.updateDisplay();
    }

    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        System.out.println("accuracy: " + accuracy);
    }
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor == this.accelerometer) {
            this.lastAccelerometerEvent = event;
        } else if (event.sensor == this.magnetometer) {
            this.lastMagnetometerEvent = event;
        }
        this.updateDisplay();
    }
}
