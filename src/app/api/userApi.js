
const users = [
    {
        id: 1,
        login: 'admin',
        password: 'admin',
        role: 'admin',
        token: 'token'
    }
];



export default class UserApi{
    static logInUser(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userToFind = users.filter(userInDatabase => userInDatabase.login == user.login);
                if(userToFind.length !== 0){
                    if(user.password == userToFind[0].password){
                        resolve(userToFind[0]);
                    }
                    else {
                        resolve({});
                    }
                }else {
                    resolve({});
                }
            }, 2000);
        });
    }
}