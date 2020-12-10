"use strict";

let intestazioni=["idMeal","strMeal","img","",""];
let larghezze =["50px","310px","60px","40px","40px"];

window.onload=function()
{
    let _radioWrapper=document.getElementById("radioWrapper");
    let _table=document.getElementById("table");
    let _dettagliWrapper=document.getElementById("dettagliWrapper");
    let categoria="Breakfast";
    let _nPagina=document.getElementById("nPagina");
    let nPaginaP;
    let contCat=0;
    let indiceP=0;

    //pulsanti
    let first=document.getElementById("first");
    first.id="first";
    first.addEventListener("click",pulsanti);
    
    let next=document.getElementById("nextPage");
    next.id="nextPage";
    next.addEventListener("click",pulsanti);
    
    let prev=document.getElementById("prevPage");
    prev.id="prevPage";
    prev.addEventListener("click",pulsanti);
    
    let last=document.getElementById("last");
    last.id="last";
    last.addEventListener("click",pulsanti);
    
    //math.ceil();

    caricaRadioButton();
    //creaIntestazioni();
    caricaTabella();
    
    /*****************************************************************************/
    function caricaRadioButton()
    {
        for (const key in categoryList) 
        {
            let radioButton=document.createElement("input");
            radioButton.type="radio";
            radioButton.name="category";
            radioButton.value=key;
            _radioWrapper.appendChild(radioButton);
            let _span=document.createElement("span");
            _span.innerHTML=key;
            _radioWrapper.appendChild(_span);
            let _br=document.createElement("br");
            _radioWrapper.appendChild(_br);
            if(key=="Breakfast")
            {
                radioButton.checked=true;
            }
            radioButton.addEventListener("click",function()
            {
                categoria=this.value;
                indiceP=0;
                caricaTabella();
            });
        }
        
    }
    function creaIntestazioni()
    {
        let _tr=document.createElement("tr");
        _table.appendChild(_tr);
        for (let i=0;i<intestazioni.length;i++) 
        {
            let _th=document.createElement("th");
            _th.innerHTML=intestazioni[i];
            _th.style.width=larghezze[i];
            _tr.appendChild(_th); 
        }
    }

    function caricaTabella()
    {
        _table.innerHTML="";
        contCat=0;
        let arrayMeal=[];
        let item={};
        creaIntestazioni();
        //let categoria="Breakfast";
        for ( item of categoryList[categoria]) 
        {
            contCat++;
            arrayMeal[contCat-1]=item;
            /*let _tr=document.createElement("tr");
            _table.appendChild(_tr);

            //idMeal
            let _td=document.createElement("td");
            _td.innerHTML=item.idMeal;
            _tr.appendChild(_td);

            //strMeal
            _td=document.createElement("td");
            _td.innerHTML=item.strMeal;
            _tr.appendChild(_td);

            //creo img
            let _img=document.createElement("img");
            _td=document.createElement("td");
            _img.src=item.strMealThumb;
            _img.idMeal=item.idMeal;
            _img.addEventListener("click",visualVideo);
            _img.style.width="55px";
            _td.appendChild(_img);
            _tr.appendChild(_td);

            //lente
            _img=document.createElement("img");
            _td=document.createElement("td");
            _img.src="img/lente.jpg";
            _img.style.width="30px";
            _img.idMeal=item.idMeal;
            _img.addEventListener("click",visualizzaDettagli);
            _td.appendChild(_img);
            _tr.appendChild(_td);

            //delete
            _img=document.createElement("img");
            _td=document.createElement("td");
            _img.src="img/delete.png";
            _img.idMeal=item.idMeal;
            _img.addEventListener("click",cancella);
            _img.style.width="30px";
            _td.appendChild(_img);
            _tr.appendChild(_td);*/
        }
        //console.log(contCat);
        nPaginaP=Math.ceil(contCat/7);
        _nPagina.innerHTML=(indiceP+1)+"/"+nPaginaP;
        //console.log(arrayMeal);
        /*passo indiceP -1 così io parto dalla posizione giusta essendo un array che parte da 0 e le posizioni sono tutte scalate di 1
        per esempio con indiceP=1 vado da 7 alla posizione 13 inclusa quando avrei bisogno da 6 a 12 incluso*/ 
            for(let j=indiceP*7;j<indiceP*7+7;j++)
            {
                console.log(arrayMeal[j]);
                let _tr=document.createElement("tr");
                _table.appendChild(_tr);

                
                let _td=document.createElement("td");
                _td.innerHTML=arrayMeal[j].idMeal;
                _tr.appendChild(_td);

                //strMeal
                _td=document.createElement("td");
                _td.innerHTML=arrayMeal[j].strMeal;
                _tr.appendChild(_td);

                //creo img
                let _img=document.createElement("img");
                _td=document.createElement("td");
                _img.src=arrayMeal[j].strMealThumb;
                _img.idMeal=arrayMeal[j].idMeal;
                _img.addEventListener("click",visualVideo);
                _img.style.width="55px";
                _td.appendChild(_img);
                _tr.appendChild(_td);

                //lente
                _img=document.createElement("img");
                _td=document.createElement("td");
                _img.src="img/lente.jpg";
                _img.style.width="30px";
                _img.idMeal=arrayMeal[j].idMeal;
                _img.addEventListener("click",visualizzaDettagli);
                _td.appendChild(_img);
                _tr.appendChild(_td);

                //delete
                _img=document.createElement("img");
                _td=document.createElement("td");
                _img.src="img/delete.png";
                _img.idMeal=arrayMeal[j].idMeal;
                _img.addEventListener("click",cancella);
                _img.style.width="30px";
                _td.appendChild(_img);
                _tr.appendChild(_td);
                
            }

    }


    function cancella()
    {
        for(let i=0;i<categoryList[categoria].length;i++)
        {
            let item=categoryList[categoria][i];
            if(item.idMeal==this.idMeal)
            {
                categoryList[categoria].splice(i,1);
                break;
            }
        }
        caricaTabella();
    }

    function visualizzaDettagli()
    {
        //details.meals vuol dire che vado ad accedere alla chiave meals
        for (const item of details.meals) 
        {
            let meal=item.meals[0];
            if(meal.idMeal==this.idMeal)
            {
                let s="<b> "+meal.strMeal+" </b>";
                s+=meal.strInstructions;
                _dettagliWrapper.innerHTML=s;
                break;
            }
            
        }
    }

    function visualVideo()
    {
        for (const item of details.meals) 
        {
            let meal=item.meals[0];
            if(meal.idMeal==this.idMeal)
            {
                window.open(meal.strYoutube);
                break;
            }
            
        }
    }

    function pulsanti()
    {
        switch(this.id)
        {
            case 'first':
                indiceP=0;
                caricaTabella();
                break;
            case 'prevPage':
                if(indiceP!=0)
                {
                    indiceP--;
                    caricaTabella();
                }
                
                break;
            case 'nextPage':
                if(indiceP!=Math.ceil(contCat/7)-1)
                {
                    indiceP++;
                    caricaTabella();
                }
                break;
            case 'last':
                indiceP=Math.ceil(contCat/7)-1;
                console.log(indiceP);
                caricaTabella();
                break;
        }
    }
}