fetch("https://caramel-axiomatic-class.glitch.me/movies").then(resp => resp.json() ).then(data =>{

    console.log(data)
    const goodMovies =data.filter((movie)=>{
        return movie.title !== ''
    })
    console.log(goodMovies)

})

