function getData(chosenbook) {
    // Skapar en url med rätt info
    var link = "https://raw.githubusercontent.com/pihlnikl/visualization/master/lotr.json";
    var array = JSON.parse(Get(link)); // Skickar en url till Get-funktionen och parsar svaret
    // Arrays för att hålla vår data
    var book = [];
    var chars = [];
    var charId = [];
    
    // Samma för karaktär-datasettet
    var charLink = "https://raw.githubusercontent.com/pihlnikl/visualization/master/lotrchars.json";
    var charArray = JSON.parse(Get(charLink));

    // Formaterar data
    chars.push(characters(charArray));
    book.push(books(array, chosenbook));

    // Räknar alla gånger då 2 karaktärer nämns i samma kapitel
    var occurence = charLinks(book[0], chars[0]);

    // Omformaterar chars-arrayn för att lägga till id
    for (var j in chars[0]) {
        charId.push({"id": chars[0][j]});
    }
    
    return {"nodes": charId, "links": occurence};
}

// Funktion som loopar booken och returnerar varje kapitel
function books(array, bookname) {
    var book = [];
    for (var i in array) {
        if(array[i].BookName.Case == bookname) {
            book.push(array[i]);
        }
    }
    return book;
}

// Funktion som loopar varje karaktär och omformaterar datan (Gör namnen snyggare)
function characters(array) {
    // Börjar med en ny array
    var chars = [];
    // Loopar varje rad för att hitta namn.
    // Om namnet inte finns i array pushas den dit
    for (var i in array) {
        // Datasetet hade alla namn med caps, måste därför ändra till title form
        if(chars.includes(array[i].char.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }))) {
        } else {
            chars.push(array[i].char.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }));
        }
    }
    return chars;
}

// Funktion som söker alla karaktärer som nämns i samma kapitel
function charLinks(book, chars) {
    var links = [];
    // Börjar genom att loopa varje kapitel
    for (var i in book) {
        // Omformaterar nu redan datan att bli passlig för denna typs graf
        var source;
        var target;
        // Sedan loopar vi varje karaktär
        for(var j in chars) {
            var value = 0;
            // Om karaktären nämns i kapitlet tillsätter vi hen som source
            if(book[i].ChapterData.includes(chars[j])) {
                source = chars[j];
                // Sedan loopar vi genom alla andra karaktärer som nämns i kapitlet och tillsätter hen som target
                for(var k in chars) {
                    // Value säger hur ofta dessa karaktärer nämns i samma kapitel
                    value++;
                    if(chars[k] != chars[j] && book[i].ChapterData.includes(chars[k])) {
                        target = chars[k];
                        // Pushar sedan datan i en sådan form som går att användas
                        links.push({"source": source, "target": target, "value": value});
                    }
                }
            }
        }
    }
    return links;
}

function Get(url)   {
    // En funktion för att GET från en url
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

// Funktion som ritar grafen
function drawGraph(value) {
    var data = getData(value),
        // Kollar att ändast namn som har links blir nodes (vi vill ju inte ha nodes utan links)
        nodes = data.nodes.filter(function(d) {
            if(d3.set(data.links.map(function(v) { return v.source; })).values().includes(d.id) | d3.set(data.links.map(function(m){ return m.target; })).values().includes(d.id)) {
                return d.id;
            }
        }),
        height = 600,
        width = 1000;

    // Basen för själva grafen
    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(350))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));
    
    // En viewbox
    var svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    // var för links. 
    var link = svg
        .selectAll('path.link')
        .data(data.links)
        .enter()
        .append('path')
            .attr('stroke', '#999')
        // Linkens stroke-width bestäms enligt value, alltså hur ofta dessa 2 personer nämns i samma kapitel
            .attr('stroke-width', d => (Math.sqrt(d.value))/10);

    // var för nodes
    var node = svg
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
            .attr('r', 15)
            .attr('fill', 'blue')
            .attr('fill', 'black')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
        // En mouseover funktion för att highlight nodens linkar. Gör linkarna tjockare och byter färg
        .on('mouseover', function(d) {
            link.style('stroke-width', function(l){
                if (d === l.source || d === l.target){
                    return 3;
                }
                
            });
            link.style('stroke', function(l){
                if (d === l.source || d === l.target){
                    return 'red';
                }
                
            });
        })
        // Tillbaka till normalt då mouseout
        .on('mouseout', function() {
            link.style('stroke-width', d => (Math.sqrt(d.value))/10);
            link.style('stroke', '#999');
        });
    // Namnger nodes enligh d.id
    node.append("title")
        .text(d => d.id);
    
    // Genererar linjerna (links)
    const lineGenerator = d3.line();

    simulation.on('tick', () => {
        node.attr('cx', d => d.x);
        node.attr('cy', d => d.y);
        link.attr('d', d => lineGenerator([
            [d.source.x, d.source.y],
            [d.target.x, d.target.y]])
        );
    });
}
// Funktion som bestämmer vilken data som skall användas
// Fungerar be onchange i index.html
function main(value) {
    document.getElementById("chart").innerHTML = "";
    drawGraph(value.value);
}
// En init som initialiseras genast
window.onload = function() { drawGraph("TheFellowshipOfTheRing"); };