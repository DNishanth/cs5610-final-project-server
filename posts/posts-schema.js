import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
  workID: {type: String, required: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UsersModel'
  },
  postText: {type: String, required: true}
}, {collection: 'post'})

export default postsSchema