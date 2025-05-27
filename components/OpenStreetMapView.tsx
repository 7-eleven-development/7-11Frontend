import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

interface OpenStreetMapViewProps {
  latitude: number;
  longitude: number;
  onRefresh?: () => void;
}

const OpenStreetMapView: React.FC<OpenStreetMapViewProps> = ({ 
  latitude, 
  longitude, 
  onRefresh 
}) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            const map = L.map('map').setView([${latitude}, ${longitude}], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            const marker = L.marker([${latitude}, ${longitude}])
                .addTo(map)
                .bindPopup('Din plats')
                .openPopup();
                
            // Enable user location if available
            map.locate({setView: false, maxZoom: 16});
            
            map.on('locationfound', function(e) {
                const radius = e.accuracy / 2;
                L.circle(e.latlng, radius).addTo(map);
            });
        </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});

export default OpenStreetMapView;