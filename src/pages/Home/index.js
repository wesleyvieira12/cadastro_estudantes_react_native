import React,{useState, useEffect} from 'react';
import { View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import Item from '../../components/Item';

import styles from './style';

export default function Home({navigation}) {
  const [DATA,setData] = useState([]);
  const [DATAOLD, setDataOld] = useState([])

  useEffect(()=>{
    let my_date = [
      {
        id: '1',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '2',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '3',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '4',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '5',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '6',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '7',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
      {
        id: '8',
        name: 'Wesley Vieira',
        date: '04/06/1994',
        serie: '1º',
      },
    ];
    setData(my_date);
    setDataOld(my_date);
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
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
      
        
        <TouchableOpacity onPress={() => navigation.navigate('StudentNew')} style={styles.btn}>
          <MaterialIcons size={25} color="#fff" name="add"/>
        </TouchableOpacity>
      
    </View>
  );
}
