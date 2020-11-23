// const {Schema, model} = require('mssql');

// const schema = Schema({
//     email: {type: String, require: true, unique: true},
//     password: {type: String, require: true}
// });

// module.exports = model('User', schems);


class User{
    constructor(email, password){
        this.Email = email;
        this.Password = password;
        this.ID = 0;
        this.DateCreated = new Date();
    }
}

module.exports = User;