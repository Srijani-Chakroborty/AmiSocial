const express=require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOffollowing, updateCaption, CommentOnPost, deleteComment } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");
const router=express.Router();

router.route("/post/upload").post(isAuthenticated,createPost);

router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost).put(isAuthenticated,updateCaption).delete(isAuthenticated,deletePost);

router.route("/posts").get(isAuthenticated,getPostOffollowing);

router.route("/post/comment/:id").put(isAuthenticated,CommentOnPost).delete(isAuthenticated,deleteComment);



module.exports=router;