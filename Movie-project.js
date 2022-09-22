

const url = "https://caramel-axiomatic-class.glitch.me/movies"
    var onload = document.querySelector('.onload')
    var mainCards = document.getElementById("card-load")
    var select2 = document.getElementById("selectMenu2")
    var select1 = document.getElementById("selectMenu")
    var showAdd = document.querySelector('#add-btn')
    var showEdit = document.querySelector('#edit-btn')
    var showDelete = document.querySelector('#delete-btn')
var select2 =  document.querySelector('#selectMenu2')

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


    fetch(url).then(resp => resp.json()).then(data => {

        console.log(data)
        const goodMovies = data.filter((movie) => {
            return movie.title !== ''
        })
        console.log(goodMovies)
        let html = ''
        let html2 = ''
        goodMovies.forEach((item) => {
            html += `<div id="card1" class="card col">
                <img src="..." class="card-img-top" alt="...">
                    <div class="card-header">Movie Title: ${item.title}</div>
                    <div class="card-body ">
                        <p class="card-text ">Director: ${item.director}</p>
                        <p class="card-text ">Genre: ${item.genre}</p>
                        <p class="card-text ">Rating: ${item.rating}</p>
                       
                      
                    </div>
            </div>`
            html2 += `<option value=${item.id}>${item.title}</option>`

            mainCards.innerHTML = html
            select1.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html2}  `
            select2.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html2}   `
        })

        //when the option selected is changed, update the input fields
       $(select1).change(function () {
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
            $("#changeMovie").click(function(){
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
                var url2 =  "https://caramel-axiomatic-class.glitch.me/movies/"
                //PATCH request
                fetch(`${url2}/${input}`, patchOptions)
                    .then();
            });

           //delete movie

           let deleteOptions = (id) => {
               fetch(`${url}/${id}`, {
                   method: "delete",
                   headers: {
                       'Content-Type': 'application/json'
                   }
               })
           }
deleteOptions()

           $(select2).change(function()  {
                let inputVal = $(this).val();
                console.log("hello: " + inputVal);

                $("#delete-movie").click(function() {

                    //DELETE request
                    deleteOptions(inputVal)
                    console.log(goodMovies)
                });
            });


            //create a new movie
            $('#newMovie').click((e) => {
                e.preventDefault();
                var addMovie = {
                    title: $("#title").val(),
                     genre: $("#genre").val(),
                    rating: $("#rating").val(),
                    director: $("#director").val(),

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

    })

