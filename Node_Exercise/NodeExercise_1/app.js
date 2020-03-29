const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dynamicTable')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDb', err));

const dataSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', dataSchema);

async function createUser(firstName, lastName) {
    const user = new User({
        firstName: firstName,
        lastName: lastName
    });
    const result = await user.save();
    console.log(result);
}
viewUser()
async function viewUser() {
    const users = await User
        .find();
        // console.log(users);
        
    
    //     res.send('hy')

    // fetch('http://localhost:3000/')
    // .then(res => res.json())
    // .then(data => console.log(data));
}

module.exports.createUser = createUser;
module.exports.viewUser = viewUser;