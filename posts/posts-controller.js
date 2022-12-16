import * as postsDao from "./posts-dao.js";

const PostsController = (app) => {
  app.post('/api/posts', createPost);
  app.delete('/api/posts/:reviewID', deletePost);
  app.get('/api/books/:workID/posts', getPostsByWorkID);
  app.get('/api/posts/:userID/posts', getPostsByUserID);
}

const createPost = async (req, res) => {
  const post = req.body;
  const author = req.session['currentUser'];
  if (author) {
    post.author = author._id;
    const newPost = await postsDao.createPost(post);
    res.json(newPost);
  }
  else {
    res.sendStatus(403); // Must be logged in to post reviews
  }
}

const getPostsByWorkID = async (req, res) => {
  const workID = req.params.workID;
  const posts = await postsDao.findPostsByWorkID(workID);
  // console.log(reviews)
  res.json(posts);
}

const getPostsByUserID = async (req, res) => {
  const userID = req.params.userID;
  const posts = await postsDao.findPostsByUserID(userID);
  // console.log(reviews)
  res.json(posts);
}

const deletePost = async (req, res) => {
  const postID = req.params.postID;
  await postsDao.deletePost(postID);
  res.json(postID);
  // res.json({reviewID});
}

export default PostsController;