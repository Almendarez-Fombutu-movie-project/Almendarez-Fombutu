
var showAdd = document.querySelector('#add-btn')
var showEdit = document.querySelector('#edit-btn')
var showDelete = document.querySelector('#delete-btn')

showAdd.addEventListener("click", function (){
    $("#add").toggleClass(".hidden1")
})






       fetch("https://caramel-axiomatic-class.glitch.me/movies").then(resp => resp.json() ).then(data =>{

    console.log(data)
    const goodMovies =data.filter((movie)=>{
        return movie.title !== ''
    })
    console.log(goodMovies)
let html = ''
           let html2 = ''
    goodMovies.forEach((item)=>{
html += `<div id="card1" class="card col">
    <img src="..." class="card-img-top" alt="...">
        <div class="card-header">Movie Title: ${item.title}</div>
        <div class="card-body ">
            <p class="card-text ">Director: ${item.director}</p>
            <p class="card-text ">Genre: ${item.genre}</p>
            <p class="card-text ">Rating: ${item.rating}</p>
           
          
        </div>
</div>`
        html2 +=   `<option value=${item.id}>${item.title}</option>`

document.getElementById("card-load").innerHTML=html
        document.getElementById("selectMenu2").innerHTML=html2

    })
})

