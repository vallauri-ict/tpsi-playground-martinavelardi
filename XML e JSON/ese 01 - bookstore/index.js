'use strict'

function crea()
{
    localStorage.setItem("bookstore_xml",bookstore);
    alert("Dati salvati correttamente all'interno del localStorage");
}

function visualizza()
{
    // lettura stringa dal localStorage
    let xml = localStorage.getItem("bookstore_xml");

    // inizio elaborazione
    // istanzio un DOM parser
    let parser = new DOMParser();
    // tramite il DOMParser, parsifico la stringa xml
    let xmlDoc = parser.parseFromString(xml,"text/xml");

    // accedo alla radice dell'albero
    let root = xmlDoc.documentElement;
    let nLibri = root.children.length;
    alert("Dati letti correttamente dal localStorage. N° di record letti = " + nLibri);

    // accedo al body
    let _tBody = document.getElementById("tabLibri");
    // ripulisco il body
    _tBody.innerHTML = "";

    // carico i nuovi dati
    for(let i=0;i<nLibri;i++)
    {
        // per evitare gli undefined inizializzo tutto a ""
        let titolo = "" , categoria = "", lingua = "", autori = "", anno = "", prezzo = "";

        let libro = root.children[i];   // accedo al record
        // controllo se il libro ha l'attributo categoria
        if(libro.hasAttribute("category"))
            categoria = libro.getAttribute("category");


        for(let j=0; j<libro.children.length; j++)
        {
            let campo = libro.children[j];
            switch(campo.nodeName)
            {
                case 'title':
                    titolo = campo.textContent;
                    if(campo.hasAttribute("lang"))
                        lingua = campo.getAttribute("lang");
                    break;
                case 'year':
                    anno = campo.textContent;
                    break;
                case 'price':
                    prezzo = campo.textContent;
                    break;
                case 'author':
                    if(autori=="")
                        autori += campo.textContent;
                    else
                        autori += " - " + campo.textContent;
                    break;
            }
        }

        // creo la riga
        let tr = document.createElement("tr");
        // la appendo al DOM (la visualizzo)
        _tBody.appendChild(tr);

        let td;
        // creo la cella del titolo
        td = document.createElement("td");
        td.innerHTML = titolo;
        td.style.border = 0;
        tr.appendChild(td);

        // creo la cella della categoria
        td = document.createElement("td");
        td.innerHTML = categoria;
        tr.appendChild(td);
        // creo la cella della lingua
        td = document.createElement("td");
        td.innerHTML = lingua;
        tr.appendChild(td);
        // creo la cella degli autori
        td = document.createElement("td");
        td.innerHTML = autori;
        tr.appendChild(td);
        // creo la cella dell'anno
        td = document.createElement("td");
        td.innerHTML = anno;
        tr.appendChild(td);
        // creo la cella del prezzo
        td = document.createElement("td");
        td.innerHTML = prezzo;
        tr.appendChild(td);
    }
}