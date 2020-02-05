import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, AsyncStorage } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import styles from './style';
import studentImage from '../../../assets/user_student.png';

export default function Show({ navigation }) {

  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadStudent() {
      const students = await AsyncStorage.getItem('students');
      
      if(students){
      let array = students.split("+");
        for (let index = 0; index < array.length; index++) {
          array[index] = JSON.parse(array[index]);
        }
      const res = searchStudent(array,navigation.state.params.id);
      setStudent(res[0]);
      }
    }
    loadStudent();
  }, []);

  function searchStudent(array, id) {
    return array.filter( res => res.id == id);
  }
  async function deleteStudent() {
    const students = await AsyncStorage.getItem('students');
    let array = students.split("+");
    for (let index = 0; index < array.length; index++) {
      array[index] = JSON.parse(array[index]);
    }
    const new_students = array.filter( res => res.id != navigation.state.params.id);
    let new_data = '';
    for (let index = 0; index < new_students.length; index++) {
      if(new_data == ''){
        new_data += JSON.stringify(new_students[index]);
      }else {
        new_data += "+"+JSON.stringify(new_students[index]);
      }
    }
    try{
      const response = await AsyncStorage.setItem('students', new_data);
      alert('Deletado!');
      navigation.navigate('Home');
    } catch( error ) {
      alert(error);
    }
  }
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Image style={styles.image} source={studentImage}/>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate('StudentRegister', {
          id: navigation.state.params.id
        })} style={styles.btn_edit}>
        <MaterialIcons size={25} color="#fff" name="edit"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteStudent} style={styles.btn_delete}>
          <MaterialIcons size={25} color="#fff" name="delete"/>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.text}>{student.name}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Data de Nascimento:</Text>
          <Text style={styles.text}>{student.birthday}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Série de Ingresso:</Text>
          <Text style={styles.text}>{student.serie}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>CEP:</Text>
          <Text style={styles.text}>{student.zip_code}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Rua:</Text>
          <Text style={styles.text}>{student.street}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Número:</Text>
          <Text style={styles.text}>{student.number}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Complemento:</Text>
          <Text style={styles.text}>{student.complement}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Bairro:</Text>
          <Text style={styles.text}>{student.district}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.text}>{student.country}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.text}>{student.city}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Nome da Mãe:</Text>
          <Text style={styles.text}>{student.name_mother}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>CPF da Mãe:</Text>
          <Text style={styles.text}>{student.cpf_mother}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Data preferencial para pagamento da mensalidade:</Text>
          <Text style={styles.text}>{student.date_payment}</Text>
      </View>
      
    </ScrollView>
  );
}
