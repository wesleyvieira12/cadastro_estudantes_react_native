import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import * as ActionsStudent from '../../store/actions/students';

export default function Item( {item} ) {

  const dispatch = useDispatch();

  function deleteStudent(id) {
    dispatch(ActionsStudent.deleteStudent(id));
    alert("Deletado com successo!");
  }

  return (
    <View style={styles.item}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>Data de nascimento: {item.birthday}</Text>
        <Text style={styles.subtitle}>Série de ingresso: {item.serie}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteStudent(item.id)} style={styles.btn_delete}>
        <MaterialIcons size={25} color="#fff" name="delete"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#63CA6D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row"
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  btn_delete: {
    marginTop: 15,
    backgroundColor: '#e60000',
    padding: 15,
  },
})
