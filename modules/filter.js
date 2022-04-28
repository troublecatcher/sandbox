import {addCard} from './cards.js';
import {films} from './film.js';

let genres = [], countries = [], filterForm = document.forms.filterForm;

let filterFunctions = {
    genreFilter: function (){
        for (let item of films) {
            if(genres.includes(item.genre) || item.genre =='')
                continue;
            else genres.push(item.genre);
        }
        document.getElementById('genreF').innerHTML = '';
        for (let i in genres) {
            let opt = document.createElement('option');
            opt.textContent = genres[i];
            document.getElementById('genreF').appendChild(opt);
        }
    },
    countryFilter: function (){
        for (let item of films) {
            if(countries.includes(item.country) || item.country =='')
                continue;
            else countries.push(item.country);
        }
        document.getElementById('countryF').innerHTML = '';
        for (let i in countries) {
            let opt = document.createElement('option');
            opt.textContent = countries[i];
            document.getElementById('countryF').appendChild(opt);
        }
    },
    updateFilters: function (){
        filterFunctions.countryFilter();
        filterFunctions.genreFilter();
    },
    showFilter: function (){
        document.getElementById('showFilterBtn').value = '←';
        document.getElementById('showFilterBtn').onclick = hideFilter;
        filterForm.style.display = 'block';
        setTimeout(() => {
            filterForm.style.opacity = '1';
        }, 100);
    filterFunctions.updateFilters();
    },
    hideFilter: function (){
        document.getElementById('showFilterBtn').value = '→';
        document.getElementById('showFilterBtn').onclick = showFilter;
        filterForm.style.opacity = '0';
        setTimeout(() => {
            filterForm.style.display = 'none';
        }, 200);
    },
    filtrate: function (){

        entry.innerHTML = '';

        let filtered = films,
            genreSel = document.getElementById('genreF'),
            countrySel = document.getElementById('countryF'),
            date1 = filterForm.date1.value.split("-"),
            date2 = filterForm.date2.value.split("-");

        if(filterForm.dateCheck.checked && date1 && date2){

            let from = new Date(...date1),
                to   = new Date(...date2);
                from.setMonth(from.getMonth() - 1);
                to.setMonth(to.getMonth() - 1);

            filtered = filtered.filter((film) => {
                let filmDate = film.date.split('-');
                let check = new Date(...filmDate);
                    check.setMonth(check.getMonth() - 1);
                    return check > from && check < to;
            });

        }

        if(filterForm.genreCheck.checked)
            filtered = filtered.filter((film) => {
                return film.genre == genreSel.options[genreSel.selectedIndex].text;
            });

        if(filterForm.countryCheck.checked)
            filtered = filtered.filter((film) => {
                return film.country == countrySel.options[countrySel.selectedIndex].text;
            });
        
        filtered.forEach(e => {
            addCard(e);
        });
    }
} 

export let {showFilter, hideFilter, updateFilters, filtrate} = filterFunctions;

document.getElementById('showFilterBtn').onclick = filterFunctions.showFilter;
document.getElementById('filtrateBtn').onclick = filterFunctions.filtrate;