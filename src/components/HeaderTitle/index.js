import React from 'react';
import studentImage from '../../assets/user_student.png';
import { Image, Text, View, StyleSheet } from 'react-native';

export default function HeaderTitle() {
    return (
    <View style={styles.container}>
        <Image style={styles.image} source={studentImage}/>
        <Text style={styles.text}>Lista de estudantes</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image: {
        height: 40, 
        width: 40,
        alignItems:'center', 
        justifyContent: 'center'
    },
    text: {
        fontSize:20, 
        marginTop:10,
    }
});