import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 2,
    width: 350,
    height: 50,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius:5,
    fontSize:16,
    elevation:2,
  },
  list: {
    width:400,
  },
  btn: {
    bottom:30,
    right:30,
    backgroundColor:'#dd4',
    width: 60,
    height: 60,
    borderRadius:40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginLeft: 5,
    position: 'absolute'
  },
  
});

export default styles;