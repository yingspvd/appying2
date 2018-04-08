

var db = firebase.database();
var btn = document.getElementById('btn');


var rdQuiz; //random ข้อ
var answer; //คำตอบของข้อที่แรนดอมมา

var i = Math.floor(Math.random() * 4);
var item = 0; //ข้อที่..
var prev = [];
var score = 0;
var name = document.getElementById('player').value;
var index;
var timeShow; //เวลาที่จะโชว์ถูกหรือผิด

console.log(name);

//document.getElementById('quiz').innerHTML = quiz[i];
prev.push(i);



function randomQuiz2() 
{
    item++;
    rdQuiz= Math.floor(Math.random() * quiz.length);

    document.getElementById('question').innerHTML = "Q" + item;
    document.getElementById('quiz').innerHTML = quiz[rdQuiz];
    document.getElementById('AnswerFill').value="";
    document.getElementById('question').innerHTML = "Q" + item;

    answer=arAnswer[rdQuiz];

    indexQuiz = quiz.indexOf(quiz[rdQuiz]);
    indexAns = arAnswer.indexOf(arAnswer[rdQuiz]);

    /*if(i != -1)
     {
        quiz.splice(indexQuiz, 1);
        arAnswer.splice(indexAns, 1);
    }*/

    console.log("answer "+answer)
}

document.getElementById('AnswerFill').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      checkAnswer();
    }
});

function checkAnswer() 
{
    var check = 0;
    var ansfill = document.getElementById('AnswerFill').value;

     if(ansfill == answer)
        {
            console.log("Correct");
            
            score += 20;

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
            { document.getElementById('showWrong').innerHTML = "" , randomQuiz(); }, 800);
            
        }

        document.getElementById('AnswerFill').autofocus;
    
}

firebase.database().ref().child('judger/start').on('value' , snap => 
{
    if( snap.val() == true ) {
        document.getElementById('AnswerFill').removeAttribute('disabled');
        document.getElementById('AnswerFill').autofocus;

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
        
        var fiveMinutes = 60 * 5,
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