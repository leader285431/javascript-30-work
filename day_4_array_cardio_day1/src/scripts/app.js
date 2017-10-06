var datas = require('./data');

// intorduce data
var inventors = datas.inventors;
var people = datas.people;
var data = datas.data;


// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
var question1 = inventors.filter(function(inventor) {
    return inventor["year"] >= 1500 && inventor["year"] < 1600;
});
    
console.log("1. Filter the list of inventors for those who were born in the 1500's");
console.log(question1);
console.log("\n");

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
var question2 = inventors.map(function(inventor) {
    return inventor["first"] + " " + inventor["last"];
});

console.log("2. Give us an array of the inventors' first and last names");
console.log(question2);
console.log("\n");

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
var question3 = inventors.sort(function(a,b) {
    return a.year - b.year;
})

console.log("3. Sort the inventors by birthdate, oldest to youngest");
console.log(question3);
console.log("\n");

// Array.prototype.reduce()
// 4. How many years did all the inventors live?
var question4 = inventors.reduce(function(acc, inventor) {
    return acc += inventor.passed - inventor.year;
}, 0)

console.log("4. How many years did all the inventors live?");
console.log(question4);
console.log("\n");

// 5. Sort the inventors by years lived
var question5 = inventors.sort(function(a, b) {
    return ( a.passed - a.year ) - ( b.passed - b.year );
});

console.log("5. Sort the inventors by years lived");
console.log(question5);
console.log("\n");

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
var boulevardsData = ["Boulevard Auguste-Blanqui", "Boulevard Barbès", "Boulevard Beaumarchais", "Boulevard de l'Amiral-Bruix","Boulevard des Capucines", "Boulevard de la Chapelle", "Boulevard de Clichy", "Boulevard du Crime", "Boulevard Haussmann", "Boulevard de l'Hôpital", "Boulevard des Italiens", "Boulevard de la Madeleine", "Boulevard de Magenta", "Boulevard Montmartre", "Boulevard du Montparnasse", "Boulevard Raspail", "Boulevard Richard-Lenoir", "Boulevard de Rochechouart", "Boulevard Saint-Germain", "Boulevard Saint-Michel", "Boulevard de Sébastopol", "Boulevard de Strasbourg", "Boulevard du Temple", "Boulevard Voltaire", "Boulevard de la Zone"];

var question6 = boulevardsData.filter(function(item) {
    return item.includes('de');
})

console.log("6. create a list of Boulevards in Paris that contain 'de' anywhere in the name");
console.log(question6);
console.log("\n");

// 7. sort Exercise
// Sort the people alphabetically by last name
var question7 = people
    .map(function(person) {
    return person.split(", ");
})
    .sort(function(a, b) {
    return a[1] > b[1] ? 1 : -1;
});

console.log("7. sort Exercise");
console.log(question7);
console.log("\n");

// 8. Reduce Exercise
// Sum up the instances of each of these
var question8 = data.reduce(function(acc, curr) {
    // property first is set up to be undefined
    // if(!undefined) make undefined initialize to 0
    if(!acc[curr]) acc[curr] = 0;
    acc[curr] ++;
    return acc;
}, {});

console.log("8. Reduce Exercise");
console.log(question8);
console.log("\n");