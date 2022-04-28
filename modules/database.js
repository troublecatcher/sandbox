let req = window.indexedDB.open('database');
    req.onupgradeneeded = () => {
        let db = req.result;
        if (!db.objectStoreNames.contains('films'))
            db.createObjectStore('films');
        if (!db.objectStoreNames.contains('reviews'))
            db.createObjectStore('reviews');
    }
let buf;
let databaseFunctions = {
    addData: function(dest, item){
        let req = window.indexedDB.open('database');
        req.onsuccess = () => {
            let db = req.result;
            let f = db.transaction(dest,'readwrite').objectStore(dest);
            f.add(item, item.id);
        }
    },
    killData: function(dest, id){
        let req = window.indexedDB.open('database');
        req.onsuccess = () => {
            let db = req.result;
            let f = db.transaction(dest,'readwrite').objectStore(dest);
            f.delete(id);
        }
    },
    loadData: function(source){
        return new Promise (function(resolve){
            let req = window.indexedDB.open('database');
            req.onsuccess = function(){
                let db = req.result,
                    tx = db.transaction(source, 'readwrite');
                let fi = tx.objectStore(source);

                fi.getAll().onsuccess = function (event) {
                    return resolve(event.target.result)
                }
            }
        });
    }
}
export let {addData, killData, loadData} = databaseFunctions;