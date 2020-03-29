const express = require('express');
const router = express.Router();
// const {createUser, viewUser} = require('../app');
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
// async function viewUser() {
//     const users = await User
//         .find();
//         console.log(users);
// }

router.get('/', async (req, res) => {
    const users = await User
        .find();
        console.log(users);
        res.send(users);
    // res.sendFile('index.html', { root: __dirname });
});

router.post('/', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    createUser(firstName, lastName);

    const users = await User
        .find();
        console.log(users);
        res.send(users);
});

router.put('/:id', async (req, res) => {
    const user = User.find(user => user._id === parseInt(req.params.id));
    if(!user) return res.status(404).send('Not found');
    
    const user = await User.updateOne(id);
    console.log(user);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    // createUser(firstName, lastName);
    const result = await user.save();
    console.log(result);

    const users = await User
        .find();
        console.log(users);
        res.send(users);
});

// router.delete('/:id', async (req, res) => {
//     const user = await User.findByIdAndRemove(id);
//     console.log(user);
    
//     // const firstName = req.body.firstName;
//     // const lastName = req.body.lastName;
//     // createUser(firstName, lastName);

//     // const users = await User
//     //     .find();
//     //     console.log(users);
//     //     res.send(users);
// });

module.exports = router;