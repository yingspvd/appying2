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


var quizTest = ["11 X 5 + 55 + 55 + 55 ", //220
                "15 + 15 + 15 + 15" ,//60
                "80 + 80 + 80 + 80 + 80" ,//4005
                 "28 + 28 + 28 + 28", //112
                "35 + 35 + 35 + 35" ,//140
                "44 + 44 + 44 + 44" , //176
                "90 + 90 + 90",  //270
                "44   ÷   4  -  11", //0
                "9 + 9 + 9 + 9 + 9 + 9 + 9" , //63
                '300 ÷ 25 x 12', //144

                "( 20 x 20 ) ÷ ( 20 + 20 )",  //10
                "30 x 6 ÷ 10 ", //18
                "30 x 6 ÷ 10",  //18
                "9 x 2 x 5", //90
                "1 x 8 x 2", //16
                "6 x 5 x 6", //180
                "5 x 2 x 3", //30
                "9 x 3 x 1", //27
                "8 x 5 x 4", //160
                "35 + 45 + 55 – 35 ",  //100
                
                "18 + 18 + 18 + 18 + 18",  //90
                "72 + 72 + 72", //216
                "25 + 25 + 25 + 25 + 25" ,//125
                "22 + 22 + 22 + 22", //88
                "31 + 31 + 31 + 31 + 31", //155
                "30 + 30 + 30", //90
                "36 + 36 + 36 + 36", //144
                "250 x 500", //125000
                "44 x 200" ,//8800
                "30 x 120" ,//3600
             ];

var ansTest=[220,60,400,112,140,176,270,0,63,144,
            10,18,18,90,16,180,30,27,160,100,
            90,216,125,88,155,90,144,125000,8800,3600]

