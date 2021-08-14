import React, { useState, useEffect } from 'react';
import Axios from 'axios';


export const PostForm = ({ isLoading, setIsLoading, activeKey, setActiveKey, tempData}) => {
    const API = Axios.create({ baseURL: '/' });
    const [postData, setPostData] = useState({ TeaName: "", TeaType: null, TeaImage: "", purchaseSite: "", Description: "" });
    //In order to stop infinite re-rendering, use tempKey state to keep track of activeKey and update post with such key.
    const [tempKey,setTempKey] = useState({key: null});
    console.log(tempKey.key);


    //store activeKey in tempKey.key, set tempData elements to postData,then reset activeKey. Prevents infinite re-renders.
    if(activeKey != null) {
        tempKey.key = activeKey;
        console.log("updating post data...");
        postData.TeaName = tempData.TeaName;
        postData.TeaType = tempData.TeaType;
        postData.TeaImage = tempData.TeaImage;
        postData.purchaseSite = tempData.purchaseSite;
        postData.Description = tempData.Description;

        setActiveKey(null);
    }

    //convert image to base64 and set to postData
    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setPostData({ ...postData, TeaImage: reader.result});
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }


     //clear out form after submit or Cancel
    const clear = () => {
        setTempKey({ key: null});
        setPostData({ TeaName: "", TeaType: null, TeaImage: "", purchaseSite: "", Description: ""});
        setIsLoading(true);
    };

    //Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //Bare-minimum form validation
        if (postData.TeaName === null || postData.TeaType === null || postData.purchaseSite === null){
            alert("Every post requires the tea name, tea type, and a link to the site of purchase.");
        }
        
        //if tempKey.key is null (there was no activeKey), create a new post
        if(tempKey.key === null) {
            let data = {
                TeaName: postData.TeaName, 
                TeaType: postData.TeaType, 
                TeaImage: postData.TeaImage,
                purchaseSite: postData.purchaseSite, 
                Description: postData.Description
            }
            //Post data to SQL Server
            API.post('/posts',data).then(setIsLoading(true)).catch(function (error) {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                }
            })
            clear();
        }
        
        

        //If there is a tempKey (there was an activeKey), edit post and send patch request
        else{

            let data = {
                postKey: tempKey.key,
                TeaName: postData.TeaName, 
                TeaType: postData.TeaType, 
                TeaImage: postData.TeaImage,
                purchaseSite: postData.purchaseSite, 
                Description: postData.Description
            }

            console.log(tempKey.key);
            console.log(data);
            Axios.patch(`/posts/${tempKey.key}`, data).then(res =>{
                console.log(res);
                clear();
            }).catch(function (error) {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                }
            })
        
        }
    };
    
    return (
            <div class="box has-background-warning-light">
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div class="field">
                        <label class="label">{tempKey.key != null ? "Edit Post" : "Create a Post"}</label>
                        <p class="control has-icons-left">
                            <input class="input" type="text" value={postData.TeaName} onChange={(e) => setPostData({ ...postData, TeaName: e.target.value})} placeholder="Name of Tea..."  />
                            <span class="icon is-small is-left">
                                <i class="fas fa-asterisk"></i>
                            </span>
                        </p>
                    </div>
                    
                    <div class="field is-grouped-centered">
                        <div class="buttons are-small are-outlined">
                            <button type="button" class="button is-black is-rounded is-small" onClick={(e) => setPostData({ ...postData, TeaType: 0})}>Black Tea</button>
                            <button type="button" class="button is-primary is-light is-rounded is-small" onClick={(e) => setPostData({ ...postData, TeaType: 1})}>Green Tea</button>
                            <button type="button" class="button is-rounded is-light is-small" onClick={(e) => setPostData({ ...postData, TeaType: 2})}>White Tea</button>
                            <button type="button" class="button is-warning is-light is-rounded is-small" onClick={(e) => setPostData({ ...postData, TeaType: 3})}>Oolong Tea</button>
                            <button type="button" class="button is-warning is-rounded is-small" onClick={(e) => setPostData({ ...postData, TeaType: 4})}>Pu'erh Tea</button>
                            <button type="button" class="button is-danger is-light is-rounded is-small" onClick={(e) => setPostData({ ...postData, TeaType: 5})}>Herbal Tea</button>
                        </div>
                    </div>
                    <div class="field">
                        <div class="file is-small">
                            <label class="file-label">
                                <input class="file-input" type="file" name="pic"  onChange={(e) => getBase64(e.target.files[0]) }/>
                                <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input is-link" type="text" value={postData.purchaseSite} onChange={(e) => setPostData({ ...postData, purchaseSite: e.target.value})} placeholder="Link to site of purchase"/>
                            <span class="icon is-small is-left">
                                <i class="fas fa-link"></i>
                            </span>
                        </p>
                    </div>

                    <div class="field">
                        <textarea class="textarea"  value={postData.Description} onChange={(e) => setPostData({ ...postData, Description: e.target.value})} placeholder="Notes"></textarea>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link is-small">Submit</button>
                        </div>
                        <div class="control">
                            <button type="button" class="button is-link is-light is-small" onClick={clear}>Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
    );
};

