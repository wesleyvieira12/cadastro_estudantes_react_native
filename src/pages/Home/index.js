import React,{useState, useEffect} from 'react';
import { View, FlatList, TouchableOpacity, TextInput, AsyncStorage, TouchableHighlight} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import Item from '../../components/Item';

import styles from './style';

export default function Home({navigation}) {
  const [DATA,setData] = useState([]);
  const [DATAOLD, setDataOld] = useState([])

  useEffect(()=>{
    async function loadStudents() {
      const students = await AsyncStorage.getItem('students');
      
      let array =students.split("+");
      let my_date = [];
      for (let index = 0; index < array.length; index++) {
        array[index] = JSON.parse(array[index]);
      }
      setData(array);
      setDataOld(array);
    }
    loadStudents();
  },[]);
  
  
  function searchStudent( text ) {
    const newData = DATAOLD.filter( res => res.name.indexOf(text) >= 0);
    setData(newData);
  }

  return (
    <View style={styles.container}>
      <TextInput
          placeholder="Digite o nome do estudante"
          placeholderTextColor="#999"
          autoCorrect={false}
          style={styles.input}
          onChangeText={searchStudent}
        />
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => {
          <TouchableHighlight onPress={() => navigation.navigate('StudentShow', {
            id: item.id
          })}>
            <Item item={item} />
          </TouchableHighlight>
        }}
        keyExtractor={item => item.id}
      />
      
        
        <TouchableOpacity onPress={() => navigation.navigate('StudentNew')} style={styles.btn}>
          <MaterialIcons size={25} color="#fff" name="add"/>
        </TouchableOpacity>
      
    </View>
  );
}
