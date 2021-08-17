import React from 'react';
import Axios from 'axios';
import 'bulma/css/bulma.min.css';
import './post.css';


export const Post = ({ pK, TeaType, TypeName, TeaName, TeaImage, purchaseSite, Description, setActiveKey }) => {
    const API = Axios.create({ baseURL: '/' });


    const deletePost = () => {
        console.log(pK);

        API.delete(`/posts/${pK}`, {
            params: {
                id: pK
            },
            data: {
                postKey: pK
            }
        })
    }

    //Render color of tag for each post to match the type of tea 
    const renderTags  = () => {
        if(parseInt(TeaType) === 0) {
            return <button type="button" class="button is-black is-rounded is-small">{TypeName}</button>;
        }
        else if(parseInt(TeaType) === 1) {
            return <button type="button" class="button is-primary is-light is-rounded is-small">{TypeName}</button>;
        }
        else if(parseInt(TeaType) === 2) {
            return <button type="button" class="button is-light is-rounded is-small">{TypeName}</button>
        }
        else if(parseInt(TeaType) === 3) {
            return <button type="button" class="button is-warning is-light is-rounded is-small">{TypeName}</button>
        }
        else if(parseInt(TeaType) === 4) {
            return <button type="button" class="button is-warning is-rounded is-small">{TypeName}</button>
        }
        else {
            return <button type="button" class="button is-danger is-light is-rounded is-black is-small">{TypeName}</button>
        }
    }

    return (
        <div class="column has-text-centered has-background-warning-light">
                <div class="card-image">
                    <figure class="image is-square">
                        <img src={TeaImage} alt={TeaName} />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-2">{TeaName}</p>
                            {renderTags()}   
                        </div>
                    </div>

                    <div class="content">
                        <p>{Description}</p> 
                        <a href={"//" + purchaseSite}>Link</a>.
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" onClick={() => setActiveKey(pK)}>Edit</a>
                    <a href="/" class="card-footer-item" onClick={() => deletePost()}>Delete</a>
                </footer>
            </div>
    );
}