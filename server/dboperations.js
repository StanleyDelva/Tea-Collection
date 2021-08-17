import sql from 'mssql';
import { poolPromise } from './dbconfig.js';

export const getPosts = async (req, res) => {
    
    try{
        const pool = await poolPromise;
        let posts = await pool.request().query`Select p.postKey, p.TeaType, p.TeaName, p.TeaImage, p.purchaseSite, p.Description, t.TypeName 
        From Post p Inner Join TeaType t on p.teaType = t.TeaType`;
        res.status(200).json(posts.recordsets);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addPost = async (req, res) => {
    
    let post = {...req.body};
    try{
        
        const pool = await poolPromise;
        const insertPost = await pool.request()
            .input('TeaType', sql.NChar, post.TeaType)
            .input('TeaName', sql.NVarChar, post.TeaName)
            .input('TeaImage', sql.VarChar, post.TeaImage)
            .input('purchaseSite', sql.NVarChar, post.purchaseSite)
            .input('Description', sql.NVarChar, post.Description)
            .execute('InsertPost').then(res.status(200).json({ message: 'Post created' }));
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    
    let post = {...req.body};
    console.log(post);
    
    try{
        const pool = await poolPromise;

        const updatePost = await pool.request().query`
            UPDATE Post
            SET TeaType=${post.TeaType}, 
            TeaName=${post.TeaName},
            TeaImage=${post.TeaImage},
            purchaseSite=${post.purchaseSite},
            Description=${post.Description}
            WHERE postKey=${post.postKey}`;
        res.status(200).json({ message: 'Post updated' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    
    let post = {...req.body};
    try{
        const pool = await poolPromise;
        const deletePost = await pool.request().query`DELETE from Post WHERE postKey=${post.postKey}`;
        res.status(200).json({ message: 'Post deleted' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};



