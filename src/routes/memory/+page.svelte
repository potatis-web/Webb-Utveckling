<script>
    import favicon from '$lib/assets/favicon.svg';
	import { flip } from 'svelte/animate';
    let cards = $state([]);
    $inspect(cards);
    const gameVariables = $state({
        flippedCards: 0,
        matchedCards: 0,
        redPoints: 0,
        bluePoints: 0,
        blueTurn: true
    });

    for (let i = 1; i <= 12; i++) {
        cards.push({ id: Math.ceil(i/2), uid: i, flipped: false, matched: false });
    }

    function flipCard(card) {
        if (gameVariables.matchedCards >= 12) {
            alert(`Game over! Final Score - Blue: ${gameVariables.bluePoints}, Red: ${gameVariables.redPoints}`);
            resetGame()
            return;
        }
        if (card.flipped || card.matched ) {
            return;
        }
        countFlippedCards();
        if (gameVariables.flippedCards >= 2) {
            return;
        }
        card.flipped = true;
        gameVariables.flippedCards++;
        checkMatchedCards(card);
    }

    function resetGame() {
        cards.forEach(card => {
            card.flipped = false;
            card.matched = false;
        });
        // Sets variables to zero
        gameVariables.flippedCards = gameVariables.matchedCards = gameVariables.redPoints = gameVariables.bluePoints = 0;
        gameVariables.blueTurn = true;
        
    }
    function countFlippedCards() {
        gameVariables.flippedCards = 0;
        for (let card of cards) {
            if (card.flipped && !card.matched) {
                gameVariables.flippedCards++;
            }
        }
    }
    function checkMatchedCards(card) {
        const otherCard = cards.find(c => c.flipped && c.uid !== card.uid && !c.matched);
        if (otherCard && card.id === otherCard.id) {
            card.matched = true;
            otherCard.matched = true;
            gameVariables.matchedCards += 2;
            gameVariables.flippedCards -= 2;
            if (gameVariables.blueTurn) {
                gameVariables.bluePoints++;
            } else {
                gameVariables.redPoints++;
            }
        } else if (otherCard && card.id !== otherCard.id) {
            setTimeout(() => {
                card.flipped = false;
                otherCard.flipped = false;
                gameVariables.flippedCards -= 2;
            }, 1000);
            gameVariables.blueTurn = !gameVariables.blueTurn;
        }
    }
</script>
<h1>Memory</h1>
<main>
    {#each cards as card}
        <button class="card" class:flipped={ card.flipped } onclick={ () => flipCard(card) }>
            <img class="front" src={ favicon } style="filter: hue-rotate({card.id * 60}deg);" alt="Card front" draggable="false">
            <img class="back" src={ favicon } style="filter: grayscale(100%);" alt="Card back" draggable="false">
        </button>
    {/each}
</main>

<button onclick={ resetGame } class="reset-button" aria-label="Reset Game">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"></path>
    </svg>
</button>

<aside>
    <p>{ gameVariables.redPoints }</p>
</aside>

<aside class="blue">
    <p>{ gameVariables.bluePoints }</p>
</aside>

<aside class="turn" class:blue={ gameVariables.blueTurn }></aside>

<style>
    main {
        display: grid;
        background-color: lightgray;
        padding: 10px;
        gap: 10px;
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(3, 100px);
        justify-content: center;
    }

    aside {
        width: 100px;
        height: 100px;
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    p {
        font-size: 30px;
    }
    .card {
        position: relative;
        transition: transform 0.6s;
    }
    .card:hover:not(.flipped) {
        cursor: pointer;
        transform: scale(1.1);
    }

    .card img {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        
    }

    .blue {
        left: 10px;
        background-color: blue;
        
    }
    .turn {
        box-shadow: 0 0 10px 10px yellowgreen;
        z-index: -1;
    }

    .front {
        transform: rotateY(180deg);
    }

    .flipped {
        transform: rotateY(180deg);
        transform-style: preserve-3d;
    }
    .reset-button {
        position: fixed;
        top: 30%;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        transition: transform 0.5s;
    }

    .reset-button:hover {
        transform: rotate(180deg)
    }



    @media (min-height: 500px) {
        main {
            grid-template-columns: repeat(4, 100px);
            grid-template-rows: repeat(3, 100px);
        }
    }
    @media (max-height: 500px) {
        main {
            grid-template-columns: repeat(6, 100px);
            grid-template-rows: repeat(2, 100px);
        }
    }      
</style>