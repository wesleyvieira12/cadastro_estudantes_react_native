import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, TouchableOpacity, Picker, ScrollView, Keyboard, AsyncStorage} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import styles from './style';

export default function New() {
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
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
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
    loadCountrys();
  },[]);

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
  
  function convertDate( date ) {
    date = new Date(date);
    let dia  = date.getDate().toString();
    let diaFormat = (dia.length == 1) ? '0'+dia : dia;
    let mes  = (date.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero
    let mesFormat = (mes.length == 1) ? '0'+mes : mes;
    let anoFormat = date.getFullYear();
    return diaFormat+"/"+mesFormat+"/"+anoFormat;
  }
  
  async function onSubmit() {
    let my_data = {
      id: Math.random().toString(),
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
  
    const old_data = await AsyncStorage.getItem('students');    

    if(validateZipCode(zip_code)) {
      alert('CEP é inválido!');
    }else if( !validateCPF(cpf_mother)) {
      alert('CPF da mãe é inválido!');
    } else {
      try{
        if(old_data){
          my_data = JSON.stringify(my_data) + "+"+ old_data; 
        } else {
          my_data = JSON.stringify(my_data);
        } 
        const response = await AsyncStorage.setItem('students', my_data);
        alert('Salvo com sucesso!');
        console.log(my_data);
      } catch( error ) {
        alert(error);
      }
    }
  }
  
  return (
    <ScrollView>
      <View style={teclado_on == false ? styles.container : styles.container_teclado}>
        <View style={styles.form_group}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            autoCorrect={false}
            value={name}
            onChangeText={setName}
            maxLength={100}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TouchableOpacity onPress={() => setShowBirthday(true)} style={styles.btn}>
            <Text style={styles.text_btn}>{birthday != null ? birthday :"Selecionar"}</Text>
          </TouchableOpacity>
          { showBirthday && <DateTimePicker
            value={birthday != null ? birthday : Date.now()}
            mode="date"
            display="default"
            style={styles.input}
            onChange={(event, date) => {let new_date = convertDate(date); setShowBirthday(false);  setBirthday(new_date)} }
           />
          }
          
        </View>
        <View style={styles.form_group }>
          <Text style={styles.label}>Série de Ingresso</Text>
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
          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            placeholder="sem digito"
            onChangeText={setZipCode}
            autoCorrect={false}
            value={zip_code}
          />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Rua</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da rua"
            autoCorrect={false}
            onChangeText={setStreet}
            value={street}
            maxLength={120}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Numero</Text>
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
          <Text style={styles.label}>Complemento</Text>
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            onChangeText={setComplement}
            autoCorrect={false}
            value={complement}
            maxLength={50}        />
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do bairro"
            onChangeText={setDistrict}
            autoCorrect={false}
            value={district}
            maxLength={100}        />
        </View>
        <View style={styles.form_group }>
          <Text style={styles.label}>Estado</Text>
          <Picker onValueChange={(itemValue, itemIndex) => setCountry(itemValue)} selectedValue={country}>
            { countrys.map( res => (
              <Picker.Item key={res.id} label={res.nome} value={res.nome} />
            ))}          
        </Picker>
        </View>
        <View style={styles.form_group}>
          <Text style={styles.label}>Cidade</Text>
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
          <Text style={styles.label}>Nome</Text>
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
          <Text style={styles.label}>CPF</Text>
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
          <Text style={styles.label}>Data preferencial para pagamento da mensalidade </Text>
          <TouchableOpacity onPress={() => setShowDatePayment(true)} style={styles.btn}>
            <Text style={styles.text_btn}>{date_payment != null ? date_payment :"Selecionar"}</Text>
          </TouchableOpacity>
          { showDatePayment && <DateTimePicker
            value={date_payment != null ? date_payment : Date.now()}
            mode="date"
            display="default"
            style={styles.input}
            onChange={(event, date) => { let new_date = convertDate(date); setShowDatePayment(false);  setDatePayment(new_date)} }
           />
          }
        </View>       
        <TouchableOpacity onPress={onSubmit} style={styles.btn}>
          <Text style={styles.text_btn}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
