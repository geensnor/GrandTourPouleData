# Configuratie bestanden tourpoule

## Algemeen

- In currentTour.yaml wordt de locatie van de huidige tour bepaald. De tour waar naar wordt verwezen, moet een tourConfig.yaml en minimaal 1 etappe hebben om alles goed te laten werken.

## Per tour

- cyclists.yaml voor alle ploegen en renners die starten aan aan de tour. De [Tourtool](http://geensnor.nl/tourtool/) kan je helpen met renners in het juiste formaat te zetten.
- tourConfig.yaml om een aantal tour specifieke variabelen vast te leggen. Als status "open" is, kunnen deelnemers zich inschrijven.
- Tour is voorbij als de laatste etappe de status "finished" heeft.
- Voordat de tour begint kan de [Stages Scraper](https://github.com/geensnor/Stages-Scraper) gebruikt worden om alle etappes van een tour op te halen. Deze tool maakt alle yaml bestanden voor de etappes aan.
- dropouts.yaml om de uitgevallen renners in vast te leggen.

## Per etappe

- Elke etappe heeft een eigen yaml bestand in de stages directory waarin de uitslag en een aantal andere variabelen worden vastgelegd.
- Etappe is is altijd zichbaar in de tour en moet dus ook voor de start zijn opgevoerd. Als hij de status "finished" heeft, worden de uitslagen meegeteld en krijgt in in de tourpoule een finishvlag.
- De [Tourtool](http://geensnor.nl/tourtool/) kan ook de winnaars van een etappe scrapen.

## Let op

De naam van de renners wordt gebruikt als key. Deze moet dus uniek zijn en in de etappeuitslag exact hetzelfde geschreven worden als in de lijst met renners (cyclists.yaml). Copy pasten werkt in zo'n geval vaak prima.
