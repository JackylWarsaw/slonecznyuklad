//Gra memory to tak naprawdÄ gra, ktĂłra polega na wyborze dwĂłch kart i sprawdzeniu czy sÄ takie same.
//Losowanie - ukĹadu zbudowanego zestawu 18 kart. 9 par. (9 kolorĂłw)
//Sprawdzenie czy wybraliĹmy dwie takie same karty - jeĹli wygraliĹmy to wyĹÄczamy, jeĹli nie to obie karty wracajÄ do gry
//mierzym czas, sprawdzaqmy czy to nie koniec

/* Krok po kroku do zrobienia */

//1. podstawowe dane: tablica z kolorami, pobranie divĂłw, zamiana listy wÄzĹĂłw na tablice, pobranie daty startu. Zmiena przechowywujÄca aktualnÄ aktywnÄ kartÄ, staĹa przechowujÄca tablicÄ dwĂłch kart. DĹugoĹÄ gry i liczba wygranych gier.
//2. Funkcja inicjalizujÄca: losowanie indeksu z dostÄpnych. Dodanie klasy ktĂłra siÄ pod tym indeksem znajduje. Usuniecie tego indeksu (tej klasy), po 2 sekundach dodanie elementu i nasĹuchiwanie.
//3. this przypisanie do aktywnej karty, (sprawdzenie czy nie klikniecie w to samo), sprawdzenie czy to pierwszy klik.
//4. BĹÄdy - klikniÄcie dwa razy w to samo, usuniecie moĹźliwoĹci klikniecia w karty.
//PART1 - GĹĂWNE ZMIENNE
// zbiĂłr kart
const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

//pobranie wszystkich div-Ăłw
let cards = document.querySelectorAll("div"); //NodeList; metoda getElementsByTagName tworzy HTMLCollection
cards = [...cards]; //Tworzymy tablicÄ z listy (tu nie musimy, ale gdybyĹmy uĹźyli getElementsByClassName, to byĹmy musieli bo tam nie ma forEach)

//MoĹźna to samo co wyĹźej w jednym zapisie
//let cards = [...document.querySelectorAll("div")]

const startTime = new Date().getTime(); //Pobieramy aktualnÄ datÄ w milisekundach

let activeCard = ""; //ktĂłra karta zostaĹa aktualnie klikniÄta
const activeCards = []; //tablica dla ddwĂłch kart

//Potrzebne do zakoĹczenia - ile par w sumie
const gameLength = cards.length / 2; //9
//Informacja o wyniku - ile par udaĹo siÄ odgadnÄÄ
let gameResult = 0;
/* Koniec PART 1 */

/*PART 3 - PO KLIKNIÄCIU W KARTÄ - MINI GRA */
const clickCard = function () {

    activeCard = this; //w co zostaĹo klikniÄte
    //console.log(event.target) //o ile przekazane event to to samo co this

    //czy to klikniÄcie w ten sam element (tylko drugi moĹźe daÄ true) - na koĹcu. Musi byÄ przed ukryciem dodane
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden"); //ukrycie karty, ktĂłra zostaĹa klikniÄta

    //czy to 1 klikniÄcie, czy tablica ma dĹugoĹÄ 0
    if (activeCards.length === 0) {
        console.log("1 element");
        activeCards[0] = activeCard; //przypisanie do pozycji numer 1 wybranej karty
        return;

    }
    //czy to 2 klikniÄcie - else bo jeĹli nie pierwsze, to drugie
    else {
        console.log("2 element");
        //na chwilÄ zdejmujemy moĹźliwoĹÄ klikniÄcie (ale to potem)
        cards.forEach(card => card.removeEventListener("click", clickCard))
        //ustawienie drugiego klikniÄcia w tablicy w indeksie 1
        activeCards[1] = activeCard;

        //PĂłĹ sekund od odsĹoniecia - decyzja czy dobrze czy Ĺşle
        setTimeout(function () {
            //sprawdzenie czy to te same karty - wygrana
            if (activeCards[0].className === activeCards[1].className) {
                console.log("wygrane")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"));
                //Sprawdzenie czy nastÄpiĹ koniec gry
                if (gameResult == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`UdaĹo siÄ! TwĂłj wynik to: ${gameTime} sekund`)
                    location.reload();
                }
            }
            //przegrana. ponowne ukrycie
            else {
                console.log("przegrana")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            //Reset do nowej gry
            activeCard = ""; //aktywna karta pusta
            activeCards.length = 0; //dĹugoĹÄ tablicy na zero
            cards.forEach(card => card.addEventListener("click", clickCard))//przywrĂłcenie nasĹuchiwania

        }, 500)
    }
};

//PART 2 - LOSOWANIE, POKAZANIE I UKRYCIE, NASĹUCHIWANIE NA KLIKA
//Funckja po starcie zainicjowana
const init = function () {
    //losowanie klasy do kaĹźdego diva
    cards.forEach(card => {
        //pozycja z tablicy przechowujÄcej kolory
        const position = Math.floor(Math.random() * cardColors.length); //1
        //dodanie klasy do danego div-a
        card.classList.add(cardColors[position]);
        //usuniÄcie wylosowanego elementu, krĂłtsza tablica przy kolejnym losowaniu
        cardColors.splice(position, 1);

    })
    //Po 2 sekundach dodanie klasy hidden - ukrycie i dodanie nasĹuchiwania na klik
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
};

init()