import {addCard, killCard} from './cards.js';
import {updateFilters} from './filter.js';
import {addData, killData, loadData} from './database.js';
import {updateReviews} from './review.js';

let form = document.forms.filmForm;

class Film{
    constructor(name,country,genre,director,script,producer,composer,budget,income,rating,duration,date,poster,id){
        this.name = name,
        this.country = country,
        this.genre = genre,
        this.director = director,
        this.script = script,
        this.producer = producer,
        this.composer = composer,
        this.budget = budget,
        this.income = income,
        this.rating = rating,
        this.duration = duration,
        this.date = date,
        this.poster = poster
        this.id = id
    }
}
let filmFunctions = {
    films: [],
    addFilm: function(){
        if(filmFunctions.validate()){

                let extrafields = form.querySelectorAll('[id$="extrafield"]');
            extrafields.forEach(e => {
                let parent = document.getElementById(e.id.replace('extrafield', ''));
                    parent.value = [parent.value, e.value];
            });

            let id = 1;
            if(films.length != 0)
                id = films[films.length - 1].id + 1;

            let film = new Film(
                form.name.value,
                form.country.value,
                form.genre.value,
                form.director.value,
                form.script.value,
                form.producer.value,
                form.composer.value,
                form.budget.value,
                form.income.value,
                form.rating.value,
                form.duration.value,
                form.date.value,
                form.poster.files[0],
                id++
            );
            films.push(film);
            addCard(film);
            addData('films', film)
            form.reset();
            updateFilters();
        }
    },
    killFilm: function(film){
        killCard(film);
        updateReviews(film);
        films = films.filter(e => {
            return e.id != film.id;
        });
        document.getElementById('modalCloseBtn').click();
        killData('films', film.id);
    },
    validate: function(){
        let bool = true;
        form.querySelectorAll('input').forEach(e => { e.parentElement.style.color = 'black'});
        form.querySelectorAll('input').forEach(field => {
            if(!field.value){
                field.parentElement.style.color = 'crimson';
                bool = false;
            }
        });
        return bool;
    }
}


export let {films, addFilm, killFilm} = filmFunctions;

document.getElementById('addFilmBtn').onclick = addFilm;

loadData('films').then((result) => {
    films = result;
    films.forEach(film => {
        addCard(film);
    });
})