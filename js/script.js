function getData(file) {

    // Skapar en url med rätt info
    var link = "https://cgi.arcada.fi/~pihlnikl/Visualisering/projekt_3/fram.json";
    var array = JSON.parse(Get(link)); // Skickar en url till Get-funktionen och parsar svaret
    var data = []; // Skapar en ny lista

    // Loopar genom varje array och tillsätter keys
    for (var i in array){
        data[i] = [
            { 
                time: new Date(array[i][0]*1000), 
                low: array[i][1],
                high: array[i][2],
                open: array[i][3],
                close: array[i][4],
                volume: array[i][5]
            }
        ];
    }
    // console.log(data[0][0].low);
    return data;
}

function Get(url)   {
    // En funktion för att GET från en url
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

console.log(getData("fram.json"));