

       fetch("https://caramel-axiomatic-class.glitch.me/movies").then(resp => resp.json() ).then(data =>{

    console.log(data)
    const goodMovies =data.filter((movie)=>{
        return movie.title !== ''
    })
    console.log(goodMovies)
let html = ''
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


document.getElementById("car-load").innerHTML=html
    })
})

