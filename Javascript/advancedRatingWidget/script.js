const data = {
    ratings : [0, 0, 0, 0, 0],
    avg : 0,
    ttal : 0
},

targetAvg = document.getElementById("avgRatingFrame__rating");
targetRatings = document.getElementsByClassName("ratingBar");



function calcAvg(data){
    let sum = 0;
    let i = 0;
    for(r of data.ratings){
        sum+=r*(5-i);
        console.log(r, 5-i, r*(5-i));
        i++;
    }
    return Math.round(sum/data.ttal*10)/10;
}

function calcTtal(range){
    let sum = 0;
    for(n of range){
        sum+=n;
        console.log(n, sum);
    }
    return sum;
}

function genRatings(range){
    for(i in range){
        range[i] = Math.round(Math.random()*1000);
    }

    return range;
}

function prntData(data, targetAvg, targetRatings){

    targetAvg.textContent = data.avg;
    
    let i=0;
    for(r of targetRatings){
        let width = data.ratings[i]/data.ttal*100;
        width = "width : " + width + "%";
        r.children[2].children[0].setAttribute("style", width);
        r.children[3].textContent = data.ratings[i];
        ++i;
    }
}

data.ratings = genRatings(data.ratings);

data.ttal = calcTtal(data.ratings);
data.avg = calcAvg(data);

prntData(data, targetAvg, targetRatings);