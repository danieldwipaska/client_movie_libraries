$('.search-button').on('click', function () {
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=4b910ef4&s=' + $('.input-keyword').val(),
    success: (results) => {
      console.log($('.input-keyword').val());
      const movies = results.Search;
      let cards = '';
      movies.forEach((m) => {
        cards += `<div class="col-md-4 my-5">
                      <div class="card">
                          <img class="card-img-top" src="${m.Poster}" />
                          <div class="card-body">
                              <h5 class="card-title">${m.Title} (${m.Year})</h5>
                              <a href="#" class="btn btn-primary movie-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                          </div>
                      </div>
                  </div>`;
      });

      // $('.movie-container').html(cards);
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = `${cards}`;
      // ketika tombol di klik
      $('.movie-detail-button').on('click', function () {
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=4b910ef4&i=' + $(this).data('imdbid'),
          success: (m) => {
            const movieDetails = document.querySelector('.movie-details');
            movieDetails.innerHTML = `<div class="col-md-3"><img src="${m.Poster}" class="img-fluid"></div>
            <div class="col-md-9">
              <ul class="list-group">
                <li class="list-group-item"><strong>Judul : </strong>${m.Title}</li>
                <li class="list-group-item"><strong>Tahun Tayang : </strong>${m.Year}</li>
                <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                <li class="list-group-item"><strong>Rating(IMDB) : </strong>${m.imdbRating}</li>
              </ul>
            </div>`;
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});
