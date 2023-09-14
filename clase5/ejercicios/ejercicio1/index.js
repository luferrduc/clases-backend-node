
// Llenar el objeto con los
let result = {

}

for(let i = 0; i<10000; i++){
    const randomNumber = Math.round(Math.random()*20)
    if(!result[randomNumber]){
        result[randomNumber] = 1
    }else{
        result[randomNumber] += 1
    }

}

console.table(result)