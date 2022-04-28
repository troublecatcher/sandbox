import {addModal, appendModal} from './modal.js';

let form = document.forms.filmForm;

let formFunctions = {
    callForm: function (form){
        form.style.display = 'flex';
        if(!document.getElementById('modal')) addModal();
        appendModal(form);
        form.querySelectorAll('input').forEach(e => { e.parentElement.style.color = 'black'});
    },
    moreThanOne: function(element){
        let addField = element => {
            let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.id = `${element.id}extrafield`
                element.after(input);
                addBtn.after(delBtn);
        }
        let killField = () => {
            let x = document.querySelectorAll(`[id=${element.id}extrafield]`);
            if(x.length != 0) x[x.length - 1].remove();
            if(x.length == 1) document.getElementById(`${element.id}DelBtn`).remove();
        }
        let addBtn = document.createElement('button');
            addBtn.setAttribute('type', 'button');
            addBtn.textContent = '+';
            addBtn.onclick = addField.bind(null, element);
            element.after(addBtn);
        let delBtn = document.createElement('button');
            delBtn.setAttribute('type', 'button');
            delBtn.textContent = '-';
            delBtn.id = `${element.id}DelBtn`;
            delBtn.onclick = killField;
    },
}
    
    
formFunctions.moreThanOne(form.director);
formFunctions.moreThanOne(form.script);

export let {callForm} = formFunctions;
document.getElementById('callFilmFormBtn').onclick = callForm.bind(null, form);
