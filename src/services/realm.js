import Realm from 'realm';
import StudentSchema from '../schemas/StudentSchema';

export default function getRealm() {
    return Realm.open({
        schema: [StudentSchema],
    });
}