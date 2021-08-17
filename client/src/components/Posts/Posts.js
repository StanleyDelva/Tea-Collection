import React from 'react';
import { Post } from './Post/Post.js';
import 'bulma/css/bulma.min.css';

export const Posts = ({posts, activeKey, setActiveKey}) => {
    
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