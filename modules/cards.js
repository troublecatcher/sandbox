import {killFilm} from './film.js';
import {addModal, appendModal} from './modal.js';
import {callForm} from './form.js';
import {reviews, addReview, renderReview} from './review.js';

let entry = document.getElementById('entry'),
    form = document.forms.filmForm,
    reviewForm = document.forms.reviewForm;

function loadImage(dest, file){
    let reader = new FileReader();
    reader.onload = function(){
        dest.src = reader.result;
    }
    if(file) reader.readAsDataURL(file)
    else dest.src = '';
}

let cardFunctions = {
    addCard: function (film){
        let filmCard = document.createElement("div"),
            filmPhoto = document.createElement("img"),
            filmTitle = document.createElement("p");
            loadImage(filmPhoto, film.poster);

            filmCard.appendChild(filmPhoto);
            filmCard.appendChild(filmTitle);
            entry.appendChild(filmCard);
            filmPhoto.classList.add('filmPhoto');
            filmTitle.textContent = film.name;
            filmCard.id = `film${film.id}`;
            filmCard.onclick = cardFunctions.renderCard.bind(null, film);
    },
    renderCard: function(film){
        let info = document.createElement('div'),
            img = document.createElement('img');
            info.append(img);
            img.classList.add('modalFilmImg');
            loadImage(img, film.poster);

        for (let item in film) {
            if(item == 'poster' || item == 'id') continue;
            let p = document.createElement('p');
            p.textContent = `${form[item].name} - ${film[item]}`;
            info.append(p);
        }
        let delbutt = document.createElement('button');
            delbutt.textContent = 'Удалить';
            delbutt.onclick = killFilm.bind(null, film);
        let revbutt = document.createElement('button');
            revbutt.textContent = 'Оставить отзыв';
            revbutt.onclick = callForm.bind(null, reviewForm);
            reviewForm.reviewPublishBtn.onclick = addReview.bind(null, film);

            info.append(delbutt, revbutt);
            
            if(reviews.length != 0)
                reviews.forEach(e => {
                    if(JSON.stringify(e.film) == JSON.stringify(film))
                        info.append(renderReview(e));
                });

            addModal();
            appendModal(info);
    },
    killCard: function(film){
        document.getElementById(`film${film.id}`).remove();
    }
}

export let {addCard, killCard} = cardFunctions;