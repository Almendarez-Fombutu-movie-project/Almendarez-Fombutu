(function () {


    const url = "https://occipital-erratic-idea.glitch.me/movies/"
    var onload = document.querySelector('.onload')
    var mainCards = document.getElementById("card-load")
    var select1 = document.getElementById("selectMenu")
    var showAdd = document.querySelector('#add-btn')
    var showEdit = document.querySelector('#edit-btn')
    var showDelete = document.querySelector('#delete-btn')
    var select2 = document.querySelector('#selectMenu2')

    //onload Display
    mainCards.innerHTML = onload.innerHTML

    //toggle to add
    showAdd.addEventListener("click", function () {
        $("#add").toggleClass("hidden1")
    })

    //toggle to Edit
    showEdit.addEventListener("click", function () {
        $("#edit").toggleClass("hidden2")
    })

    //toggle to delete
    showDelete.addEventListener("click", function () {
        $("#delete").toggleClass("hidden3")
    })
    fetch(url2).then(resp => resp.json()).then(data => {
        console.log(data)
    })

    fetch(url).then(resp => resp.json()).then(data => {

        console.log(data)
        const goodMovies = data


        console.log(goodMovies)
        let html = ''
        let html2 = ''
        let html3 = ''
        goodMovies.forEach((item) => {
            html += `<div id="card1" class="card col gx-0">
                <img src="${item.Poster}" class=" card-img-top img" alt="...">
                    <div class="card-header">Movie Title: ${item.Title}</div>
                    <div class="card-body ">
                        <p class="card-text ">Director: ${item.director}</p>
                        <p class="card-text ">Genre: ${item.genre}</p>
                        <p class="card-text ">Rating: ${item.rating}</p>
                       
                      
                    </div>
            </div>`
            html2 += `<option value=${item.id}>${item.title}</option>`

html3 += `<option value=${item.id}>${item.Title}</option>`

            html3 += `<option value=${item.id}>${item.title}</option>`
            mainCards.innerHTML = html
            select1.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html2}  `
            select2.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html3}   `
        })


        //delete movie

        let deleteOptions = (id) => {
            fetch(`${url}${id}`, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        select2.addEventListener("change", function () {

            let inputVal = select2.value;
            console.log("hello: " + inputVal);


            $("#delete-movie").on("click", function (e) {
                e.preventDefault()

                //DELETE request
                deleteOptions(inputVal)
                console.log(goodMovies)
            })
        });


        //when the option selected is changed, update the input fields
        $(select1).on("change", function () {
            let target = $(this).val()
            console.log(target);

            //grab info from the json file and populate the input fields
            for (let movie of goodMovies) {
                if (movie.id === target) {
                    $("#newTitle").val(movie.title);
                    $("#newGenre").val(movie.genre);
                    $("#newRating").val(movie.rating);
                    $("#newDirector").val(movie.director);

                }
            }
            //Edit selected movie
            $("#changeMovie").on("click", function (e) {
                e.preventDefault()
                let input = $("#selectMenu").val()
                let insert = {
                    title: $("#newTitle").val(),
                    genre: $("#newGenre").val(),
                    rating: $("#newRating").val(),
                    director: $("#newDirector").val(),

                }
                let patchOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(insert)
                }
                var url2 = "https://caramel-axiomatic-class.glitch.me/movies/"
                //PATCH request
                fetch(`${url2}${input}`, patchOptions)
                    .then().catch(error => console.log(error))

            });


            //create a new movie
            $('#newMovie').on("click", (e) => {
                e.preventDefault();
                var addMovie = {
                    title: $("#title").val(),

                }

                let postOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addMovie)
                }
                //POST movie
                fetch(url, postOptions)
                    .then(resp => resp.json())
                    .then().catch(error => console.log(error))

            });

        })
        var newMovie = {
            "Title": "Clueless",
            "Year": "1995",
            "imdbID": "tt0112697",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMzBmOGQ0NWItOTZjZC00ZDAxLTgyOTEtODJiYWQ2YWNiYWVjXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg"
        }
        const addAMovie = (movie) => {
            fetch("https://occipital-erratic-idea.glitch.me/movies/", {
                method: "POST", headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(movie),
            })
        }
        const APIMovie = async(title) => {
            const res = await fetch(`https://www.omdbapi.com?s=${title}&apikey=thewdb`);
            const data = await res.json()
            return data.Search[0]
        }
        const movieForm = document.querySelector("#addMovieForm")
        movieForm.addEventListener("submit", async (e)=>{
            e.preventDefault()
            const input = document.querySelector("#title")
           const movie = await APIMovie(input.value)
            await addAMovie(movie)
            input.value = ""
        })

    })

}())