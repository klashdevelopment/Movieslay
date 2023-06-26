window.localStorage.movies = window.localStorage.movies || '[]';
var moviez = JSON.parse(window.localStorage.movies);

        moviez.forEach(movie => {
            var elem = document.createElement('div');
            elem.classList.add('grid-item');
            var h3 = document.createElement('h3');
            h3.innerText = movie["name"];
            var del = document.createElement('i');
            del.classList.add('fas', 'fa-trash', 'delbtn');
            del.style.float = 'right';
            del.addEventListener('click', () => {
                var index = moviez.findIndex(m => m.name == movie.name);
                moviez.splice(index, 1);
                window.localStorage.movies = JSON.stringify(moviez);
                elem.remove();
            });
            elem.appendChild(del);
            elem.appendChild(h3);
            var img = document.createElement('img');
            img.src = movie.thumbnail;
            var icon = document.createElement('i');
            icon.classList.add('fas', 'fa-play', 'playbtn');
            elem.appendChild(icon);
            elem.appendChild(img);
            img.addEventListener('click', () => {
                window.location.href = '/watchlocal/' + movie.file;
            });
            icon.addEventListener('click', () => {
                window.location.href = '/watchlocal/' + movie.file;
            });
            document
                .querySelector('.grid-container')
                .insertAdjacentElement('beforeend', elem);
        });

        // Add event listener for search input
        document.querySelector('#search').addEventListener('input', function () {
            var searchValue = this.value.toLowerCase();

            // Filter grid items based on search input
            var gridItems = document.querySelectorAll('.grid-item');
            gridItems.forEach(function (item) {
                var movieName = item.querySelector('h3').innerText.toLowerCase();
                if (movieName.includes(searchValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });