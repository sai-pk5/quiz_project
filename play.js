 const question=document.getElementById("question");
 const choice=Array.from(document.getElementsByClassName("choice-text"));
 const progresstext=document.getElementById("progresstext");
 const scoretext=document.getElementById("score");
 const progressfull=document.getElementById("progressbar-full");
 let currentquestion={};
 let acceptinganswer=false;
 let score=0;
 let questioncounter=0;
 let availablequestions={};


 let questions=[
     {
         question:"The marked price of a watch is Rs. 800. A shopkeeper gives two successive discounts and sells the watch at Rs. 612. If the first discount is 10%, the second discount is?",
         choice1:"12%",
         choice2:"20%",
         choice3:"15%",
         choice4:"10%",
         answer:3
     },
     {
        question:"A train moves with the speed of 180 km/hr. Its speed (in metres per second) is?",
        choice1:"5",
        choice2:"30",
        choice3:"40",
        choice4:"50",
        answer:4
    },
    {
        question:" A car travelling with 5/7th of its actual speed covers 42km in 1hr. 40mins. 48 secs. Find the actual speed of the car.?",
        choice1:"17(6/7) km/hr",
        choice2:"35 km/hr",
        choice3:"25 km/hr",
        choice4:"30 km/hr",
        answer:3
    },
    {
        question:" A train 120 m long passes a telegraph post in 6 seconds. Find the speed of the train.?",
         choice1:"60 km/hr",
         choice2:"35 km/hr",
         choice3:"25 km/hr",
         choice4:"72 km/hr",
        answer:4
    },
    {
        question:" If ratio of the areas of two squares is 1:4, the ratio of their perimeters is?",
        choice1:"1:2",
        choice2:"1:4",
        choice3:"1:6",
        choice4:"1:8",
        answer:1
    },
    {
        question:"  A room is 6m long, 5m broad and 4m high. The maximum length of rod that can be kept in the room is",
        choice1:"square root 61m",
        choice2:"square root 16m",
        choice3:"square root 36m",
        choice4:"square root 77m",
        answer:4
    },
    {
        question:"461 + 462 + 463 + 464 + 465 is divisible by?",
        choice1:"3",
        choice2:"5",
        choice3:"11",
        choice4:"17",
        answer:2
    },
    {
        question:" If a*b = 2a+3b, then the value of 2*3 + 3*4 is ?",
        choice1:"24",
        choice2:"31",
        choice3:"32",
        choice4:"34",
        answer:2
    },
    {
        question:"If 12+22+32+…..+ 102 = 385, then 32+62+92+….+302 is equal to",
        choice1:" 3465",
        choice2:"2310",
        choice3:"1155",
        choice4:"770",
        answer:1
    },
    {
        question:"If 30 men can do a piece of work in 20 hours, then in how many hours will 12 men do it? ",
        choice1:"18 hours",
        choice2:"30 hours",
        choice3:"40 hours",
        choice4:"50 hours",
        answer:4
    }
    
    
    
    
    
    
 ]
    const correct_bonus=10;
    const max_questions=10;
    startgame=()=>{
        questioncounter=0;
        score=0;
        availablequestions=[...questions];
       getnewquestion();
    };
    
    getnewquestion=()=>{
        if(availablequestions.length===0 || questioncounter>=max_questions){
            localStorage.setItem('mostrecentscore',score);
            return window.location.assign("/end.html");
        }
        questioncounter++;
        progresstext.innerText="Questions : "+ questioncounter + "/" + max_questions;
        progressfull.style.width=`${(questioncounter/max_questions)*100}%`;
        const questionindex=Math.floor(Math.random()*availablequestions.length);
        currentquestion=availablequestions[questionindex];
        question.innerText=currentquestion.question;

        choice.forEach(choice =>{
            const number=choice.dataset["number"];
            choice.innerText=currentquestion["choice"+number];
        });
        availablequestions.splice(questionindex,1);
        acceptinganswer=true;
    };
    choice.forEach(choices=>{
        choices.addEventListener("click",e=>{
            if(!acceptinganswer)return;
            acceptinganswer=false;
            const selectedchoice=e.target;
            const selectedanswer=selectedchoice.dataset["number"];
           const classtoapply=
           selectedanswer==currentquestion.answer ? "correct" : "incorrect";
           if(classtoapply==='correct'){
               incrementscore(correct_bonus);
           }
           selectedchoice.parentElement.classList.add(classtoapply);
           setTimeout(() => {
           selectedchoice.parentElement.classList.remove(classtoapply);
            getnewquestion();
           },1000);
        });
    });
    incrementscore=num=>{
        score+=num;
        scoretext.innerText=score;
    }
    startgame();
