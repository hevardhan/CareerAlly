package me.careerally.app;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Custom code here
        // For example, show a toast message
        android.widget.Toast.makeText(this, "App Started", android.widget.Toast.LENGTH_LONG).show();
    }
}
