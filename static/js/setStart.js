var db = firebase.database();

var db = firebase.database();

init_db() 

function init_db() 
{
    db.ref('judger').set(
    {
        start: false                                                                   
        
    });
    document.getElementById('gameStart').innerHTML = ""
}


function start() 
{
    db.ref('judger').set({
        start: true
    });
    document.getElementById('gameStart').innerHTML = "Game Start!"
}
