

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
var allNum; //ตัวแปรเก็บว่าจะมีตัวเลขกี่ตัว
console.log(name);

//document.getElementById('quiz').innerHTML = quiz[i];
prev.push(i);

allNum= Math.floor(Math.random() *3+3);
console.log(allNum)
randomQuiz(allNum)

function isOperator(op) {
    switch (op) {
        case "+": case "-": case "x": case "/": return true;
        default: return false;
    }
}

function infixToPostfix(str) {
    let infix = str.split(" "); // 55 + 9
    let postfix = new Array(); //""
    let stack = new Array();
    for (var i = 0; i < infix.length; i++) {
        var c = infix[i];
        if (isOperator(c)) {
            if (stack.length != 0) {
                while (precedence(c) <= precedence(stack[stack.length - 1])) {
                    postfix.push(stack.pop());
                }
            }
            stack.push(c);
        } else {
            postfix.push(c);
        }
        console.log(postfix);
    }
    while (stack.length != 0) {
        postfix.push(stack.pop());
    }
    return postfix;
}

function precedence(operator)
{
    switch (operator) {
        case "^":
            return 3;
        case "x":
        
            return 2;
        case "+":
        case "-":
            return 1;
        default:
            return 0;
    }

}

function calculate(postfix){
    let stack = new Array();
    for(var i = 0; i<postfix.length; i++){
        var c = postfix[i];
        console.log(c);
        if(isOperator(c)){
            let y = stack.pop();
            let x = stack.pop();
            console.log(x+" "+c+" "+y)
            let ans = 0;
            switch(c){
                case "+": ans = parseFloat(x)+parseFloat(y); break;
                case "-": ans = parseFloat(x)-parseFloat(y); break;
                case "x": ans = parseFloat(x)*parseFloat(y); break;
                default: ans = 0;
            }
            stack.push(ans);
        }else{
            stack.push(c);
        }
        
    }
    return parseFloat(stack.pop()).toFixed(0);
}

function randomQuiz() 
{
    item++;
    document.getElementById('question').innerHTML = "Q" + item;
    document.getElementById('AnswerFill').value="";

    let quiz = "";
    for(var i = 0; i<allNum-1; i++)
    {
        quiz = quiz + Math.floor(Math.random()*15 + 1) + " ";
        quiz = quiz + randomOp() + " ";
    }
    quiz = quiz + Math.floor(Math.random()*15 + 1);
    console.log(quiz)
    document.getElementById('quiz').innerHTML = quiz;

    //คำตอบ
    answer=calculate(infixToPostfix(quiz));
    console.log("answer "+answer)

    return quiz;

    

}

function randomOp()
{
    let op = Math.floor(Math.random()*3);
    switch(op){
        case 0: return "+";
        case 1: return "-";
        case 2: return "x";
        //case 3: return "/";
        default: return "";
    }
}


//กด Enter
document.getElementById('AnswerFill').addEventListener("keyup", function(event) 
{
    event.preventDefault();
    if (event.keyCode === 13) {
      checkAnswer();
    }
});

function checkAnswer() 
{
    var check = 0;
    var ansfill = document.getElementById('AnswerFill').value;
    allNum= Math.floor(Math.random() *3+3);
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
            { document.getElementById('showWrong').innerHTML = "" , randomQuiz(allNum); }, 800);
            
        } 
        
        else 
        {
            console.log("Wrong");

            document.getElementById('AnswerFill').value="";
            document.getElementById('showWrong').innerHTML = "Wrong";
            document.getElementById('showWrong').classList.remove('shCorrect')
            document.getElementById('showWrong').classList.add('shwrong')
            
            setTimeout(function() 
            { document.getElementById('showWrong').innerHTML = "" , randomQuiz(allNum); }, 800);
            
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