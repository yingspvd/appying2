var db = firebase.database();

init_db() 

function init_db() 
{
    db.ref('judger').set(
    {
        start: false                                                                   
        
    });
    document.getElementById('gameStart').innerHTML = "";
}


function start() 
{
    db.ref('judger').set({
        start: true
    });
    document.getElementById('gameStart').innerHTML = "Game Start!"

    
    db.ref('question/' ).set({
        que: 0
    });
    window.location.href = "http://localhost:8000/wait" + userName;
    //window.location.href = "http://localhost:8000/quiz" + userName;

}

