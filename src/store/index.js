import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
    data: []
}
// async function loadStudents() {
//     const students = await AsyncStorage.getItem('students');
//     let array = []
//     if(students){
//         array =students.split("+");
//         for (let index = 0; index < array.length; index++) {
//             array[index] = JSON.parse(array[index]);
//         }
//     }
    
// }

function students(state = INITIAL_STATE, action) {
    console.log("Rodou store!!!!");
    switch( action.type ){
        case 'ADD_STUDENT':
            return {...state, data: [...state.data, action.title]};
        default:
            return state; 
    }
}

const store = createStore(students);

export default store;