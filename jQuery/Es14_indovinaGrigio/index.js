"use strict"
$(document).ready(function() {
    let _wrapper=$("#wrapper");
    let box;
    let _p=$("#tooltip");
    let _btnOk=$("#btnOk");
    let _txtPosizione=$("#txtPosizione");
    let _txtColore=$("#txtColore");

    _wrapper.css({
        "backgroundColor":"#FF9",
        "float":"left"
    });

    for(let i=0;i<9;i++)
    {
        console.log(i);
        box=$("<div>");
        box.text(i+1);
        box.addClass("box");
        let n=generaNumero(0,255);
        box.css({"backgroundColor":`rgb(${n}, ${n}, ${n})`});
        box.appendTo(_wrapper);
    
    
        box.on("mouseenter",function()
        {
            _p.hide();
            let str=$(this).css("backgroundColor").substr(4,5);
            _p.text(parseInt(str));
            //_p.text($(this).css("backgroundColor"));
            _p.fadeIn(1000,function()
            {
                _p.show();
            });
        });
        box.on("mouseleave",function()
        {
        
            _p.fadeOut(1000,function()
            {
                _p.hide();
            });
            
        });
    }

    _btnOk.on("click",function()
    {
        if(_txtColore.val()==""||(_txtPosizione.val()==""))
        {
            alert("inserire qualcosa nelle textbox");
        }
        else
        {
            let pos=parseInt(_txtPosizione.val());
            let col=_wrapper.children(`:nth-of-type(${pos})`).css("backgroundColor").substr(4,5);
            let colore=parseInt(col)
            if(colore==_txtColore.val())
            {
                alert("hai indovinato");
                _txtColore.css({
                    "backgroundColor":"white",
                    "color":"black"
                });
                _wrapper.children(`:nth-of-type(${pos})`).css({
                    "backgroundColor":"#FF9",
                    "border":"0px solid black"
                })
            }
            if(_txtColore.val()<colore)
            {
                alert("colore inserito troppo piccolo");
                _txtColore.css({
                    "backgroundColor":"red",
                    "color":"white"
                });
                
            }
            if(_txtColore.val()>colore)
            {
                alert("colore inserito troppo grande");
                _txtColore.css({
                    "backgroundColor":"blue",
                    "color":"white"
                });
                
            }

        }
    })

    function generaNumero(min,max) {
        let n = Math.floor((max - min + 1) * Math.random() + min); /*FORMULA PER GENERARE TRA MIN E MAX ESTREMI INCLUSI E NEL NOSTRO CASO SIA 1 CHE 0*/
        return n;
    }
});