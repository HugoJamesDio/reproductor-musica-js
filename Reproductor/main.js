const songList = [
    {
        title: "Rainbow in the Dark",
        file: "rainbow-in-the-dark.mp3",
        cover: "dio.jpg"
    },
    {
        title: "Holy Diver",
        file: "holy-diver.mp3",
        cover: "dio2.jpeg"
    },
    {
        title: "Master of Puppets",
        file: "master-of-puppets.mp3",
        cover: "metallica.jpg"
    }
]


// Capturar elementos del DOM
// Mostrar listado de canciones (¿qué elementos del DOM necesito para esto?)
// JS tiene que mostrar las canciones en los espacios en donde están los li
const songs = document.querySelector('#songs');
const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');
const title = document.querySelector('#title');
const play = document.querySelector('#play');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const progressBar = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');

let actualSong = null;

// Escuchar el elemento audio para que la barra de progreso se actualice
audio.addEventListener("timeupdate", updateProgress);

// Escucha para manipular la barra de progreso
progressContainer.addEventListener("click", setProress)

// Escuchar clicks en los controles
play.addEventListener("click", ()=> {
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

// Cargar cancionmes y mostrar el listado
function loadSongs(){
    songList.forEach((song, index) =>{
        // console.log(song);

        // Crear elemento li y elemento a
        const li = document.createElement('li');
        const link = document.createElement('a');

        // Hidratar a (poner el title de la cancion a a)
        link.innerText = song.title;
        link.href = '#';

        // Escuchar click
        link.addEventListener("click", ()=> loadSong(index));

        // Añadir a li
        // appendChild agrega un elemento (en este caso link, que es un ahref) dentro de la etiqueta li
        li.appendChild(link);
        // Añadir li a ul
        // Ahora agregamos un 'elemento hijo' a ul
        songs.appendChild(li);
    });
}

// Cargar cancion seleccionada
function loadSong(songIndex){
    if(songIndex !== actualSong){
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex; 
        // console.log(songIndex);
        audio.src = "audio/" + songList[songIndex].file;
        playSong();
        changeCover(songIndex);
        changeTitle(songIndex);
    }
}
// Actualizar controles
function updateControls(){
    if(audio.paused){
        play.classList.add('fa-play');
        play.classList.remove('fa-pause');
    }else{
        play.classList.add('fa-pause');
        play.classList.remove('fa-play');
    }
}

// Reproducir cancion y pausarla
function playSong(){
    if(actualSong !== null){
        audio.play();
        updateControls();
    }
}
function pauseSong(){
    audio.pause();
    updateControls();
}
// Anterior y siguiente cancion
function prevSong(){
    if (actualSong > 0){
        loadSong(actualSong - 1);
    }else{
        loadSong(songList.length - 1);
    }
}
// Actualizar el progreso de la barra
function updateProgress(event){
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime/duration) * 100;
    progressBar.style.width = percent + "%";
}
// Manipular la barra de progreso
function setProress(event){
    // caputar el ancho total de la barra de progreso
    const totalWidth = this.offsetWidth;
    // console.log(totalWidth);
    
    // capturar qué parte especificamente de la barra estoy haciendo click
    // console.log(event.offsetX);
    const progressWidth = event.offsetX;

    // Actualizar la cancion a determinado tiempo
    const current = (progressWidth/totalWidth) * audio.duration;
    audio.currentTime = current;
}

function nextSong(){
    // Si el índice de la canción actual es menor que el ultimo índice, entonces puedes cambiar a al sig
    if(actualSong < songList.length -1){
        loadSong(actualSong + 1);
    }else{
        // si no, cargar la primer canción
        loadSong(0);
    }
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll('a');
    if(lastIndex !== null){
        links[lastIndex].classList.remove('active');
    }
    links[newIndex].classList.add('active');

}

// Cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = "img/" + songList[songIndex].cover;
}
// Cambiar el titulo de la cancion
function changeTitle(songIndex){
    title.innerText = songList[songIndex].title;
}

// Iniciar siguiente cancion si la actual se termina
audio.addEventListener("ended", () => nextSong())

// GO!
loadSongs();