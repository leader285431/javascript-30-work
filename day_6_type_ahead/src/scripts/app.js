var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

var cities = [];

fetch(endpoint)
    .then(function(blob) {
        return blob.json();
    })
    .then(function(data) {
        return cities.push.apply(cities, data);
    })

function findMatches(wordToMatch, cities) {
    return cities.filter(function(place) {
        // here we need to figure out 
        // if the city on state matces what was searched
        var regex= new RegExp(wordToMatch, 'gi');

        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    var matchArray = findMatches(this.value, cities);
    var html = matchArray.map(function(place) {
        var 
            li = document.createElement('li'),
            spanName = document.createElement('span'),
            spanPop = document.createElement('span'),
            spanhl = document.createElement('span'),

            regex = new RegExp(this.value, 'gi'),
            cityName = place.city.replace(regex, '<span class="hl">' + this.value + '</span>'),
            stateName = place.state.replace(regex, '<span class="hl">' + this.value + '</span>');

        // innerClass
        spanName.className = "name";
        spanPop.className = "population";
        // spanhl.className = 'hl';

        // innerText
        spanName.innerHTML = cityName + ' ' + stateName;
        spanPop.textContent = numberWithCommas(place.population);

        li.appendChild(spanName);
        li.appendChild(spanPop);

        return li.outerHTML;
    },this).join("");

    console.log(this.value);

    if(this.value === "")
        return suggestions.innerHTML = "";
    
    suggestions.innerHTML = "";
    suggestions.innerHTML = html;
}

var searchInput = document.querySelector('.search');
var suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);