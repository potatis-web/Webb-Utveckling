<script>
    let t = $state(0);
    let button = $state([0,1,2,3,4,5,6,7]);
    let btnsEnabled = $state(true);
    let success = $state(false);
    let userName = $state("")
    let passWord = $state("")

    function calcxOffset(i) {
        let a = i % 4; // 0, 1, 2, 3
        return -150 + a * 100;
    }
    function calcYOffset(i) {
        return i >= Math.round(button.length/2) ? 1 : -1;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }


    async function startButtons() {
        console.log("start")
        let r = 0;


        if (!t) {
            t = 1
            return;
        }
        const submitBtn = document.getElementById("submit")
        submitBtn.classList.add("highlight")
        await sleep(500)
        submitBtn.classList.remove("hightlight");
        await sleep(500);
        do {
            for (let i = button.length-1; i >= 1; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                // console.log(`Before swap: i = ${button[i]}, j = ${button[j]}`);
                const temp = button[j];
                button[j] = button[i];
                button[i] = temp;

            } 
            await sleep(300)
            r++;
            console.log(r);
        } while (r < 20)
        btnsEnabled = true;
    }


</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login</title>
<h1 style="text-align: center;">Log-in</h1>
<form>
    <input type="text" placeholder="Username" required="true" bind:value={ userName }>
    <input type="password" placeholder="Password" required="true" bind:value={ passWord }>
    {#each button as btn, i}
        <button class="btns" style="left: calc(50% + { t * calcxOffset(btn) }px - 50px); top: calc(60% + { t * calcYOffset(btn) * 35 }px)" disabled="{ !btnsEnabled }" class:disabled={ !btnsEnabled }>Submit </button>
        {#if btn+1 === button.length}
            <button class="btns" style="left: calc(50% + { t * (calcxOffset(btn)) }px - 50px); top: calc(60% + { t * calcYOffset(btn) * 35 }px); display: {btnsEnabled ? "static" : "none"}" onclick={ () => {t = 1} } disabled="{ !btnsEnabled }" class:disabled={ !btnsEnabled }>Submit </button>
        {:else if btn === 1}
            <button id="submit" class="btns" style="left: calc(50% + { t * (calcxOffset(btn)) }px - 50px); top: calc(60% + { t * calcYOffset(btn) * 35 }px); display: {btnsEnabled ? "static" : "none"}" onclick={ () => {success = true} } disabled="{ !btnsEnabled }" class:disabled={ !btnsEnabled }>Submit </button>
        {/if}
        
    {/each}

    {#if success && userName && passWord}
        <div class="pop-up">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="lightgreen" fill="lightgreen"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            <p>Successfully logged in!</p>
        </div>    
    {/if}
    

</form>
<div class="ctrl">
    <button class="test" onclick={ startButtons }>Test</button>
    <p class="highlight">{ t }</p>
    <input type="range" min="0" max="1" step="0.01" bind:value={ t }>
</div>


<style>
    :global(body) {
        background-color: azure;
    }
    :global(body), * {
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }

    .ctrl {
        position: fixed;
        right: 0;
        top: 0;
    }
    .btns {
        position: absolute;
        padding: 10px 15px;
        transition: all 0.3s ease;
        border: 1px solid black;
        border-radius: 20px;
        cursor: pointer;
    }



    form {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        padding: 20px;
        height: 60vh;
    }

    form > * {
        margin: 10px;
    }

    form > input {
        font-size: medium;
        border-radius: 30px;
        padding: 15px 20px;
        transition: all 0.5s;
        outline: blue 0px solid;
    }
    form > input::after {
        content: "*";
        color: red;
    }

    form > input:focus {
        outline: blue 3px solid;
    }

    .disabled {
        cursor: not-allowed;
    }
    .highlight:first-child {
        background-color: lightgreen;
        color: white;
    }
    .pop-up {
        position: absolute;
        left: calc(50% - 90px);
        top: 80%;
        text-align: center;
        margin: 10px;
    }
    @keyframes text {
        0%, 100% {content: ""}
        10%, 90%{content: "a"}
        20%, 80% {content: "ab"}
        30%, 70% {content: "abc"}
        40%, 60% {content: "abcd"}
        50% {content: "abcde"}
    }
</style>