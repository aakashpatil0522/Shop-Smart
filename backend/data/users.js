import bcrypt from 'bcryptjs';

const users=[
    {
        name:'Admin User',
        email:"admin@email.com",
        password:bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name:'Aakash Patil',
        email:"aakash@email.com",
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false
    },
    {
        name:'Sam Patil',
        email:"sam@email.com",
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false
    }
];

export default users;