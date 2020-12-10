'use strict'

window.onload = function(){
    let _button = this.document.getElementById("btnConverti");
    _button.addEventListener("click",converti); // converti --> puntatore a funzione; converti() --> richiamo subito la funzione

    function converti(){
        // prendo il file XML
        let xml = localStorage.getItem("bookstore_xml");

        // parsifico
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml,"text/xml");

        // accedo alla root
        let root = xmlDoc.documentElement;

        // scorro i nodi 1 alla volta
        let jsonVet = [];   // dichiarazione vettore enumerativo in cui vado a salvare i vari libri in formato JSON

        // scansione dell'albero XML
        for (let i = 0; i < root.children.length; i++) {    // root.children è un vettore enumerativo che contiene tutti i book figli di root
            let book = root.children[i];    // book i-esimo
            // creo le variabili
            let category = "";
            let title = "";
            let authors = [];
            let lang = "";
            let year = "";
            let price = "";
            if (book.hasAttribute("category")) {
                category=book.getAttribute("category"); // leggo l'attributo
            }
            // scorre tutti i children di book       
            for (let j = 0; j < book.children.length; j++) {
                let campo = book.children[j];
                switch (campo.nodeName) {
                    case "title":
                        title=campo.textContent;
                        if (campo.hasAttribute("lang")) {
                            lang=campo.getAttribute("lang");    // accedo all'attributo lang di title
                        }
                        break;
                    case "author":
                        authors.push(campo.textContent);   // carico l'autore in coda al vettore con .push();
                        break;
                    case "year":
                        year=campo.textContent;
                        break;
                    case "price":
                        price=campo.textContent;
                        break;
                    default:
                        break;
                }
            }
            console.log("BOOK");
            console.log(title);
            console.log(authors);
            console.log(category);
            console.log(year);
            console.log(price);
            
            let jsonBook = {};
            jsonBook.category=category;
            jsonBook.title=title;
            jsonBook.authors=authors;
            jsonBook.lang=lang;
            jsonBook["year"]=year;
            jsonBook["price"]=price;

            jsonVet.push(jsonBook);
        }
        alert(JSON.stringify(jsonVet));
        alert("Dati convertiti salvati correttamente");
        localStorage.setItem("bookstore_json",JSON.stringify(jsonVet));
    }
}