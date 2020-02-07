export function addStudent( obj ) {
  return {
    type: 'ADD_STUDENT',
    obj
  };
}
export function deleteStudent( id ) {
  return {
    type: 'DELETE_STUDENT',
    id
  };
}