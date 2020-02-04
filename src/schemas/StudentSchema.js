export default class StudentSchema {
    static schema = {
        name: 'Student',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true },
            name: 'string',
            birthday: 'date',
            serie: 'string',
            zip_code:  'string',
            street:    'string',
            number:    'int',
            complement:    'string',
            district:  'string',
            city:  'string',
            country:   'string',
            name_mother:   'string',
            cpf_mother:    'string',
            date_payment:  'date',
        }
    };
}