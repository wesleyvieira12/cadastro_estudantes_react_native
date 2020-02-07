import React, { useState, useEffect} from 'react';
import { View, FlatList, TouchableOpacity, TextInput, TouchableHighlight} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import Item from '../../components/Item';

import styles from './style';

export default function Home({navigation}) {
  const students = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [new_student, setNewStudent] = useState('');
  useEffect(() => {
    function searchStudents() {
      setNewStudent(students.filter( res => res.name.toLowerCase().indexOf(search.toLowerCase())>=0));
    }
    searchStudents();
  }, [search, students]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o nome do estudante"
        placeholderTextColor="#999"
        autoCorrect={false}
        style={styles.input}
        onChangeText={setSearch}
      />
      <FlatList
        style={styles.list}
        data={new_student}
        
        renderItem={({ item }) => (
          <TouchableHighlight 
            keyExtractor={item => item.id}
            onPress={() => navigation.navigate('StudentShow', {
            id: item.id
          })}>
            <Item item={item} />
            
          </TouchableHighlight>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate('StudentRegister')} style={styles.btn}>
        <MaterialIcons size={25} color="#fff" name="add"/>
      </TouchableOpacity>
    </View>
  );
}
