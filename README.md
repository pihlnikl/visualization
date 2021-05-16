# Visualisering av information 
## Projekt 3 - Force-directed graph

### Datan
Datan för karaktärer fick jag från https://github.com/Nab-88/social-graphs-and-interactions/blob/master/datasets/lotr_scripts.csv
Datan var i csv-form, men jag ändrade den till JSON via nätet eftersom jag gillar att arbeta med JSON mera.

Datan för böckerna fick jag från https://github.com/MokoSan/FSharpAdvent/blob/master/Data/LordOfTheRingsBook.json
Denna data var redan färdigt i JSON format och var mycket lätt att hantera.

Jag valde denna data eftersom jag gillar Tolkiens böcker, och eftersom min sankey som jag planerat göra misslyckades. 


### Visualisering
Jag valde att göra en force-directed graph eftersom detta kändes mest logiskt för denna data. Datan visualiserar hur ofta karaktärer från LotR böckerna umgås (character co-occurence(CCO)).

### Prestation
Resultatet blev kanske lite oklart. Problemet är att jag kollade CCO enligt kapitel, vilket betyder att många linkar inte nödvändigtvis påriktigt har träffats i boken. 

Ett annat problem som förblev oavklarat var grupper. Jag ville gruppera karaktärena på något sätt, men kom på för sent att datan som jag använde inte var tillräckligt omfattande för detta skäl.

Det var problematiskt att kolla varje CCO, och logiken tog längre än nödvändigt att komma på. Jag fixade dock detta m.h.a. en massa tänkande, en massa for loops och en massa if satser.

Förrutom dessa var det relativt lätt att fixa resten av projektet m.h.a. exemplen från lektionerna, nätet och egen kunskap.

### Självutvärdering
3.5 - 4.5 beroende på om utseendet eller tekniken är viktigare. 

Koden fungerar tekniskt väldigt bra och är relativt lätt att modifiera för annan data. Själva koden ser dock kanske mera ut som ett python program än javascript :D

Visualiseringen visar någotlunda det som den skall. På grund av en stor mängd karaktärer och CCO, blev grafen dock lite otydlig. Jag försökte förbättra detta med mouseover funktioner, men det hjälpte ändast lite.

Innehållet rör sig, har mouseovers och kan ändras. Dessa var krav för projektet, men jag kom inte på något annat som skulle ha kunna tillsats (kanske drag-funktion, men till vilket ändamål?)

Teknik: 5
Visualisering: 3.5
Kreativitet: 2
Rapport: 4