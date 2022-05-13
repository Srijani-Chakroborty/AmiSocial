import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import User from '../User/User'
import "./Home.css"
import {useAlert} from "react-alert"

const Home=()=> {
    const dispatch=useDispatch();
    const alert=useAlert();

    const{loading,posts,error}=useSelector((state)=>state.postOfFollowing);
    const {user,loading:usersLoading}=useSelector((state)=>state.user);
    const {error:likeError,message}=useSelector((state)=>state.like);
    useEffect(()=>{
        dispatch(getFollowingPosts());
    },[dispatch]);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }
        if(likeError){
            alert.error(likeError);
            dispatch({type:"clearErrors"});
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"});
        }
    },[alert,error,message,likeError,dispatch]);
  return (
   loading===true||usersLoading===true?<Loader/>:(
    <div className='home'>
    <div className="homeleft">
        {
            posts && posts.length>0?posts.map((post)=>(
                <Post key={post._id} postId={post._id} caption={post.caption} postImage={post.image.url} postDate={post.createdAt} likes={post.likes} comments={post.comments} ownerImage={post.owner.avatar.url} ownerName={post.owner.name} ownerId={post.owner._id}/>
            )):<Typography variant='h6'>No posts yet</Typography>
        }
    </div>
    <div className="homeright">
    <Typography variant='h6'>My Followings</Typography>
       {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
        />
       ))):<Typography>You are not following anyone!</Typography>}
    </div>   
</div>
   )
  );
};

export default Home