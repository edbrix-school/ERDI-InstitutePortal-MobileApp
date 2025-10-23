import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = "AIzaSyA8saOJuJxk5EXQN_-R7WCP7YAjd68XQP4";

const ROUTE_DATA = {
  origin: { latitude: 38.9575, longitude: -111.8594 }, // Salina, UT
  destination: { latitude: 40.7608, longitude: -111.8910 }, // Salt Lake City, UT
  duration: "2 hr 7 min",
  altDuration: "2 hr 36 min",
};

export default function EventMaps() {
  const mapRef = React.useRef(null);

  const onMapReady = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [ROUTE_DATA.origin, ROUTE_DATA.destination],
        {
          edgePadding: { top: 120, right: 50, bottom: 300, left: 50 },
          animated: true,
        }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search/Header Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.searchBar}>
          <View style={styles.inputContainer}>
            <View style={[styles.bullet, { backgroundColor: "#c0c0c0" }]} />
            <TextInput
              style={styles.textInput}
              placeholder="Origin"
              placeholderTextColor="#f0f0f0"
              value="Salina, UT"
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={[styles.bullet, { backgroundColor: "red" }]} />
            <TextInput
              style={styles.textInput}
              placeholder="Destination"
              placeholderTextColor="#f0f0f0"
              value="Salt Lake City, Utah, USA"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.swapButton}>
          <Text style={{ color: "#fff" }}>⇅</Text>
        </TouchableOpacity>
      </View>

      {/* Real Google Map */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 39.8,
          longitude: -111.8,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
        customMapStyle={darkMapStyle}
        onMapReady={onMapReady}
      >
        <Marker coordinate={ROUTE_DATA.origin} title="Salina" />
        <Marker coordinate={ROUTE_DATA.destination} title="Salt Lake City" />
        <MapViewDirections
          origin={ROUTE_DATA.origin}
          destination={ROUTE_DATA.destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#3b82f6"
          onReady={(result) => {
            console.log("Distance:", result.distance, "Duration:", result.duration);
          }}
        />
      </MapView>

      {/* Floating ETA Boxes */}
      <View style={[styles.etaBox, styles.leftEtaBox]}>
        <Text style={styles.etaText}>{ROUTE_DATA.duration}</Text>
      </View>
      <View style={[styles.etaBox, styles.rightEtaBox]}>
        <Text style={styles.etaText}>{ROUTE_DATA.altDuration}</Text>
      </View>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <View style={styles.driveHeader}>
          <Text style={styles.driveText}>🚗 Drive</Text>
          <View style={styles.optionsContainer}>
            <Text style={styles.optionIcon}>⚙️</Text>
            <TouchableOpacity 
            onPress={()=>router.back()}
            >
            <Text style={styles.optionIcon}>❌</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => console.log("Preview")}
          >
            <Text style={styles.primaryButtonText}>» Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Share")}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Save")}>
            <Text style={styles.buttonText}>☐ Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#383838" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    padding: 10,
  },
  inputContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 5 },
  bullet: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  textInput: { flex: 1, color: "#fff", fontSize: 16, padding: 0 },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2c2c2c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  etaBox: {
    position: "absolute",
    padding: 10,
    borderRadius: 8,
    top: "45%",
    zIndex: 5,
  },
  leftEtaBox: { left: "10%", backgroundColor: "#3b82f6" },
  rightEtaBox: { right: "10%", backgroundColor: "#525252" },
  etaText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bottomMenu: {
    backgroundColor: "#2c2c2c",
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  driveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3c3c3c",
  },
  driveText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  optionsContainer: { flexDirection: "row" },
  optionIcon: { color: "#c0c0c0", fontSize: 24, marginLeft: 15 },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#3c3c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#3b82f6", fontWeight: "bold", fontSize: 16 },
  primaryButton: { backgroundColor: "#3b82f6" },
  primaryButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
