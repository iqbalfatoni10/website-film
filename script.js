// Untuk Menampilkan Menu Navbar Ketika Di Posisi Layar Kecil
const menuBar = document.querySelector('.menu-bar');
const menuNav = document.querySelector('.menu');

menuBar.addEventListener('click', () => {
  menuNav.classList.toggle('menu-active');
});

// Untuk Mengubah Warna Navbar Ketika Discroll
const navBar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  console.log(window.scrollY);
  const windowPosition = window.scrollY > 0;
  navBar.classList.toggle('scrolling-active', windowPosition);
  menuNav.classList.remove('menu-active');
});

// Fitur Search
$('#button-search').click(function () {
  if ($('input').val().length == 0) {
    return swal('', 'Mohon masukkan nama film terlebih dahulu', 'warning');
  }

  swal({
    title: '',
    text: 'Mencari film...',
    icon: 'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif',
    button: false,
  });

  // Untuk Menampilkan Data Film
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=edf6f88f&s=' + $('.input-keyword').val(),
    success: (film) => {
      const films = film.Search;
      let card = '';
      films.forEach((f) => {
        card += `<div class="box">
                  <img src="${f.Poster}" alt="" />
                  <h3>${f.Title}</h3>
                  <p>${f.Year}</p>
                  <button class="detail" data-toggle="modal" data-target="#filmDetailModal" data-imdbid="${f.imdbID}">Detail</button>
                </div>`;
      });
      $('.box-films').html(card);
      swal.close();

      // Untuk Menampilka Detail Film
      $('.detail').on('click', function () {
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=edf6f88f&i=' + $(this).data('imdbid'),
          success: (f) => {
            const filmDetail = `<div class="preview" data-target="m-1">
                                  <i class="fas fa-times"></i>
                                  <img src="${f.Poster}" alt="" />
                                  <h3 id="filmDetailModal">${f.Title}(${f.Year})</h3>
                                  <ul class="list-group">
                                    <li class="list-group-item"><strong>Director : </strong>${f.Director}</li>
                                    <li class="list-group-item"><strong>Actors : </strong>${f.Actors}</li>
                                    <li class="list-group-item"><strong>Writer : </strong>${f.Writer}</li>
                                    <li class="list-group-item"><strong>Plot : </strong><br />${f.Plot}</li>
                                  </ul>
                                </div>`;
            $('.detail-film').html(filmDetail);
            $('.detail-film').css('display', 'flex');
            $('.preview').addClass('active');

            $('.fa-times').on('click', function () {
              $('.detail-film').css('display', 'none');
              $('.preview').removeClass('active');
            });
          },
          error: (e) => {
            return swal('', `${e.responseText}`, 'warning');
          },
        });
      });
    },
    error: (e) => {
      return swal('', `${e.responseText}`, 'warning');
    },
  });
});
