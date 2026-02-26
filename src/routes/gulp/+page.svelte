<script>
  import { fade } from "svelte/transition";
  let currentGuess = $state([]);
  let prevGuesses = $state([])
  let applyShake = $state(false);
  let waiting = $state(false);
  let win = false;
  const str = 'qwertyuiopasdfghjklzxcvbnm';
  const letters = str.split("");
  const prevLetters = $state([])
  for (let l of letters) {
    const obj = {char: l, correct_idx: false, in_word: false, guessed: false};
    prevLetters.push(obj);
  }
  $inspect(prevGuesses);

  async function handleGuess() {
    if (waiting) return;
    waiting = true
    const content = currentGuess.join('')

    const request2 = new Request(`https://wordle-api-kappa.vercel.app/${content}`, {
      method: 'POST',
    });
    /*
    Expected output from successful guess: 
    {
      "guess": "HELLO",
      "is_correct": false,
      "is_word_in_list": true,
      "character_info": [
        {
          "char": "H",
          "scoring": {
            "in_word": false,
            "correct_idx": false
          }
        },
        {
          "char": "E",
          "scoring": {
            "in_word": false,
            "correct_idx": false
          }
        },
        {
          "char": "L",
          "scoring": {
            "in_word": false,
            "correct_idx": false
          }
        },
        {
          "char": "L",
          "scoring": {
            "in_word": false,
            "correct_idx": false
          }
        },
        {
          "char": "O",
          "scoring": {
            "in_word": false,
            "correct_idx": false
          }
        }
      ]
    }
    */

    // Send guess to Wordle API 
    const response = await fetch(request2);

    if (!response.ok) throw error(response.status, {message: response.statusText});
    waiting = false;
    const data = await response.json();
    console.log(data);

    if (!data.is_word_in_list) {
      handleShake();
      return;
    }

    if (data.is_correct) {
      // Win logic here
      prevGuesses = [...prevGuesses, data.character_info];
      return;
    }

    // Update letters
    for (let i = 0; i < data.character_info.length - 1 ; i++) {
      const target = data.character_info[i];
      const targetLetter = target.char.toLowerCase();
      for (const j of prevLetters) {
        // If guessed letter is not in word
        if (targetLetter !== j) {
          continue;
        }
        // If guessed letter is in word
        if (target.in_word) {
          j.in_word = true;
        }
        // If guessed letter is in the right position
        if (target.correct_idx) {
          j.correct_idx = true;
        }
        if (!target.in_word && !target.correct_idx){
          j.guessed = true;
        }
      }
    }
    
    
    prevGuesses = [...prevGuesses, data.character_info];
    currentGuess = [];
    if (prevGuesses.length === 6) alert('you lose');
  }
  function onKeyDown(e) {
    e.preventDefault();
    if (e.key === 'Backspace') currentGuess.pop();
    if (currentGuess.length === 5 && e.key === 'Enter' ) handleGuess();
    if (currentGuess.length === 5) return;
    if (letters.includes(e.key)) currentGuess.push(e.key);
  }
  function handleShake() {
    applyShake = true;
    setTimeout(() => {applyShake = false;}, 1000)
  }
</script>
<title>Wordl</title>

<main>
  <div class="prev">
    {#each prevGuesses as guess}
      <div>
        {#each guess as guessChar, i}
          <p 
            style="animation-delay: {i * 200}ms"
            class="big-text flip"
            class:in-word={guessChar.scoring.in_word}
            class:correct={guessChar.scoring.correct_idx}>{guessChar.char}</p>
        {/each}
      </div>
    {/each}
    <span 
      class:display={waiting}
      class="loader"></span>
  </div>
  <div>
    {#each currentGuess as guessLetter}
      <p 
        class:shake={applyShake}
        class="big-text">{guessLetter.toUpperCase()}</p>
    {/each}
    <span 
      class:display={!currentGuess.length}
      class="caret"></span>
  </div>
  <span class="letter-container">
    {#each prevLetters as lttr}
      {#if lttr.char === 'z'}
        <span 
          class="lttr"
          class:guessed={lttr.guessed}
          class:in-word={lttr.in_word}
          class:correct={lttr.correct_idx}
          style="margin-left: 17px;">{lttr.char.toUpperCase()}</span>
      {:else if lttr.char === 'a'}
        <span 
          class="lttr"
          class:guessed={lttr.guessed}
          class:in-word={lttr.in_word}
          class:correct={lttr.correct_idx}
          style="margin-left: 5px;">{lttr.char.toUpperCase()}</span>
      {:else}
        <span 
          class="lttr"
          class:guessed={lttr.guessed}
          class:in-word={lttr.in_word}
          class:correct={lttr.correct_idx}>{lttr.char.toUpperCase()}</span>
      {/if}

    {/each}
  </span>
</main>


<aside class="big-text">{prevGuesses.length}/6</aside>
<svelte:window onkeydown={onKeyDown}/>
<style>
  * {
    transition: all 0.3s;
  }
  main {
    background-color: #333333;
    height: calc(100vh - 19px);
    width: 100vw;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .loader {
    border-radius: 50%;
    border: 16px solid #4f4f4f;
    border-top: 16px solid green;
    height: 120px;
    width: 120px;
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 60px);
    animation: spin 1s linear infinite;
    display: none;
    z-index: 1;
  }
  .caret {
    background-color: #e0e0e0;
    width: 10px;
    height: 40px;
    animation: blink 1s infinite;
  }
  main div {
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: relative;
  }
  p {
    background-color: #3a3a3a;
    border: #4f4f4f 2px solid;
    display: inline;
    margin: 0;
    min-width: 40px;
    min-height: 40px;
    border-radius: 5px;
    box-shadow: 0 0 20px 0 #1f1f1f;
  }
  aside {
    position: absolute;
    right: calc(50% - 22px);
    bottom: 80%;
  }
  .big-text {
    text-align: center;
    vertical-align: middle;
    color: #e0e0e0;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: 700;
    font-size: xx-large;
  }
  .letter-container {
    display: inline-flex;
    flex-flow: row wrap;
    gap: 5px;
    position: absolute;
    top: 80%;
    width: 260px;
  }
  .lttr {
    background-color: #3a3a3a;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: large;
    color: #dadada;
    min-width: 20px;
    min-height: 20px;
    text-align: center;
    vertical-align: middle;
    border-radius: 4px;
  }
  .guessed {
    background-color: #1f1f1f;
  }
  .in-word {
    background-color: orange;
  }
  .correct {
    background-color: green;
  }
  .prev {
    flex-direction: column;
  }
  .display {
    display: block;
  }
  .flip {
    animation: flip 500ms ease 1 forwards;
  }
  .shake {
    animation: shake 1s ease 1;
  }
  @keyframes shake {
    0%, 100% {transform: translateX(0)}
    33% {transform: translateX(-10px)}
    66% {transform: translateX(10px)}
  }
  @keyframes spin {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
  @keyframes blink {
    0%, 100% {display: block;}
    50% {display: none;}
  }
</style>
