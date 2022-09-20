fetch("https://caramel-axiomatic-class.glitch.me/movies").then(resp => resp.json() ).then(data => {
    console.log(data)
})