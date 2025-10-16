import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ExampleWithCustomFont() {
  return (
    <View style={styles.container}>
      <Text style={styles.italiannoText}>
        This text uses Italianno font!
      </Text>
      <Text style={styles.regularText}>
        This text uses the default font.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  italiannoText: {
    fontFamily: 'Italianno-Regular',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  regularText: {
    fontSize: 16,
    textAlign: 'center',
  },
});