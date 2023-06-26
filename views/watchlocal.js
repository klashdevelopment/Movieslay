module.exports=(moviefile)=>{return `<!DOCTYPE html>
<html lang="en">
<head>
<script>
    var movie = JSON.parse(window.localStorage.movies).find(m => m.file == "${moviefile}");
</script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movieslay | Browse content for free</title>
    <link rel="stylesheet" href="https://gtml.fly.dev/regular-ass-style.css">
    <link rel="stylesheet" href="/index.css">
    <link href="https://site-assets.fontawesome.com/releases/v6.3.0/css/all.css" rel="stylesheet"/>
    <meta property="og:title" content="" id="movieName">
    <meta property="og:description" content="Watch it for free, forever.">
    <meta property="og:image" content="" id="movieThumbnail">
    <meta property="og:image:alt" content="Movieslay Logo">
    <meta property="og:url" content="https://movieslay.fly.dev">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="" id="twitterMovieName">
    <meta name="twitter:description" content="Watch it for free, forever.">
    <meta name="twitter:image" class="thumb" content="" id="twitterMovieThumbnail">
    <meta name="twitter:image:alt" content="Movieslay Logo">
    <meta name="twitter:url" content="https://movieslay.fly.dev">
</head>
<body>
    <center>
        <script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js" charset="utf-8" async></script>
        <h1 class="bold">Movieslay | <span id="movieName"></span></h1>
        <img src="" style="height:20vh;" id="movieThumbnailImg">
        <div class="line"></div>
        <h4>Streaming</h4>
        <h3>PLEASE: Install <a href="https://ghostery.com"> an adblocker</a> or a adblocking browser (<a href="https://brave.com">Brave</a> or <a href="https://operagx.com">Opera</a>). DO NOT click on popups or ads</h3>
        <a>Give it some time to load. <span id="torrentInfo"></span></a><br>
        <a id="htmlEmbedContent"></a>
        <div class="streaming webtor" id="player"></div>
        <div class="line"></div>
        <h4>Downloading & Info</h4>
        <b>IMDB: </b> <span id="movieIMDB"></span> <br>
        <b>Year: </b> <span id="movieYear"></span> <br>
        <b>Download as Video: </b> <a href="" id="downloadLink">download link</a> <br>
        <script>
            var decodeEntities = (function() {
                // this prevents any overhead from creating the object each time
                var element = document.createElement('div');

                function decodeHTMLEntities (str) {
                    if (str && typeof str === 'string') {
                    // strip script/html tags
                    str = str.replace(/<script[^>]*>([\\S\\s]*?)<\\/script>/gmi, '');
                    str = str.replace(/<\\/?\\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                    element.innerHTML = str;
                    str = element.textContent;
                    element.textContent = '';
                    }

                    return str;
                }

                return decodeHTMLEntities;
            })();
        </script>
        <script>
            var movieName = document.querySelector('#movieName');
            var movieThumbnail = document.querySelector('#movieThumbnail');
            var twitterMovieName = document.querySelector('#twitterMovieName');
            var twitterMovieThumbnail = document.querySelector('#twitterMovieThumbnail');
            var movieIMDB = document.querySelector('#movieIMDB');
            var movieYear = document.querySelector('#movieYear');
            var downloadLink = document.querySelector('#downloadLink');
            var movieEmbedContent = document.querySelector('#htmlEmbedContent');

            movieName.textContent = movie.name;
            movieThumbnail.setAttribute('content', movie.thumbnail);
            movieThumbnail.setAttribute('src', movie.thumbnail);
            twitterMovieName.setAttribute('content', movie.name);
            twitterMovieThumbnail.setAttribute('content', movie.thumbnail);
            movieIMDB.textContent = movie.imdb;
            movieYear.textContent = movie.year;
            downloadLink.setAttribute('href', movie.download);

            if (movie.htmlEmbedContent.startsWith("_UT")) {
                // TORRENT
                var torrentInfo = document.querySelector('#torrentInfo');
                var torrnet = movie.torrent;
                console.log(torrnet);
                window.webtor = window.webtor || [];
                window.webtor.push({
                    id: 'player',
                    magnet: torrnet,
                    on: function(e) {
                        if (e.name == window.webtor.TORRENT_FETCHED) {
                            console.log('Torrent fetched!', e.data);
                        }
                        if (e.name == window.webtor.TORRENT_ERROR) {
                            console.log('Torrent error!');
                        }
                    },
                    poster: movie.thumbnail,
                    lang: 'en',
                    i18n: {
                        en: {
                            common: {
                                "prepare to play": "Preparing Video Stream... Please Wait...",
                            },
                            stat: {
                                "seeding": "Seeding",
                                "waiting": "Client initialization",
                                "waiting for peers": "Waiting for peers",
                                "from": "from",
                            },
                        },
                    },
                });
                torrentInfo.textContent = "It is a torrent.";
            } else {
                var x = decodeEntities(movie.htmlEmbedContent);
                movieEmbedContent.insertAdjacentHTML('beforeend', x);
            }
        </script>
    </center>
</body>
</html>
`;}