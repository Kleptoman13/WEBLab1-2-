const $list = document.querySelector('.list');
const $field = document.querySelector('.input-searcher');
const $count = document.querySelector('.count-container')

let list = null;   
let testList = null; 

if (!!getLS('list')){
    list = getLS('list');
    listGenerator(list);
}

function listGenerator(list)
{
    let template = '';
    if (list.length){
        for (let i = 0; i < list.length; i++) {
            template += '<div class="user"><div class="info"><div class="img-pok-container"><img src="'+ list[i].image +'" alt="#" class="img-pok"></div><div class="container-name"><p class="name">'+ list[i].name +'</p></div><p class="url">'+ list[i].url +'/p></div><div class="container-btn"><input type="button" index="'+ i +'" value="Delete" class="btn"></div></div>'
        }
    }
    else{
        template += '<div><h1 class"error">Not found</h1></div>';
    }
    $list.innerHTML = template;
    $count.innerHTML = '<p class="count">'+ list.length +' pokemons</p>';
    // setLS('list', list);

    const $btnDelete = document.querySelectorAll('.btn');
    for (let i = 0; i < $btnDelete.length; i++) {
        $btnDelete[i].addEventListener('click', function() {
            deleteUser(list[i].name, list);
        })
    }
};

// fetch('https://pokeapi.co/api/v2/pokemon')
//  .then((resp) => resp.json())
//  .then(function(data){
//     list = data.results;
//     for (let i = 0; i < list.length; i++) {
        
//         fetch('https://pokeapi.co/api/v2/pokemon/'+ list[i].name)
//         .then((resp) => resp.json())
//         .then(function(data){
//             list[i].image = data.sprites.front_default;
//             listGenerator(list); 
//         });
//     } 
//  });

function setLS(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function getLS(key) {
    return JSON.parse(localStorage.getItem(key));
}

$field.addEventListener('input', function() {
    list = getLS('list');
    let query = this.value.toLowerCase();
    let filterdList = list.filter(function (el) {
        return ~el.name.toLowerCase().indexOf(query);
    });

    listGenerator(filterdList);
})

function deleteUser(namePok, list){

    let templateList = getLS('list');
    templateList = templateList.filter(obj => obj.name !== namePok)
    list = list.filter(obj => obj.name !== namePok)
    setLS('list', templateList);
    listGenerator(list);
}



