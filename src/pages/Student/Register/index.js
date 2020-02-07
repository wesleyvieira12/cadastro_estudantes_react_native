import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, TouchableOpacity, Picker, ScrollView, Keyboard} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import * as ActionsStudent from '../../../store/actions/students';
import styles from './style';

export default function StudentRegister({navigation}) {
  const student = useSelector(state => state.data.filter( res => {
    if(typeof navigation.state.params !== "undefined"){
      return res.id == navigation.state.params.id;
    }
    return false;
  }));
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday]= useState(null);
  const [serie, setSerie] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [name_mother, setNameMother] = useState('');
  const [cpf_mother, setCpfMother] = useState('');
  const [date_payment, setDatePayment] = useState(null);  
  const [teclado_on, setTecladoOn] = useState(false);
  const [countrys, setCountrys] = useState([]);
  const [showBirthday, setShowBirthday] = useState(false);
  const [showDatePayment, setShowDatePayment] = useState(false);

  useEffect(()=> {
    loadStudent();
  },[]);
  useEffect(()=> {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  },[]);
  useEffect(()=> {  
    loadCountrys();
  },[]);
  async function loadCountrys(){    
    const result = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then(function (response) {  
      const new_data = response.data.sort( (a,b) => {
        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
      }); 
      setCountrys(new_data);
    })
    .catch(function (error) {
      return "erro";
    });
  }
  async function loadStudent() {
    if(student.length >0){
     setId(student[0].id);
     setName(student[0].name);
     setBirthday(student[0].birthday);
     setSerie(student[0].serie);
     setZipCode(student[0].zip_code);
     setStreet(student[0].street);
     setNumber(student[0].number);
     setComplement(student[0].complement);
     setDistrict(student[0].district);
     setCity(student[0].city);
     setCountry(student[0].country);
     setNameMother(student[0].name_mother);
     setCpfMother(student[0].cpf_mother);
     setDatePayment(student[0].date_payment);
    }
  }
  
  function _keyboardDidShow() {
    setTecladoOn(true);
  }

  function _keyboardDidHide() {
    setTecladoOn(false);
  }
  
  function validateZipCode( text ) {
    let ok = false;

    const result = axios.get(`https://viacep.com.br/ws/${text}/json/`)
                    .then(res => ok = true)
                    .catch(error =>  ok = false);
    return ok;
  }
  
  function validateCPF( cpf ) {
    var soma;
    var resto;
    soma = 0;
    if (cpf == "00000000000") return false;
      
    for (let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)) ) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
  }
  function isNotEmpty( array ) {
    const new_array = array.filter( res => (res == '' || res == null));
    return new_array.length<=0;
  }

  function compareDates(date) {
    let parts = date.split('/') // separa a data pelo caracter '/'
    let today = new Date()      // pega a data atual
    
    date = new Date(parts[2], parts[1] - 1, parts[0]) // formata 'date'
    // compara se a data informada é maior que a data atual
    // e retorna true ou false
    return date >= today;
  }

  async function onSubmit() {
    
    let my_data = {
      id: id != '' ? id : (Math.random()*10).toString(),
      name,
      birthday,
      serie,
      zip_code,
      street,
      number,
      complement,
      district,
      city,
      country,
      name_mother,
      cpf_mother,
      date_payment,
    };
    if(isNotEmpty([
      name,
      birthday,
      serie,
      zip_code,
      street,
      number,
      district,
      city,
      country,
      name_mother,
      cpf_mother,
      date_payment
    ])){
      if(validateZipCode(zip_code)) {
        alert('CEP é inválido!');
      }else if(!compareDates(date_payment) ) {
        alert('Data de Pagamento está incorreta!');
      }else if( !Number.isInteger(number)) {
        alert('O numero da casa está incorreto');
      }else if( !validateCPF(cpf_mother)) {
        alert('CPF da mãe é inválido!');
      } else {
        dispatch(ActionsStudent.addStudent(my_data));
        alert('Salvo com sucesso!');
      }
    }else{
      alert("Preencha todos os campos obrigatórios!");
    }
    
  }
  
  return (
    <ScrollView>
      <View style={teclado_on == false ? styles.container : styles.container_teclado}>
        <View style={styles.form_group}>
          <Text style={styles.label}>Nome*</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            maxLength={100}
                    />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Data de Nascimento*</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={birthday}
            placeholder="dd/mm/yyyy"
            onChangeText={text => {setBirthday(text)}}
          />
          
        </View>
        <View style={styles.form_group }>
          <Text style={styles.label}>Série de Ingresso*</Text>
          <Picker onValueChange={(itemValue, itemIndex) => {setSerie(itemValue)}} selectedValue={serie}>
          <Picker.Item label="1º Série" value="1º" />
          <Picker.Item label="2º Série" value="1º" />
          <Picker.Item label="3º Série" value="3º" />
          <Picker.Item label="4º Série" value="4º" />
          <Picker.Item label="5º Série" value="5º" />
          <Picker.Item label="6º Série" value="6º" />
          <Picker.Item label="7º Série" value="7º" />
          <Picker.Item label="8º Série" value="8º" />
          <Picker.Item label="9º Série" value="9º" />
        </Picker>
        </View>
        <Text style={styles.top_label}>Endereço</Text>
        <View style={styles.form_group}>
          <Text style={styles.label}>CEP*</Text>
          <TextInput
            style={styles.input}
            placeholder="sem digito"
            onChangeText={setZipCode}
            autoCorrect={false}
            value={zip_code}
          />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Rua*</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da rua"
            autoCorrect={false}
            onChangeText={setStreet}
            value={street}
            maxLength={120}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Numero*</Text>
          <TextInput
            style={styles.input}
            placeholder="Numero da casa"
            autoCorrect={false}
            onChangeText={setNumber}
            value={number}
            keyboardType="numeric"
            maxLength={100}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Complemento (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            onChangeText={setComplement}
            autoCorrect={false}
            value={complement}
            maxLength={50}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Bairro*</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do bairro"
            onChangeText={setDistrict}
            autoCorrect={false}
            value={district}
            maxLength={100}        />
        </View>
        <View style={styles.form_group }>
          <Text style={styles.label}>Estado*</Text>
          <Picker onValueChange={(itemValue, itemIndex) => setCountry(itemValue)} selectedValue={country}>
            { countrys.map( res => (
              <Picker.Item key={res.id} label={res.nome} value={res.nome} />
            ))}          
        </Picker>
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Cidade*</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da cidade"
            autoCorrect={false}
            onChangeText={setCity}
            value={city}
            maxLength={50}        />
        </View>
        <Text style={styles.top_label}>Dados da mãe</Text>
        <View style={styles.form_group}>
          <Text style={styles.label}>Nome*</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da mãe"
            autoCorrect={false}
            onChangeText={setNameMother}
            value={name_mother}
            maxLength={100}
          />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>CPF*</Text>
          <TextInput
            style={styles.input}
            placeholder="somente numero"
            autoCorrect={false}
            keyboardType="numeric"
            value={cpf_mother}
            onChangeText={setCpfMother}
            maxLength={11}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Data preferencial para pagamento da mensalidade*</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={date_payment}
            placeholder="dd/mm/yyyy"
            onChangeText={text => {setDatePayment(text)}}
          />
        </View>       
        <TouchableOpacity onPress={onSubmit} style={styles.btn}>
          <Text style={styles.text_btn}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
