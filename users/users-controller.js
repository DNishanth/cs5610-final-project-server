import * as usersDao from './users-dao.js'

const UsersController = (app) => {
    app.post('/api/register', createUser);
    // app.post('/api/login', loginUser);
    // app.post('/api/logout', logoutUser);
    // app.get('/api/profile', getUser);
}

const createUser = async (req, res) => {
    const user = req.body;
    const existingUser = await usersDao.findUserByUsername(user.username);
    if (existingUser) {
        res.sendStatus(403);
        return;
    }
    const newUser = await usersDao.createUser(user);
    // req.session['currentUser'] = newUser;
    res.json(newUser);
}

const loginUser = async (req, res) => {

}

const logoutUser = async (req, res) => {

}

const getUser = async (req, res) => {
    console.log("test");
}

export default UsersController;