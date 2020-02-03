import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container_teclado: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: Math.round(Dimensions.get('window').height)*0.5
  },
  form_group: {
    margin: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
  },
  top_label: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 20
  },
  label: {
    margin: 5,
    fontWeight: 'bold'
  },
  input: {
    padding: 5,
  },
  btn: {
    marginHorizontal:10,
    height: 40,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_btn: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default styles;