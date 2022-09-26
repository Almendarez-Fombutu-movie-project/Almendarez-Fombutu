(function () {
    const url = "https://occipital-erratic-idea.glitch.me/movies/"

    var favouritePane = document.querySelector("#favourite-card")
    var discoverPane = document.querySelector("#discover-card")
    var searchBtn = document.querySelector("#search-btn")
    var showAdd = document.querySelector('#add-btn')
    var showEdit = document.querySelector('#edit-btn')
    var showDelete = document.querySelector('#delete-btn')
var selectAdd = document.querySelector('#selectMenuAdd')
    var selectDelete = document.querySelector('#selectMenu2')
var selectEdit = document.querySelector('#selectMenu')
    var onload = document.querySelector('.onload')

    //onload Display
    favouritePane.innerHTML = onload.innerHTML


    //toggle to add
    showAdd.addEventListener("click",function () {
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

//**************************************** search Movie **********************************************

var title = ''
    var updateTitle =(e)=>{
        e.preventDefault()
   title =  document.querySelector("#search").value
        if (!title || title === ''){
           alert("type in a tittle")
        }else{


            async function loadMovie(){
                const resp =  await fetch(`https://www.omdbapi.com?s=${title}&plot&apikey=thewdb`)
                const data = await resp.json()
                return data
            }
            loadMovie().then(data  =>{
                console.log(data)
                movies = data.Search



                var html = ''
                var html1= ""

                movies.forEach((movie)=>{

                    html +=   `<div id="card2" class="card col gx-0">
        <img src="${movie.Poster}" class=" card-img-top img" alt="...">
            <div class="card-header"> Title: ${movie.Title}</div>
            <div class="card-body ">
                <p class="card-text ">Director: ${movie.Year}</p>
                <p class="card-text ">Type: ${movie.Type}</p>
               

            </div>
    </div>`
                    html1 += `<option value=${movie.imdbID}>${movie.Title}</option>`


                })
                discoverPane.innerHTML=html
                selectAdd.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html1}
   `

                //************************************** Add to Favourite *******************************************************

                let AddOptions = (insert) => {
                    fetch(url, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json',},
                        body: JSON.stringify(insert),
                    })
                }

                const AddMovie = async(newTitle) => {
                    const res = await fetch(`https://www.omdbapi.com?i=${newTitle}&apikey=thewdb`);
                    const data = await res.json()
                    return data
                }



                selectAdd.addEventListener("change", function () {

                    let selected = selectAdd.value
                    console.log("hello: " + selected);


                    $("#addMovieForm").on("submit", async function (e) {
                        e.preventDefault()


                        //Add request
                     const movie =  await AddMovie(selected)
                       await AddOptions(movie)

                    })
                });




            })
                .catch(err=>console.log(err))


        }

    }

    //***************************************************Call function that sear movie *******************************************************************

    var searchForm =  document.querySelector('#searchForm')
        searchForm.addEventListener("submit", updateTitle)



    //***********************************Favourite Movie (glitch server) ***********************************************

    async function myMovie(){
        const resp =  await fetch(url)
        const data = await resp.json()
        return data
    }

    myMovie().then(data  =>{
        console.log(data)
        movies = data
        var html = ''
      var  html2 = ''
        movies.forEach((movie)=>{

            html +=   `<div id="card2" class="card col gx-0">
        <img src="${movie.Poster}" class=" card-img-top img" alt="...">
            <div class="card-header"> Title: ${movie.Title}</div>
            <div class="card-body ">
                <p class="card-text ">Director: ${movie.Director}</p>
                <p class="card-text ">Genre: ${movie.Genre}</p>
                <p class="card-text ">Rating: ${movie.imdbRating}</p>

            </div>
    </div>`
         html2 +=   `<option value=${movie.id}>${movie.Title}</option>`
        })
        favouritePane.innerHTML=html
selectDelete.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html2}  `
        selectEdit.innerHTML = ` <option value='-1' selected>Select a movie</option> ${html2}  `


        //************************************Delete Movie**************************************************

        //delete movie

        let deleteOptions = (id) => {
            fetch(`${url}${id}`, {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        selectDelete.addEventListener("change", function () {

            let inputVal = selectDelete.value;
            console.log("hello: " + inputVal);


            $("#delete-movie").on("click", function (e) {
                e.preventDefault()

                //DELETE request
                deleteOptions(inputVal)

            })

        });








        //*************************************  Edit Movie  ****************************************************

        //when the option selected is changed, update the input fields
        $(selectEdit).on("change", function () {
            let target = $(this).val()
            console.log(target);

            //grab info from the json file and populate the input fields
            for (let movie of movies) {
                if (movie.id === target) {
                    $("#newTitle").val(movie.Title);
                    $("#newGenre").val(movie.Genre);
                    $("#newRating").val(movie.imdbRating);
                    $("#newDirector").val(movie.Director);

                }
            }

            //Edit selected movie
            $("#changeMovie").on("click", function (e) {
                e.preventDefault()
                let input = $("#selectMenu").val()
                let insert = {
                    Title: $("#newTitle").val(),
                    Genre: $("#newGenre").val(),
                    imdbRating: $("#newRating").val(),
                    Director: $("#newDirector").val(),

                }
                let patchOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(insert)
                }

                //PATCH request
                fetch(`${url}${input}`, patchOptions)
                    .then().catch(error => console.log(error))

            });


        })






    })



}())

