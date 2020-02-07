import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import styles from './style';
import studentImage from '../../../assets/user_student.png';

import { useSelector } from 'react-redux';


export default function Show({ navigation }) {

  const student = useSelector(state => state.data.filter( res => res.id == navigation.state.params.id));
  
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
        
        </View>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.text}>{student[0].name}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Data de Nascimento:</Text>
          <Text style={styles.text}>{student[0].birthday}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Série de Ingresso:</Text>
          <Text style={styles.text}>{student[0].serie}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>CEP:</Text>
          <Text style={styles.text}>{student[0].zip_code}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Rua:</Text>
          <Text style={styles.text}>{student[0].street}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Número:</Text>
          <Text style={styles.text}>{student[0].number}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Complemento:</Text>
          <Text style={styles.text}>{student[0].complement}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Bairro:</Text>
          <Text style={styles.text}>{student[0].district}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.text}>{student[0].country}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.text}>{student[0].city}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Nome da Mãe:</Text>
          <Text style={styles.text}>{student[0].name_mother}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>CPF da Mãe:</Text>
          <Text style={styles.text}>{student[0].cpf_mother}</Text>
      </View>
      <View style={styles.group}>
          <Text style={styles.label}>Data preferencial para pagamento da mensalidade:</Text>
          <Text style={styles.text}>{student[0].date_payment}</Text>
      </View>
      
    </ScrollView>
  );
}
