import {Title} from "./components/Title.js"
import api from "./helpers/wp_api.js";
import {ajax} from "./helpers/ajax.js";
import {PostCard} from "./components/PostCard.js";
import {PostTemplate} from "./components/PostTemplate.js";
import { Loader } from "./components/Loader.js";

export function App() {
    const d = document,
        $root = d.getElementById('root'),
        $posts = d.createElement('section');

    let {hash} = window.location,
        html='';
    $posts.id = "posts";
    $posts.classList.add('grid-fluid');
    
    if (!hash || hash === '#/'){
    
        $root.appendChild(Title());
        $root.appendChild($posts);
        $root.appendChild(Loader());
        
        ajax({
            url: api.POSTS,
            cbSuccess: (posts) => {
                posts.forEach(post => html += PostCard(post));
                $posts.innerHTML = html;
                d.querySelector('.loader').getElementsByClassName.display= 'none';
            } 
        })
    } else {
        $root.innerHTML = "";
        $root.appendChild(Loader());
        ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {
                $root.innerHTML = PostTemplate(post);
            } 
        })
    }
}