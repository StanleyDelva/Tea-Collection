import Axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Home } from './components/Home';
import { Posts } from './components/Posts/Posts.js';
import { PostForm } from './components/PostForm.js';

function App() {
  const API = Axios.create({ baseURL: '/' });
  const [isLoading, setIsLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(null);
  const [posts, setPosts] = useState([]);
  let tempData = null;  


  function search(activeKey, posts) {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].postKey === activeKey){
        return posts[i];
      }
    }
  }

  if(activeKey != null) {
    console.log(posts);
    tempData = search(activeKey, posts);
    
  }

  useEffect(() => {
      API.get('/posts').then(res => {
          setPosts(res.data[0]);
          setIsLoading(false);
      }).catch(err => {
          console.error(err);
      });
  }, [isLoading]);



  return (
    <Home>
      <PostForm isLoading={isLoading} setIsLoading={setIsLoading} activeKey={activeKey} setActiveKey={setActiveKey} tempData={tempData}/>
      <div class="box">
        <Posts  activeKey={activeKey} setActiveKey={setActiveKey} posts={posts} setPosts={setPosts}/>
      </div>
    </Home>
  );
}

export default App;

//activeKey: activeKey, setActiveKey: setActiveKey, posts: posts, setPosts: setPosts