# Eratosthenes si Visualisering

Eratosthenes si er både en matematisk metode og en algoritme, der benyttes til at finde primtal i en talrække.

I dette projekt har jeg lavet et [lille program](https://markusingerslev.github.io/Eratosthenes-si/), der kan tage en mængde tal mellem `2 og n` _**(brug indsat tal)**_. Ud fra dette tal vil programmet, så tag talet og multipla med sig selv et antal af gange. Således at alle tal der er divider bare med tallet, vil blive fjernet fra talrækken. Dette vil den fortsætte med til den har kørt alle tallene fra talrækken igennem.

Algoritmen ved at der kun er primtal tilbage i listen når `p^2 > n`, hvor p betyder primtal. Altså når algoritmen når til et tal, hvor alle sammensatte muligheder af `n` allerede er blevet markeret som forskellige multipla af mindre primtal, så ved algoritmen at alle tilbageværende tal i listen må være primtal.

#### Eksempel for at finde primtal

Vi har en liste af tal `array = [2, 3, 4, ... , 30]`

1. Start med 2:
    - 2 er det første primtal
    - Marker alle multipla af 2 større end eller lig med `2^2 = 4` 
    - Marker følgende tal i listen ` 4, 6, 8, ... , 30`
2. Næste ikke-markerede tal er 3:
    - 3 er et primtal
    - Marker alle multipla af 3 større end eller lig med `3^2 = 9`
    - Marker følgende tal i listen `9, 15, 21, ... ,27`
3. Næste ikke-markerede tal er 5:
    - 5 er et primtal
    - Marker alle multipla af 5 større end eller lig med `5^2 = 25`
    - Marker følgende tal i listen `25`
4. Næste ikke-markerede tal er 7:
    - 7 er et primtal
    - Men da `7^2 = 49` er større end n (30) skal algoritmen stoppe.
    - Ikke-markerede tal i listen er alle primtal

