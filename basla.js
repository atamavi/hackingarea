var trencufcuf=require('express');
var trenmotoru=trencufcuf();
var trenyakit=require('body-parser');
var yolcular=require('express-session');
var kapi = require('http').Server(trencufcuf);
var kaptan  = trenmotoru.listen(1337);
var iletisim      = require('socket.io').listen(kaptan);

/*

var trencufcuf = require('express');
var trenmotoru     = express();
var kaptan  = trenmotoru.listen(1337);
var iletisim      = require('socket.io').listen(kaptan);
*/ 
//adres
trenmotoru.use(trenyakit.urlencoded({'extended':'true'}));
trenmotoru.use(yolcular({'secret':'biletno'}));

trenmotoru.get("/giris",function (bilet,gorevli){
    if(bilet.session.biletonay){
    gorevli.sendFile(__dirname +'/portal.html');
    }
    else{
    gorevli.sendFile(__dirname +'/giris.html');

    }

});
trenmotoru.get("/",function(gel,git){
git.redirect("/giris")
});
trenmotoru.get("/kitaplar",function(kitap,geri){
if(kitap.session.biletonay){
geri.sendFile(__dirname+'/kitap.html');
}
else{
geri.redirect("/");
}
});

trenmotoru.get("/cikis",function(inecek,durak){

delete inecek.session.biletonay;
durak.redirect("/")
});

trenmotoru.get("/sohbet",function (bilet,gorevli){
    if(bilet.session.biletonay){
    gorevli.sendFile(__dirname +'/sohbet.html');
    }
    else{
    gorevli.sendFile(__dirname +'/giris.html');

    }

});



trenmotoru.post("/login",function(kontrol,vagon){
    
var isim1="who";
var sifre1="who";
isim=kontrol.body["isim"];
var sifre=kontrol.body["sifre"];
if(isim1==isim && sifre1==sifre)
{
        kontrol.session.biletonay=isim;
    vagon.sendFile(__dirname +'/portal.html');


}
else{
    vagon.send("olmadı yâr <a href='./login'>geri don</a>");
}
console.log(isim1,kontrol.url);
});


//404 
trenmotoru.use(function(personelodasi,olmayanyer){
    olmayanyer.send("bulamadim")
    olmayanyer.end();
});
//iletisim

iletisim.on('connection', function(socket){
  socket.on('mesaj', function(msg){
    iletisim.emit('mesaj', msg);
  });
});
iletisim.sockets.on("connection",function(socket){

socket.on("banamusade",function (data){

    iletisim.emit("gerigeldim",data);
        
})






});
  console.log("Tren harekete geçti! cufcuf!");

//trenmotoru.listen('1337');

