console.log('Working...');
fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) =>{
        console.log(data);
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit',(event) =>{
    event.preventDefault(); // prevent browser to refresh the browser for each search
    const location = search.value;
    console.log(location);
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})