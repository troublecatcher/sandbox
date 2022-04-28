import { addData, killData, loadData } from "./database.js";
import { appendModal } from "./modal.js";

let form = document.forms.reviewForm;

class Review{
    constructor(name, job, text, rating, film, id){
        this.name = name;
        this.job = job;
        this.text = text;
        this.rating = rating;
        this.film = film;
        this.id = id;
    }
}

let reviewFunctions = {
    reviews: [],
    addReview: function(film){
        let id = 1;
        if(reviews.length != 0)
            id = reviews[reviews.length - 1].id + 1;

        let review = new Review(
            form.name.value,
            form.job.value,
            form.text.value,
            form.rating.value,
            film,
            id
        );
        appendModal(renderReview(review));
        reviews.push(review);
        addData('reviews', review);
    },
    renderReview: function(item){
        let title = document.createElement('h5'),
            content = document.createElement('h3');

            title.textContent = `${item.name} (${item.job}) оценивает фильм на ${item.rating}`;
            content.textContent = `${item.text}`;
            content.style.marginLeft = '2rem'

        let review = document.createElement('div');
            review.classList.add('reviewBlock');
            review.append(title, content);
        return review;
    },
    updateReviews: function(film){
        let toBeDeleted = JSON.stringify(film.film) === JSON.stringify(film);
        reviews = reviews.filter(e => {
            if(toBeDeleted)
                killData('reviews', e.id);
            return !toBeDeleted;
        })
    }
}

loadData('reviews').then((result) => {
    reviews = result;
})

export let {reviews, addReview, renderReview, updateReviews} = reviewFunctions; 