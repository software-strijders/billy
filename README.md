# Project Frontend development

![Banner](logo/billy-banner.png)
![Node version](https://img.shields.io/npm/v/npm)
![Snowpack version](https://img.shields.io/npm/v/snowpack?label=Snowpack)
![Lit element version](https://img.shields.io/npm/v/lit-element?label=Lit%20element)
![Lit HTML version](https://img.shields.io/npm/v/lit-html?label=Lit%20html)

## Inhoudsopgave

- [Introductie](#introductie)
- [De applicatie](#de-applicatie)
- [Het team](#het-team)
- [Git strategie](#git-strategie)
- [Scrum](#scrum)
- [Documentatie](#documentatie)
  - [Visie/Scope document](#visiescope-document)
  - [Functioneel ontwerp](#functioneel-ontwerp)
- [Git](#git)
- [Codebase](#codebase)
  - [Formatting](##formatting)
  - [Code conventies](##code-conventies)
- [Installatie](#installatie)
- [Gebruikersinstructies](#gebruikersinstructies)
- [Features](#features)
  - [Mobiel](#mobiel)
  - [Progressieve Web App](#progressieve-web-app)
  - [Zoeken](#zoeken)
  - [Hoog contrast mode](#hoog-contrast-mode)
  - [Preview](#preview)
  - [Leestijd indicator](#leestijd-indicator)
  - [Laatst gewijzigd](#laatst-gewijzigd)
  - [Aanpassen](#aanpassen)
  - [Verwijderen](#verwijderen)
  - [Balans en Design](#balans-en-design)
  - [Transitie](#transitie)
  - [Test scores](#test-scores)
## De applicatie

De applicatie is op de volgende plekken te vinden:
- [billy.software-strijders.nl](billy.software-strijders.nl)
- [wiki-billy.herokuapp.com](wiki-billy.herokuapp.com)

## Introductie

HBO-I heeft een wiki die hoognodig toe is aan vervanging. Met dit project zullen wij een goede vervanging hiervoor aanbieden. Het doel is om een wiki te ontwerpen en ontwikkelen die de huidige wiki van HBO-I kan vervangen. Tevens zal een nieuw design en een nieuwe applicatie voor meer verkeer zorgen zodat de goede bedoelingen van HBO-I beter tot uiting komen. 

De focus van dit project ligt zwaar op toegankelijkheid. De webapplicatie zal dan ook volledig navigeer- en bruikbaar zijn voor mensen die bijvoorbeeld gebruik maken van een screenreader. Er zijn ook extra features toegevoegd zoals een hoog contrast mode waardoor mensen die geen screenreader nodig hebben, maar wel lastig kleuren kunnen onderscheiden ook probleemloos de webapplicatie kunnen gebruiken.

De opdrachtgever heeft aangegeven dat de website snel en niet zwaar moet zijn. Hiermee voldoen we aan een andere manier dan de traditionele vorm van toegankelijkheid. Wij gebruiken Axe en Lighthouse om onze webapplicatie te controleren op performance, toegankelijkheid, zoekmachine optimalisatie en best practises volgens Google. 

Dit project zal worden gebruikt als een wiki voor alle HBO-i aangesloten hogescholen in Nederland.

Met de hierbovenstaande uitleg komen ook de volgende harde eisen kijken:

- Het moet een wiki worden waar de pagina's bewerkt kunnen worden.
- Pagina's moeten alleen door ingelogde gebruikers bewerkt kunnen worden.
- De wiki moet doorzocht kunnen worden.
- De wiki moet (HBO-i) categoriëen hebben.
- De wiki moet open-source zijn.
- De wiki moet voldoen aan de toegangelijksheid-eisen.
- De wiki moet demonstreerbaar snel zijn waardoor er zo min mogelijk energie wordt gebruikt.

## Het team

Dit project wordt gemaakt door een groep van vijf, elke met zijn eigen sterktes en zwaktes die elkaar complementeren.

Het groepje bestaat uit de volgende mensen:

- Xander Vedder ([@xandervedder](https://github.com/xandervedder))
- Jort Willemsen ([@JortWillemsen](https://github.com/JortWillemsen))
- Milan Dol ([@JustMilan](https://github.com/JustMilan))
- Ruben van den Brink ([@Rubenvdbrink](https://github.com/Rubenvdbrink))
- Arjen Norbart ([@arjennorbart](https://github.com/arjennorbart))

## Git strategie

Voor onze Git strategie gebruiken we een gemodificeerde versie van `git flow`. In onze strategie gebruiken we de volgende branches:

- `Main branch`
- `Development branch`
- `Feature branches`

Wat op de `main` branch staat, zal op Heroku gaan draaien. Op de `main` branch staat alleen stabiele werkende code. Dit wordt stabiel gehouden door aan het eind van de sprint de `development` branch te mergen met de `main` branch. Deze krijgt dan een versie op de laatste commit, dit wordt met `git tag` gedaan.

Al het ontwikkel werk wordt in de `development` branch gemerged d.m.v. Pull Requests in Github. Dit wordt gedaan om de master branch zo stabiel mogelijk te houden.

Voor elke `Task` of `User story` worden `feature` branches aangemaakt, hierdoor heeft ieder teamlid zijn eigen branch waar die alles in kan doen (ongestoord). Met deze `feature` branches worden uiteindelijk Pull Requests gedaan. Op de Pull Requests worden minimaal 2 reviewers gevraagd om het na te kijken. Deze reviews zorgen ervoor dat de kwaliteit van de code hoog blijft.

## Scrum

Dit project maakt gebruik van een Agile workflow, waarvan de Scrum methode wordt geïmplementeerd. Dit wordt gedaan door in Github gebruik te maken van [projects](https://github.com/HU-SD-SV2PRFED-studenten-2021/prfed_2021-V2B-1/projects).

Per sprint hebben we een bord waar we kaarten in hebben gezet. Deze kaarten kunnen in verschillende lanes worden gesleept. We hebben de volgende lanes:

- `Backlog` (gedeelt tussen de verschillende sprints)
- `To Do`
- `In progress`
- `Done` (geautomatiseerd)

De meeste User Stories zijn al in de `Backlog` gezet. Deze User Stories hebben weer `Task`'s die bij die User Stories horen, dit doen we om de User Stories behapbaar te maken.

We geven de `Task`'s daarom ook punten zodat we als team weten hoeveel moeite er in gestoken moet worden.

## Documentatie

In dit kopje worden alle zaken omtrent documentatie opgenoemd.

### Visie/Scope document

Het Visie/Scope document is [hier](/documentation/visie-scope-document.pdf) te vinden.

### Functioneel ontwerp

Het Functioneel ontwerp document is [hier](/documentation/functioneel-ontwerp.pdf) te vinden.

## Git

Om de commits zo duidelijk mogelijk te houden, volgen we "tips" van dit [artikel](https://chris.beams.io/posts/git-commit/).

Om onze Git history zo schoon mogelijk te houden, gebruiken we in de feature branches geen `git merge`. In plaats daarvan, gebruiken we `git rebase`. Er wordt alleen vanaf Github gemerged. Zo wordt ervoor gezorgd dat er alleen branches _in_ `development` worden gemerged, en niet andersom.

## Codebase

De root directory van de codebase is [hier](/src) te vinden.

### Formatting

Om de kwaliteit van de code base zo hoog mogelijk te houden, maken we als team gebruik van [prettier](https://prettier.io/). Dit zorgt ervoor dat al onze code op dezelfde lijn gehouden wordt, waardoor verschillen in formatting niet aanwezig zijn.

### Code conventies
Naast de hierboven genoemde manier om code te formatten, gebruiken wij de "BEM" (Blok Element Modifier) methodologie zodat code deelbaar, leesbaar en herbruikbaar blijft.

Ook maken wij gebruik van style variabelen in plaats van alles overal opnieuw te tikken. Dit verbeterd verder de drie hierboven genoemde punten. _Klik [hier](http://getbem.com/) om meer over BEM te leren_

## Installatie

Om het project te installeren, moet het volgende gedaan worden:

```
$ git clone git@github.com:HU-SD-SV2PRFED-studenten-2021/prfed_2021-V2B-1.git
$ cd prfed_2021-V2B-1/
$ npm i
```

## Gebruikersinstructies

Om het project lokaal te draaien moet het volgende gedaan worden (er wordt hier van uitgegaan dat de vorige stappen zijn uitgevoerd):

```
$ npm start
```

Nadat de command is uitgevoerd, wordt jouw voorkeurs browser geopend naar `localhost:8080`. Ook wordt er in de achtergrond een tweede server gestart die op `localhost:3000` draait. Dat is waar de API draait.

# Features

<!-- ![](link naar foto van de billy front page) -->
<!-- ![](link naar foto van de billy front page mobile version) -->

## Mobiel
De website is zowel beschikbaar voor mobiele apparaten als voor desktops. 
In tegenstelling tot veel websites is onze website ook volledig geoptimaliseerd voor Apple devices.

### Progressive Web App
Onze webapp is tevens beschikbaar om te downloaden als progressieve web applicatie. Dit houdt in dat de website te downloaden is als het ware. De website is dus ook tot op bepaalde hoogte bruikbaar als er tijdelijk geen internetverbinding is.

## Zoeken
Onze webapplicatie maakt gebruik van een geavanceerd, maar licht zoek algoritme. Dit algoritme zal de juiste artikelen vinden zelfs als er spelfouten gemaakt zijn. Wij hebben het zo ingesteld dat er tot vier karakters anders mogen zijn om toch tot een juist resultaat te komen. Zo zal de zoekterm `story` nogsteeds tot de zoekresultaten voor `User story` leiden. Ook zal `erna's` toch tot het artikel `persona's` leiden.

## Hoog contrast mode
Ook heeft onze webapplicatie een hoog contrast mode. Hierin wordt alles wit op zwart. Zwart kijkt voor de meeste mensen prettiger. Ook zijn uit gesprekken met mensen die ervaring hebben met het toegankelijk maken van een website gebleken dat er mensen zijn die het wit op een scherm erg slecht kunnen verdragen. Door de contrast mode zo te maken dat het niet veel licht projecteert vangen we twee vliegen in één klap. 

<!-- ![](Hoog contrast foto's?) -->

## Preview
Als er door middel van de zoekbalk of het klikken op een (sub)catagorie gezocht is, wordt er een kleine preview onder het kopje getoond van het artikel.

<!-- ![](foto van een result-item?) -->

## Leestijd indicator
Billy komt onder iedere preview met een verwachte leestijd. Deze leestijd wordt door een algoritme berekend en hiervoor wordt de gemiddelde leessnelheid onder alle Nederlanders genomen.

## Laatst gewijzigd
Naast de leestijd indicator wordt getoond wanneer het artikel voor het laatst gewijzigd is. Dit kan helpen met het inschatten hoe actueel een artikel is. 

<!--  ![](link naar foto van een artikel?) -->

## Aanpassen
Artikelen kunnen worden aangepast. Om open te blijven en tevens misbruik tegen te gaan wordt er naast ieder artikel getoond wie het artikel voor het laatst heeft aangepast. 

## Verwijderen
Artikelen kunnen net zoals dat ze aangemaakt en aangepast worden ook worden verwijderd. Enkel de maker van een artikel kan artikelen verwijderen.

## Balans en Design
Over design valt te twisten. 

Wij hebben gekozen voor een groot en duidelijk design. Dit ziet er gelikt uit en zorgt voor leesbaarheid. 
Wij hebben ons laten reviewen en informeren door een front-end expert. Als feedback op het originele design kregen we dat de grootte van een component moest coresponderen met de belangrijkheid ervan. Het zoeken van artikelen is het belangrijkst op billy. Dit is de reden dat de "home page" in het midden een zoekbalk heeft en onderaan categorieën. Het doel is direct duidelijk en mensen die moeite hebben met lezen worden geholpen door de grootte van alle componenten.

# Transitie
Overgangen van webpagina naar webpagina kunnen vaak wat "hard" aanvoelen. Om onze website prettiger voor het oog te maken hebben wij een heel korte, niet merkbare transitie toegevoegd. Deze transitie is vrijwel onmerkbaar, maar blijkt onbewust veel prettiger en rustiger voor het oog te zijn.

## Test scores
Met een lach op ons gezicht kunnen we u vertellen dat alle scores 100/100 zijn. In de Lighthouse audit van Google hebben performance, toegankelijkheid, best practises en SEO (zoekmachine optimalisatie) allemaal perfect gescoord. De website is dus enorm snel en erg toegankelijk voor iedereen. Mensen die een beperking op enige manier hebben zullen dus geen mindere gebruikers ervaring hebben. 

<!-- ![](link foto van alle scores 100) -->

Stichting accessibility heeft onze website ook gereviewd. Alle feedback is opgenomen en verwerkt.