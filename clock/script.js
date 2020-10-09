function showTime(){
    var date = new Date();
    var h= date.getHours();
    var m= date.getMinutes();
    var s= date.getSeconds();


    //For 2-digit time
    if(h<10){
      h= "0" +h;
    }
    if(m<10){
      m= "0" +m;
    }
    if(s<10){
      s= "0" +s;
    }

    var time= h+ " : " +m+ " : " +s;
    document.getElementById("clock").innerText= time;


    setTimeout(showTime, 1000); //time updates every second=1000 miliseconds
}

showTime();