var quiz = ["4 + 5 + 6 + 7 + 8 + 9 + 10" , //49
            "8 X 2 + 7 + 15 - 6 + 12	" , //44    
            "4 + 9 +16 - 12 X 3 + 9" ,  //2
            "16 + 16 + 16 - 12 X 5 + 16 + 16", //20   
            "7 X 3 + 25 ÷ 5 + 36 - 32 + 4",   //34
            "4 X 5 X 5 + 45 - 88",  //57
            "12 X 5 X 3 - 78 - 12", //90
            "9 X 12 - 52 + 11 + 33  ",  //100 
            "33 + 55 + 77  + 22 ",  //187
            "11 X 5 + 55 + 55 + 55 ", //220

            "(1 - 1 + 1 -1 + 1 - 1 + 1 - 1 + 2 - 1 - 1) x 9" , //0
            "5 + 6 + 7 + 9 + 10 X 0 +7 + 6 + 5 + 4 ",//0
            "2 + 2 + 2 + 2 + 2 - 8 + 2 + 2 + 2 + 2 " ,  //10
            "3 + 3 + 3 + 3 + 3 + 3 + 3 + 3",  //24
            "1 + 4 + 5 + 6 - 2 - 3 - 4 + 3 + 5 ", //15
            "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8" , //36
            "4 X 5 X 6 ÷ 3 + 40 ÷ 2",   //60
            "8 + 6 + 4 +2 + 7 + 12 + 13 + 15",   //67
            "8 ÷ 2 + (4 X 5 X 3 + 40)",  //104
            "22 + 33 + 55 + 66 - 44 + 11",  //143

            "(3 + 3 - 3 + 3 -3 + 3 + 3 -3 - 3) ÷ 3 ", //1
            "( 4 + 8 - 5 + 2 x 4 ) ÷ 3",  //5
            "5 X 3 + 9 ÷ 3 - 2 X 0 ",  //18
            "8 + 5 - 1 x 0 + 3 + 4 ÷ 2",  //18
            "2 x 6 x 6 ÷ 3 + 2 - 19 + 13" , //20
            "1 x 1 + 1 x 1 + 1 x 1 + 1 x 1" ,//4
            "4 + 5 + 4 + 5 + 4 + 5 + 4 + 5",  //36
            "5 + 1 + 3 + 4 + 9 + 6 + 7 + 2" , //37
            "5 + 8 + 3 + 2 + 1 + 9 + 6 + 3", //37
            "1 + 3 + 6 + 9 + 2 + 5 + 9 + 3", //38

            "8 + 5 + 4 + 7 + 6 + 2 + 5 + 8",  //45
            "4 + 9 + 7 + 5 + 6 + 3 + 3 + 5", //42
            "8 + 4 + 3 + 7 + 6 + 5 + 9 + 3",  //45
            "5 + 8 + 9 + 4 + 1 + 7 + 3 + 9",  //46
            "8 + 9 + 5 + 1 + 1 + 2 + 4 + 3" , //33
            "2 + 7 + 5 + 4 + 6 + 6 + 8 + 9" , //47
            "1 + 9 + 7 + 5 + 6 + 3 + 4 + 4",  //39
            "5 + 2 + 3 + 7 + 2 + 9 + 4 + 8",  //40
            "4 + 9 + 1 + 8 + 5 + 7 + 2 + 6" , //42
            "7 + 6 + 9 + 3 + 2 + 5 + 9 + 2",  //43

            "5 + 4 + 6 + 5 + 7 + 4 + 9 + 3" ,  //43
            "4 + 8 + 3 + 6 + 5 + 9 + 5 + 6 ", //46
            "5 + 2 + 3 + 9 + 6 + 1 + 6 + 8", //40
            "8 + 7 + 5 + 3 + 3 + 6 + 4 + 4",   //40
            "3 + 2 + 1 + 9 + 8 + 6 + 5 + 3" , //37
            "5 + 2 + 3 + 6 + 9 + 4 + 7 + 8" ,//44
            "7 + 6 + 3 + 9 + 8 + 4 + 5 + 3", //45
            "12 + 12 + 12", //36
            "33 + 33 + 33", //99
            "45 + 45 + 45", //135

            "15 + 15 + 15 + 15", //60
            "11 + 11 + 11 + 11+11", //55
            "5 + 50 + 50 + 50", //200
            "41 + 41 + 41", //123
            "55 + 55 + 55 + 55", //155
            "80 + 80 + 80 + 80 + 80" ,//400
            "28 + 28 + 28 + 28", //112
            "35 + 35 + 35 + 35" ,//140
            "44 + 44 + 44 + 44" , //176
            "90 + 90 + 90",  //2700

            "35 + 45 + 55 – 35 ",  //100
            "2002 – 202  +  272  x  0 " ,    //1800
            "102 + 102 + 102 + 102 + 102" , //54
            "44 + 33  -  ( 22  + 11 )", //44
            "722  +  ( 878 - 722 )", //878
            "5,000  -  500  -   50",  //4450
            "44   ÷   4  -  11", //0
            "9 + 9 + 9 + 9 + 9 + 9 + 9" , //63
            '300 ÷ 25 x 12', //144
            "( 20 x 20 ) ÷ ( 20 + 20 )",  //10
            "30 x 6 ÷ 10",  //18

            "1 + 11 +  111  + 1111",   //1234     
            "( 21 + 12 ) + ( 54 + 45 )", //132
            "444  +  555 + 111 + 333", //1443
            "450 + 460 – 405 – 406",    //99
            "545 + 455 - 1000",  //0
            "9 x 2 x 5", //90
            "1 x 8 x 2", //16
            "6 x 5 x 6", //180
            "5 x 2 x 3", //30
            "9 x 3 x 1", //27
            "8 x 5 x 4", //160

            "18 + 18 + 18 + 18 + 18",  //90
            "72 + 72 + 72", //216
            "25 + 25 + 25 + 25 + 25" ,//125
            "22 + 22 + 22 + 22", //88
            "31 + 31 + 31 + 31 + 31", //155
            "30 + 30 + 30", //90
            "36 + 36 + 36 + 36", //144
            "250 x 500", //125000
            "44 x 200" ,//8800
            "30 x 120" ,//3600

            "( 20 x 20 ) ÷ ( 20 + 20 )",  //10
            "30 x 6 ÷ 10 ", //18
            "( 17 + 83 ) + ( 5 x 10)",  //150
            "17 x 25   x  8 x 0 x 5", //0
            "40  x  3 x ( 5 + 3 )", //960
            "(20 x 20)  x  (20 – 20)"  ,//0
            "4 x 5 x 2" ,//40
            "8 x 1 x 3", //24
            "6 x 4 x 5" ,//120
            "7 x 2 x 2", //28
            "4 x 5 x 7" //140
           ];

var arAnswer = [49,11,2,20,34,57,90,100,187,220,
    0,0,10,24,15,36,40,67,104,143,
    1,5,18,18,20,4,36,37,37,38,
    45,42,45,46,33,47,39,40,42,43,
    43,46,40,40,37,44,45,36,99,135,
    60,55,200,123,155,400,112,140,176,2700,
    100,1000,54,44,878,4450,0,63,144,10,18,
    1234,132,1443,99,0,90,16,180,30,27,160,
    90,216,125,88,155,90,144,125000,8800,3600,
    10,18,150,0,960,0,40,24,120,28,140]

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

randomQuiz() 
function randomQuiz() 
{
    item++;
    rdQuiz= Math.floor(Math.random() * quizTest.length);

    document.getElementById('question').innerHTML = "Q" + item;
    document.getElementById('quiz').innerHTML = quizTest[rdQuiz];
    document.getElementById('AnswerFill').value="";
    document.getElementById('question').innerHTML = "Q" + item;

    answer=ansTest[rdQuiz];

    indexQuiz = quiz.indexOf(quizTest[rdQuiz]);
    indexAns = ansTest.indexOf(ansTest[rdQuiz]);

    /*if(i != -1)
     {
        quiz.splice(indexQuiz, 1);
        ansTest.splice(indexAns, 1);
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
        
        var fiveMinutes = 60 * 1,
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