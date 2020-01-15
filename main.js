var toDoSiteButtonElement = document.querySelector('#toDoSite');
var gitHubRequestElement = document.querySelector('#gitHubRequest');
var appDivElement = document.querySelector('#app');
appDivElement.setAttribute('style','max-width: 100%;');
var toDos = JSON.parse(localStorage.getItem('toDos_list')) || [];

gitHubRequestElement.onclick = getGitHubUsersApi;
toDoSiteButtonElement.onclick = renderToDos

function getGitHubUsersApi(){
    appDivElement.innerHTML = '';
    axios.get('https://api.github.com/users/higorlopees')
        .then(function(response){
            appDivElement.appendChild(document.createTextNode(JSON.stringify(response)));
        })
        .catch(function(error){
            appDivElement.appendChild(document.createTextNode(error));
        });
}

function renderToDos(){
    appDivElement.innerHTML = '';
    var h1Element = document.createElement('h1');
    h1Element.appendChild(document.createTextNode('TO DO List'));
    var listElement = document.createElement('ul');
    var inputElement = document.createElement('input');
    inputElement.setAttribute('placeholder', 'Type a to do');
    var buttonElement = document.createElement('button');
    buttonElement.setAttribute('onclick', 'addToDo()')
    buttonElement.appendChild(document.createTextNode('Add to do'));
    
    for(toDo of toDos){
        var toDoElement = document.createElement('li');
        var toDoText = document.createTextNode(toDo);
        var linkElement = document.createElement('a');
        var linkText = document.createTextNode(' -  Delete');

        linkElement.setAttribute('href', '#');

        var pos = toDos.indexOf(toDo);

        linkElement.setAttribute('onclick', 'deleteToDo(' + pos + ')');

        linkElement.appendChild(linkText);
        toDoElement.appendChild(toDoText);
        toDoElement.appendChild(linkElement);
        listElement.appendChild(toDoElement);
    }

    appDivElement.appendChild(h1Element);
    appDivElement.appendChild(listElement);
    appDivElement.appendChild(inputElement);
    appDivElement.appendChild(buttonElement);
}

function addToDo(){
    var inputElement = document.querySelector('#app input');
    var toDoText = inputElement.value;

    toDos.push(toDoText);
    inputElement.value = '';
    renderToDos();
    saveToStorage();
}

function deleteToDo(pos){
    toDos.splice(pos, 1);
    renderToDos();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('toDos_list', JSON.stringify(toDos));
}