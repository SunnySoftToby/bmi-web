function btnClick(){
    var height = parseInt(document.getElementById('heightText').value);
    var weight = parseInt(document.getElementById('weightText').value);
    var date = new Date();
    date = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
    var btn = document.querySelector('.button');
    if(isNaN(height) || isNaN(weight)){
        alert('不可輸入非數字或留白!');
        return;
    }
    var bmi = weight/(height/100)**2;
    bmi = bmi.toFixed(2);
    
    btn.style.display = 'none';
    var newBtn = document.querySelector('.btn');
    var resetBtn = document.querySelector("#reset");
    var result = document.querySelector('.result');
    var rank = document.querySelector('.rank p');
    result.textContent = bmi;
    if(bmi < 18.5){
        newBtn.style.color = '#31BAF9';
        resetBtn.style.backgroundColor = '#31BAF9';
        rank.textContent = '過輕';

    }else if(18.5 <= bmi && bmi <24){
        newBtn.style.color = '#86D73F';
        resetBtn.style.backgroundColor = '#86D73F';
        rank.textContent = '理想';
    }
    else if(24 <= bmi && bmi < 28 ){
        newBtn.style.color = '#FF982D';
        resetBtn.style.backgroundColor = '#FF982D';
        rank.textContent = '過重';
    }else{
        newBtn.style.color = '#FF6C03';
        resetBtn.style.backgroundColor = '#FF6C03';
        rank.textContent = '肥胖';
    }
    document.querySelector('.newBtn').style.display = 'block';
    rank.style.display = 'block';

    var temp = {
        result: rank.textContent,
        BMI: bmi,
        weight: weight,
        height: height,
        date: date
    }
    record.push(temp);
    localStorage.setItem('history',JSON.stringify(record));
    updateHistory();
}

function updateHistory(){
    document.querySelector('.history').innerHTML ='';
    for(var i = 0; i< record.length; i++){
        var copy = document.querySelector('.historyReslult').cloneNode(true);
        copy.style.display = 'flex';
        copy.setAttribute('data-num',i+1);
        copy.querySelector('.pRank span').textContent = record[i].result;
        copy.querySelector('.pBMI span').textContent = record[i].BMI;
        copy.querySelector('.pWeight span').textContent = record[i].weight;
        copy.querySelector('.pHeight span').textContent = record[i].height;
        copy.querySelector('.pDate div').textContent = record[i].date;
        if(record[i].result == "理想"){
            copy.style.borderLeft = '6px #86D73F solid';
        }
        else if(record[i].result == "過輕"){
            copy.style.borderLeft = '6px #31BAF9 solid';
        }
        else if(record[i].result == "過重"){
            copy.style.borderLeft = '6px #FF982D solid';
        }
        else if(record[i].result == "肥胖"){
            copy.style.borderLeft = '6px #FF6C03 solid';
        }
       
        
        document.querySelector('.history').appendChild(copy);
    }
}

function resetClick(){
    var btn = document.querySelector('.button');
    var resultBtn = document.querySelector('.newBtn');
    var rank = document.querySelector('.rank p');
    btn.style.display = 'block';
    resultBtn.style.display = 'none';
    rank.textContent = '';
    document.querySelector('#heightText').value = '';
    document.querySelector('#weightText').value = '';
}

function clearClick(){
    document.querySelector('.history').innerHTML ='';
    record = [];
    localStorage.setItem('history',null);
}

document.querySelector('.button').addEventListener("click",btnClick);
document.querySelector('#reset').addEventListener("click",resetClick);
document.querySelector('#label a').addEventListener("click",clearClick);

var record = JSON.parse(localStorage.getItem('history'));
record = (record == null)? [] : record;
updateHistory();





