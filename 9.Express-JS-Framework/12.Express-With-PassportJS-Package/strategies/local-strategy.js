/*
    Strategy Class Instance
    =======================
    Syntax: new Strategy(
        Strategy(
            options: IStrategyOptionsWithRequest,
            verify: VerifyFunctionWithRequest) // verify function
        : Strategy
    )

    From the above syntax,
        1. verify function:  takes (username, password, done)=>{}
        2. options: takes an option {} to tell let's say username => {userNameField: 'email'} to
        basically telling the strategy to take username value as 'email'.

*/
/* eslint-disable-next-line max-len */
/* eslint-disable prettier/prettier */
import passport from 'passport';
// importing Strategy Class
import { Strategy } from 'passport-local';

// eslint-disable-next-line import/extensions
import users from '../data/users-data.js';

// setup a serialize
passport.serializeUser((user, done) => {
    console.log('Inside serialize user');
    console.log(user);
    done(null, user.id);
});

// serializeUser() function user.id passed to deserilizeUser(id)
passport.deserializeUser((id, done) => {
    console.log('Inside deserialize user');
    console.log(`UserId: ${id}`);
    try {
        const findUser = users.usersInfo.find((user) => user.id === id);
        if (!findUser) {
            throw new Error(`User ${id} not found`);
        }
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

// without options function
export default passport.use(
    new Strategy((username, password, done) => {
        console.log(`Username: ${username}, Password: ${password}`);
        try {
            const findUser = users.usersInfo.find((user) => user.userName === username);
            if (!findUser) {
                throw new Error('User not found');
            }
            if (findUser.password !== password) {
                throw new Error('Password is not valid');
            }
            // done() with error equal is null and user = findUser
            done(null, findUser);
        } catch (error) {
            // done(error, user?:false)
            done(error, null);
        }
    }),
);

// with options function
// export default passport.use(
//     new Strategy({usernameField:'email'},(username, password, done) => {
//         console.log(`Username: ${username}, Password: ${password}`);
//         try {
//             const findUser = users.usersInfo.find((user) => user.userName === username);
//             if (!findUser) {
//                 throw new Error('User not found');
//             }
//             if (findUser.password !== password) {
//                 throw new Error('Password is not valid');
//             }
//             // done() with error equal is null and user = findUser
//             done(null, findUser);
//         } catch (error) {
//             // done(error, user?:false)
//             done(error, null);
//         }
//     }),
// );
