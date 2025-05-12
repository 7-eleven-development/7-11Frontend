import { ActivityIndicator, StyleSheet } from "react-native";

const LoadingSpinner  = ({ color }: { color: string }) => (
  <ActivityIndicator size="large" color={color} style={styles.spinner} />
);

const styles = StyleSheet.create({
  spinner: {
    marginBottom: 16,
    marginTop: 16,  
},
});

export default LoadingSpinner;