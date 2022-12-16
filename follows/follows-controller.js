import * as followersDao from './follows-dao.js'

const FollowsController = (app) => {
    app.post('/api/follows', followUser);
    app.get('/api/follows/:followedID/followers', getFollowersByUserID);
    app.get('/api/follows/:followerID/following', getFollowingByUserID);
}

const followUser = async (req, res) => {
    const follow = req.body // Followed field comes from client
    follow.follower = req.session['currentUser']._id;
    const actualFollow = await followersDao.followUser(follow)
    res.json(actualFollow)
}

const getFollowersByUserID = async (req, res) => {
    const followedID = req.params.followedID;
    const followers = await followersDao.findFollowersByUserID(followedID);
    res.json(followers);
}

const getFollowingByUserID = async (req, res) => {
    const followerID = req.params.followerID;
    const followed = await followersDao.findFollowersByUserID(followerID);
    res.json(followed);
}

export default FollowsController;