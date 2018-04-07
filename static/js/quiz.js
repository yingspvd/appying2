/*
var num1=Math.floor(Math.random() * 4);
var num2=Math.floor(Math.random() * 4);
var num3=Math.floor(Math.random() * 4);
var num4=Math.floor(Math.random() * 4);

var sign1="+"
var sign2="-"
var sign3="*"

var que=num1+sign1+num2+sign2+num3;
console.log(que);*/

var db = firebase.database();
var btn = document.getElementById('btn');

var quiz = ["4 x 8 + (5 x 7 x 2)" , //102
            "(25 + 256) x 2" ,      //562
            "12 x 12 + (12 + 12)" , //168   
            "198 - 21 + 52 + 158",  //387   
            "(45 x 2) + (152 - 45)",    //197
            "(78 ÷ 2) x 3 + 15",    //132
            "(788 ÷ 4) + (88 x 2)", //373
            "15 x 8 - 9 + 6",       //117
            "14 x 13 + 12 - 11",    //183
            "(90 x 15 ÷ (15 x 6))", //15

            "18 + 78 + 96 + 15 - 18",   //189
            "58 x 2 + (198 + 13)",  //327   
            "72 + 56 + 55 -12",     //171
            "( 98 x 5 ) ÷ 7 + 42 ", //112
            "( 32 x 6 + 9 + 9 ) x 0",   //0
            "36 x 36 x 0 x 9 x 25 x 4", //0
            "788 ÷ 2 + 6 - 200",    //200
            "23 + 89 + 122 - 89",    //145
            "(1-1+1-1+1-1+1-1+2-1-1) x 9", //0
            "10 - 100 x 7 + 1,000", //310

            "788 + 56 +455 +12 -444", //867
            "13 + 31 - 81 + 97 + 79 + 109 - 901" ,//-653
            "758 + 698 - 456 -57", //943
            "888 x 2 - 1,000 + 98 - 45", //829
            "988 - 456 x 2 - 65 + 123", //134
            "1,000 ÷ 25 x 9 - 479 + 666", //547
            "(595 ÷ 5) + 65 - 45 + 753", //892
            "(657 x 2) - 888 + 666 - 999", //93
            "111 + 999 + 111 - 222 - 444 - 333" ,//222
            "963 + 325 - 852 + 159 - 444", //151

            "454 - 222 + 316 ÷ 4"
           ];

var arAnswer = [102,562,168,387,197,132,373,117,183,15,
                189,327,171,112,0,0,200,145,0,310,
                867,-653,943,829,134, 547,892,93,222,151,
                137];

var rdQuiz; //random ข้อ
var answer; //คำตอบของข้อที่แรนดอมมา

var i = Math.floor(Math.random() * 4);
var item = 1; //ข้อที่..
var prev = [];
var score = 0;
var name = document.getElementById('player').value;
var index;
var timeShow; //เวลาที่จะโชว์ถูกหรือผิด

console.log(name);

//document.getElementById('quiz').innerHTML = quiz[i];
prev.push(i);

randomQuiz()

function randomQuiz()
{
    rdQuiz= Math.floor(Math.random() * quiz.length);

    document.getElementById('question').innerHTML = "Q" + item;
    document.getElementById('quiz').innerHTML = quiz[rdQuiz];
    document.getElementById('AnswerFill').value="";

    answer=arAnswer[rdQuiz];

    indexQuiz = quiz.indexOf(quiz[rdQuiz]);
    indexAns = arAnswer.indexOf(arAnswer[rdQuiz]);

    if(i != -1)
     {
        quiz.splice(indexQuiz, 1);
        arAnswer.splice(indexAns, 1);
    }
    
    console.log("answer "+answer)
}

function checkAnswer() 
{
    var check = 0;
    var ansfill = document.getElementById('AnswerFill').value;

     if(ansfill == answer)
        {
            console.log("Correct");
            item++;
            score += 20;

            document.getElementById('question').innerHTML = "Q" + item;

            //Showถูก 
            document.getElementById('showWrong').innerHTML = "Correct";
            document.getElementById('showWrong').classList.remove('shwrong')
            document.getElementById('showWrong').classList.add('shCorrect')
            
            

            firebase.database().ref('player/' + name).set
            ({
                score : score
            })
    
            i = Math.floor(Math.random() * 4)
    
            while(check != 0)
             {
                prev.forEach(function(e) 
                {
                    if(e == i) 
                    {
                        check++;
                    }
                });
            }

            setTimeout(function() 
            { document.getElementById('showWrong').innerHTML = "" , randomQuiz(); }, 800);
            
        } 
        
        else 
        {
            console.log("Wrong");

            document.getElementById('AnswerFill').value="";
            document.getElementById('showWrong').innerHTML = "Wrong";
            document.getElementById('showWrong').classList.remove('shCorrect')
            document.getElementById('showWrong').classList.add('shwrong')
            
            setTimeout(function()
            { document.getElementById('showWrong').innerHTML = "" }, 2000);
            
        }
    
    
}

firebase.database().ref().child('judger/start').on('value' , snap => 
{
    if( snap.val() == true ) {
        document.getElementById('AnswerFill').removeAttribute('disabled');

        function startTimer(duration, display) 
        {
            var timer = duration, minutes, seconds;
            setInterval(function () 
            {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes + " " : minutes + " ";
                seconds = seconds < 10 ? " 0" + seconds  : " " + seconds;
        
                display.textContent = minutes + ":" + seconds;
        
                if (--timer < 0) 
                {
                    window.location.href = "http://localhost:8000/score" + name;
                   // clearInterval(intervalId);
                    //timer = duration;
                    console.log("Time Out")
                }
            }, 1000);
        }
        
        var fiveMinutes = 60 * 10,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    } 
    
    else 
    {
        window.location.href = "http://localhost:8000/" ;
        fb.child('player').remove();

        var db = firebase.database();
        function start() 
        {
            db.ref('judger').set(
            {
                start: true
            });
        }

       //console.log("Time Out")
        //document.getElementById('AnswerFill').classList.add('hide');
    }
});