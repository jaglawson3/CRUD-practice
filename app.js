$(document).ready(function(){
      getMovieData().then(function(movieData){
            var movieList = buildMovieList(movieData);
            renderMovieList)movieList);
      }).catch(function(error){
            console.error("Could not retrieve movie data", error);
      });
      attachNewMovieHandler();
});

function buildMovieList(movieList){
      return movieData.students.map(function(movie, index){
            return convertMovieObjectToListItem(student);
      });

}

function convertMovieObjectToListItem(movie){
      var movieNameContainer = document.createElement('p');
      var movieName = document.createTextNode(movie.movie_name);
      movieNameContainer.appendChild(movieName);

      var movieReleaseYearContianer = document.createTextNode(movie.year_released);
      var movieReleaseYear = document.createTextNode(movie.year_released);
      movieReleaseYearContianer.appendChild(movieReleaseYear);

      var movieGenreContainer = document.createElement('p');
      var movieGenre = document.createTextNode(movie.genre);
      movieGenreContainer.appendChild(movieGenre);

      var movieMPAARatingContainer = document.createElement('p');
      var movieMPAARating = document.createTextNode(movie.rating_MPAA);
      movieMPAARatingContainer.appendChild(movieMPAARating);

      var movieIMDBRatingContainer = document.createElement('p');
      var movieIMDBRating = document.createTextNode(movie.rating_IMDB);
      movieIMDBRatingContainer.appendChild(movieIMDBRating);

      var movieListItem = document.createElement('li');
      movieListItem.appendChild(movieNameContainer);
      movieListItem.appendChild(movieIMDBRatingContainer);
      movieListItem.appendChild(movieGenreContainer);
      movieListItem.appendChild(movieMPAARatingContainer);
      movieListItem.appendChild(movieIMDBRatingContainer);

      return movieListItem;
}

function renderMovieList(movieList){
      $(".movie-list").append(movieList);
}

function getMovieData(){
      return new Promise(function (resolve, reject){
            $ajax({
              method: "GET",
              url: "heroku url goes here",
              success: resolve,
              error: reject
            });
      });
}

function attachNewMovieHandler(){
      $(".new-movie-form").submit(function(event){
            event.preventDefault();

            var formData = getNewMovieData($(this));
            createNewMovie(formData).then(function(newMovie){
                  addNewMovieToList(newMovie);
                  flashCreationMessage();
            }).catch(function(error){
                  console.error("Unable to add movie", error);
            });
      });
}

function getNewMovieData(form){
      var formValues = form.serializeArray();
      return formValues.reduce(function(formattedMovie, movie){
            formattedMovie[movie.name] = movie.value;
      }, {});
}

function createNewMovie(formData){
      return new Promise(function(resolve, reject){
            $.ajax({
              method: "POST",
              url: "heroku url goes here",
              data: formData,
              success: resolve,
              error: reject
            });
      });
}

function addNewMovieToList(movie){
      var movieListItem = convertMovieObjectToListItem(movie);
      $(".movie-list").append(movieListItem);
}

function flashCreationMessage(){
      $(".movie-list").fadeIn(300).delay(2000).fadeOut(300);

}
