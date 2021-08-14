import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Post } from './Post/Post.js';
import 'bulma/css/bulma.min.css';

export const Posts = ({posts, activeKey, setActiveKey}) => {
    const API = Axios.create({ baseURL: '/' });
    //const [isLoading, setIsLoading] = useState(true);
    //const [posts, setPosts] = useState([]);

    /*
    useEffect(()=>{
        API.get('/posts').then(res => {
            setPosts(res.data[0]);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
        });
    }, [isLoading]);
    */
    
    const postsMapped = posts.map(post => {
        return (
            <Post
                key = {post.postKey}
                pK = {post.postKey}
                TeaType = {post.TeaType}
                TypeName = {post.TypeName}
                TeaName = {post.TeaName}
                TeaImage = {post.TeaImage}
                purchaseSite = {post.purchaseSite}
                Description = {post.Description}
                setActiveKey={setActiveKey}
                
            />
        );
    })

    return(
        <>
                {postsMapped}
        </>
    );


};