import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor:'#fff'},
    header: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    }, 
    image: {
        height: 150,
        width: 120,
        borderRadius: 100,
        marginTop: 10,
        marginRight: 20,
    },
    btn_edit: {
        marginBottom: 15,
        backgroundColor: '#e68a00',
        padding: 15,
    },
    btn_delete: {
        marginTop: 15,
        backgroundColor: '#e60000',
        padding: 15,
    },
    group: {
        left: 20,
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontSize: 15,
    },
    
});

export default styles;