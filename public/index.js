fetch('/movies').then(res => res.json()).then(movies => {
    movies.forEach(movieRes => {
        var movie = JSON.parse(movieRes);
        var elem = document.createElement('div');
        elem.classList.add('grid-item');
        var h3 = document.createElement('h3');
        h3.innerText = movie["name"];
        elem.appendChild(h3);
        var img = document.createElement('img');
        img.src = movie.thumbnail;
        var icon = document.createElement('i');
        icon.classList.add('fas', 'fa-play', 'playbtn');
        elem.appendChild(icon);
        elem.appendChild(img);
        elem.addEventListener('click', () => {
            window.location.href = '/watch/' + movie.file;
        });
        document.querySelector('.grid-container').insertAdjacentElement('beforeend', elem);
    });
});