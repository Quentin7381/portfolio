let parent = document.querySelector(".info");
console.log(parent);
let insert = 
    `<ul>
        <li><a href="">A propos de moi</a></li>
        <li><a href="">Projets</a></li>
        <li><a href="">CV</a></li>
        <li><a href="">Contact</a></li>
    </ul>`;


parent.innerHtml=insert;
console.log(parent);