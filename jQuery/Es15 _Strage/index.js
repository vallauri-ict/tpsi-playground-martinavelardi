"use strict"
 $(document).ready(function(){
     let _header=$("#header");
     let _mainSection=$("#mainSection");
     let _fieldset;
     let _opt;
     let cont=1;
     let punti=0;
     let _btnInvia=$("<button>");
     let _timer=$("#timer");
     let interval;
     let span;
     let contInterval=119;
     let contSec=59;
     let span2;
     console.log(elencoDomande);
     _header.animate({"fontSize":2*15+"pt",
                      "width":60*15,
                      "height":6*15},1500,function()
                      {
                           for(let i=0;i<3;i++)
                           {
                              _fieldset=$("<fieldset>");
                              _fieldset.appendTo(_mainSection);
                              let _legend=$("<legend>");
                              _legend.appendTo(_fieldset);
                              _legend.text(elencoDomande[i].argomento);
                              _fieldset.addClass("fieldset");
                              _legend.css({
                                   "fontSize":"12pt",
                                   "color":"blue"
                              });
                              let domande=elencoDomande[i].domande;
                              for (const item of domande) 
                              {
                                   let _label=$("<label>");
                                   _label.appendTo(_fieldset);
                                   _label.text(item.domanda);

                                   //radio button
                                   _opt=$("<input type='radio' value='T'>");
                                   _opt.appendTo(_fieldset);
                                   _opt.prop("name",`radio-choice-${cont}`);
                                   let _span=$("<span>");
                                   _span.appendTo(_fieldset);
                                   _span.text("T");

                                   _opt=$("<input type='radio' value='F'>");
                                   _opt.appendTo(_fieldset);
                                   _opt.prop("name",`radio-choice-${cont}`); //gli aggiungo un name che cambia riga per riga
                                    _span=$("<span>");
                                   _span.appendTo(_fieldset);
                                   _span.text("F");
                                   let _br=$("<br>");
                                   _br.appendTo(_fieldset);     
                                   cont++;
                              }
                           }

                           //btnInvia
                         _timer.css({
                              "margin":0,
                              "padding":0,
                              "width":100,
                              "font-size":"25pt",
                              "font-weight":"bold",
                              "position":"absolute",
                              "top":20,
                              "right":30
                         })
                         span=$("<span>");
                         span.text("02 :");
                         span.appendTo(_timer);
                         
                         
                         span2=$("<span>");
                         span2.text(" 00");
                         span2.appendTo(_timer);
                         _btnInvia.appendTo(_mainSection);
                         _btnInvia.text("INVIA");
                         _btnInvia.addClass("invia");
                         _btnInvia.on("click",checkRisposte);
                         //for(let i=120;i>=0;i--)
                         
                         if(!interval)
                         {
                              interval=setInterval(timer ,1000);
                         }
                         else
                         {
                              clearInterval(interval);
                         }
                         
                      });

     function timer()
     {
          //gestione dei minuti
          if(contInterval==119)
          {
               span.text("01 :");
               contSec=59;
          }
          else if(contInterval==59)
          {
               span.text("00 :");
               contSec=59;
          }
          else if(contInterval==0)
          {
               clearInterval(interval);
               checkRisposte();
          }
          span2.text(pad(contSec));
          contInterval--;
          contSec--;
     }
     function checkRisposte()
     {
          clearInterval(interval);
          _btnInvia.off("click",checkRisposte);
          _btnInvia.css({
               "backgroundColor":"#CCC",
               "color":"#999"
          });
          //da interrompere il timer

          //controllo
          punti=0;
          cont=1;
          for(let i=0;i<3;i++)
          {
               for (const item of elencoDomande[i].domande)
               {
                    let radioValue=$(`input[name=radio-choice-${cont}]:checked`).val();
                    console.log(radioValue);
                    if(item.risposta==radioValue)
                    {
                         punti++;
                    }
                    else if(radioValue==undefined)
                    {
                         punti+=0;
                    }
                    else 
                         punti=punti-0,25;
                    
                    cont++;
               }
          }
          alert(punti);
          _btnInvia.on("click",checkRisposte);
     }
     
 });
// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
     return (number < 10 ? '0' : '') + number;
}
