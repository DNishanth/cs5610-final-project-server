import * as usersDao from './users-dao.js'

const UsersController = (app) => {
    app.post('/api/register', createUser);
    app.post('/api/login', loginUser);
    app.post('/api/logout', logoutUser);
    app.get('/api/profile', getCurrentUser);
}

const createUser = async (req, res) => {
    const user = req.body;
    const existingUser = await usersDao.findUserByUsername(user.username);
    if (existingUser) {
        res.sendStatus(403);
        return;
    }
    const newUser = await usersDao.createUser(user);
    req.session['currentUser'] = newUser;
    res.json(newUser);
}

const loginUser = async (req, res) => {
    const userCred = req.body;
    const existingUser = await usersDao.findUserByCredentials(userCred);
    if (existingUser) {
        req.session['currentUser'] = existingUser;
        res.json(existingUser)
        return;
    }
    res.sendStatus(403);
}

const logoutUser = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const getCurrentUser = async (req, res) => {
    if (req.session['currentUser']) {
        res.send(req.session['currentUser']);
    }
    else {
        res.sendStatus(403);
    }
}

export default UsersController;