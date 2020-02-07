export default function students(state = { data:[]}, action) {
  
  switch (action.type) {
    case 'ADD_STUDENT':
      //Verifica se já existe o estudante
      const student = state.data.filter( res => res.id == action.obj.id);
      if(student.length>0){
        //Busca todos os estudantes menos o que vai ser alterado 
        const new_students = state.data.filter( res => res.id != action.obj.id);
        //Retornar todos mais o novo estudante
        return {...state,data: [...new_students,action.obj]};
      }else{
        return {...state,data: [...state.data,action.obj]};
      }
    case 'DELETE_STUDENT':
        const new_data = state.data.filter( res => res.id != action.id);
        console.log("Novos dados: "+new_data);
        return {...state,data: new_data};
    default: 
      return state;
  }
}