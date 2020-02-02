import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Item( {item} ) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Data de nascimento: {item.date}</Text>
      <Text style={styles.subtitle}>Série de ingresso: {item.serie}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#63CA6D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
})
