var time=0;

var timer=setInterval(function(){
    time+=2;
    console.log(time+' seconds have passed');
    //we can also use clear interval function
     if(time>10){
         clearInterval(timer);
     }
},2000);