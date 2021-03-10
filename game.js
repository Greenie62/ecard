var gameBoard = document.querySelector(".gameBoard");
var cindy = document.querySelector(".cindywhite");
var searchLetterDOM = document.querySelector(".searchLetter")


var str = prompt('say something')
var leftMarker = 0;
var topMarker = 0;
var gameTilesArr=[];
var moveLeft=true


for(let i=0;i<str.length;i++){
    let gameTile = document.createElement("div");
    gameTile.style.left=`${leftMarker}px`
    gameTile.style.top=`${topMarker}px`
    if(str[i] === " "){
        gameTile.className='whiteSpace'
        gameBoard.appendChild(gameTile)

    }
    // else if(str[i+1] === ","){
    //     gameTile.setAttribute("data-text",`${str[i-1]}${str[i]}`)
    //     gameBoard.appendChild(gameTile)

    // }
    else if(str[i] === ","){
        console.log("dont do anything.")
    }
    else{
        gameTile.className='gameTile'
        gameTile.setAttribute("data-text",str[i])
        gameBoard.appendChild(gameTile)

    }
    leftMarker += 50;
    if(leftMarker > 350){
        leftMarker = 0;
        topMarker+=40
    }
    gameTilesArr.push(gameTile);
    console.log(gameTilesArr)
}



var litTiles=[]
var counter = 0;




function moveCindy(destination){
    console.log("destination:", destination.leftVal)
    let cindyLeft = parseInt(window.getComputedStyle(cindy).getPropertyValue("left"));
    
    console.log(cindyLeft,destination)
    if(cindyLeft < destination.leftVal){
        cindyLeft=cindyLeft + 2;
        cindy.style.left=`${cindyLeft}px`
        setTimeout(()=>{moveCindy(destination)},3)
    }

   else if(cindyLeft > destination.leftVal){
        cindyLeft=cindyLeft - 2;
        cindy.style.left=`${cindyLeft}px`
        setTimeout(()=>{moveCindy(destination)},3)
    }
    else{
        console.log("shes done")
        litTiles[counter].el.innerHTML = litTiles[counter].el.getAttribute('data-text')
        if(counter < litTiles.length-1){
            console.log("before it crashes")
            counter++
            moveCindy(litTiles[counter])
        }
        else{
            console.log("pick a new letter")
            counter=0;
            alphaCounter++
            if(alphabet[alphaCounter] === undefined){
                console.log("stop the madness")
                return;
            }
            else{
            highlightPuzzle(alphabet[alphaCounter])
            }
        }

    }
}


function highlightPuzzle(letter){
    console.log("highlightpuzzle started!",letter)
    searchLetterDOM.innerHTML = `- ${letter} -`
    let gameTiles = document.querySelectorAll(".gameTile");
    let noLetters = true;
    gameTiles.forEach((tile,idx)=>{

        if(tile.getAttribute("data-text") === letter){
            noLetters = false;
            tile.style.backgroundColor='orange'
            litTiles.push({leftVal:parseInt(window.getComputedStyle(tile).getPropertyValue("left")),el:tile})
        
        }
    })
    if(litTiles.length){
    litTiles.sort((a,b)=>a.leftVal-b.leftVal)
    console.log(litTiles)
    moveCindy(litTiles[counter])
    }
    else{
        console.log("no letters")
        alphaCounter++
        highlightPuzzle(alphabet[alphaCounter])
    }
}


 //highlightPuzzle("o")


let alphabet='abcdefghijklmnopqrstuvwxyz'.split("");
let alphaCounter=0;


// alphabet.split("").forEach(letter=>{
//     
//     highlightPuzzle(letter)
// })

 highlightPuzzle(alphabet[alphaCounter])