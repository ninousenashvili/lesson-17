let mainwraperpost = document.getElementById('post-block');
let overlaycontent = document.getElementById('overlay');
let closeoverlay = document.getElementById('close');
let content = document.getElementById('content');
let addbutton = document.getElementById('add-btn')
let form = document.getElementById('open-form');
let savebutton = document.getElementById('save-btn');
let closebutton = document.getElementById('x-btn');





function ajax(url, callback) {
    let request = new XMLHttpRequest;
    request.open('GET', url);
    request.addEventListener('load', function () {
        let data = JSON.parse(request.responseText);
        callback(data);


    });

    request.send();


}
ajax('https://jsonplaceholder.typicode.com/posts', function (data) {
    printData(data);
});

function printData(data) {
    data.forEach(element => {
        createpost(element);

    });
}

function createpost(item) {
    let divwrapper = document.createElement('div');
    divwrapper.classList.add('posts');
    divwrapper.setAttribute('data-id', item.id);


    let h2tag = document.createElement('h2');
    h2tag.innerText = item.id;

    let h3tag = document.createElement('h3');
    h3tag.innerText = item.title;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.setAttribute('data-id', item.id);
    divwrapper.appendChild(deleteButton);


    let view = document.createElement('button');
    view.innerText = 'View More';
    view.classList.add('view-btn');
    view.setAttribute('data-id', item.id);
    divwrapper.appendChild(view);

    divwrapper.appendChild(h2tag);
    divwrapper.appendChild(h3tag);





    view.addEventListener('click', function (event) {
        let id = event.target.getAttribute('data-id');
        openoverlay(id);
    })
    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        deletepost(id);
    })

    mainwraperpost.appendChild(divwrapper);


}

function openoverlay(id) {

    overlaycontent.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    ajax(url, function (data) {
        overlayfunction(data);

    })
}
function deletepost(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'DELETE'
    })
}


// function openoverlay(id) {

//     overlaycontent.classList.add('active');
//     let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
//     fetch(url, {
//         method: 'POST'
//     })

// }

// can't insert description part in the overlay
function overlayfunction(item) {


    let description = document.createElement('p');
    description.innerText = item.body;
    description.classList.add('descript');

    content.appendChild(description);

}

closeoverlay.addEventListener('click', function () {
    overlaycontent.classList.remove('active');
    content.innerHTML = ' ';
})



// addbutton.addEventListener('click', function () {
//     let newpost = document.querySelector(".open-form");
//     newpost.classList.add('active-add');



// })

// closebutton.addEventListener('click', function () {
//     newpost.classList.remove('active-add');
// })

// savebutton.addEventListener('submit', function (event) {
//     event.preventDefault();
//     console.log(event.target);

//     let formData = {
//         title: event.target[0].value,
//         description: event.target[1].value
//     }
// })

// newpost.addEventListener('submit', function (event) {
//     event.preventDefault();
//     console.log(event.target);

//     let formData = {
//         title: event.target[0].value,
//         description: event.target[1].value
//     }
// })

