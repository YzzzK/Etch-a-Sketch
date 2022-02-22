const gridContainer=document.querySelector('.gridContainer')
const clearedBtn=document.querySelector('.clearedBtn')
const randomColor=document.querySelector('.randomColor')
const userColorChoice=document.querySelector('.userColorChoice')
const darker=document.querySelector('.darker')
//Set the current color
let currentColor;
let numberOfRow=16; // initial row
let numberOfColumn=16;// initial column
createBoard(numberOfRow,numberOfColumn)

//Create board
function createBoard(row,column){
    gridContainer.style.height=`${gridContainer.offsetWidth}px`
    if(document.body.offsetHeight<document.body.offsetWidth) gridContainer.style.width=`${gridContainer.offsetHeight}px`
    for(let i=0;i<row;i++){
        let gridRow = document.createElement('div');
        gridRow.classList.add(`gridRow`)
        gridContainer.append(gridRow);
        for(let j=0;j<column;j++){
            let square=document.createElement('div');
            square.classList.add('square');
            if(i%2==0){
                if(j%2!==0) square.classList.add('grayBackground')
            }else{
                if(j%2==0) square.classList.add('grayBackground')
            }
            
            gridRow.append(square)
            square.addEventListener('mouseover',()=>{
                square.style.backgroundColor='black'
            })
        }
    }
    
}
//In case any rotation happens
window.addEventListener('resize',()=>{
    console.log(gridContainer.offsetWidth)
    gridContainer.style.height=`${gridContainer.offsetWidth}px`
    if(document.body.offsetHeight<document.body.offsetWidth) gridContainer.style.width=`${gridContainer.offsetHeight}px`
    else if(document.body.offsetWidth<=500) {
        gridContainer.style.width='90%'
        gridContainer.style.height=`${gridContainer.offsetWidth}px`
    }
})
//square
function setHoverEffect(color){
    const squares = document.querySelectorAll('.square')
    squares.forEach((square)=>{
        square.removeEventListener('mouseover',changeBackground);
        let red=60;
        let green=60;
        let blue=60;
        
        square.addEventListener('mouseover',changeBackground)
        function changeBackground(){
            try{
                if(color()[0]!='#'){
                    if(square.style.backgroundColor=='rgb(0%,0%,0%)') {
                        return;
                    };
                    red-=6;
                    green-=6;
                    blue-=6;
                    square.style.backgroundColor=color(red,green,blue)
                }
                else{
                    square.style.backgroundColor=color()
                }
            }catch{
                square.style.backgroundColor=color
            }
            
        
    }
    })
}

document.body.style.backgroundColor='rgb(30%,25%,100%)'

//Random color
function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber =Math.floor( Math.random() * maxVal); 
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
randomColor.addEventListener('click',()=>{
    setHoverEffect(generateRandomColor)
    currentColor=generateRandomColor
})

//user choosing color
userColorChoice.addEventListener('change',(e)=>{
    function colorCode(){
        return e.target.value
    }
    setHoverEffect(colorCode)
    currentColor=colorCode
    
})
function darkerColor(r,g,b){
    return `rgb(${r}%,${g}%,${b}%)`
}
//darker


darker.addEventListener('click',()=>{
    

    setHoverEffect(darkerColor)
    currentColor=darkerColor
})



//Clear the board
clearedBtn.addEventListener('click',()=>{
    gridContainer.innerHTML=''
    createBoard(numberOfRow,numberOfColumn)
    setHoverEffect(currentColor)
})

//Change the board according to the ratio

const options = document.querySelectorAll('option')
options.forEach((option)=>{
    
    option.addEventListener('click',()=>{
        let optionValue = option.value; numberOfColumn=optionValue;numberOfRow=optionValue;
        
        if(optionValue=='ratio') return;
        //else if(optionValue=='customize') {}
        gridContainer.innerHTML=''
        
        createBoard(+optionValue,+optionValue)
        setTimeout(() => {
            clearedBtn.click()
        }, 500);
    })
})

