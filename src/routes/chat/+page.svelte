<script>
    // Imports
    import { enhance } from '$app/forms';
    import { chats_store } from '$lib/chat';
    import { onMount } from 'svelte';
    import Elizabot from 'elizabot';

    const eliza = new Elizabot();
    const firstMessageTime = new Date().toLocaleTimeString();
    let chat = $state([{user: 'elizabot', message: eliza.getInitial(), time: firstMessageTime }]);
    onMount(() => {
        /*Check if has more then 2 characters*/
        if($chats_store.length > 2){
            chat = JSON.parse($chats_store);
        }
    });
    async function write(message) {
        //TODO: Add the new message to the chat
        const userMessageTime = new Date().toLocaleTimeString();
        const newUserMessage = {user: 'user', message, time: userMessageTime};
        chat = [...chat, newUserMessage];
        $chats_store = JSON.stringify(chat);
        //Hämta HTML-elementet med id:et visible
        var element = document.getElementById("visible");
        //Ändrar elementets CSS-egenskap display till default
        element.style.display = "flex"; // Visa elementet

        // random delay for Eliza's response time
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

        //TODO: Add Eliza's response to the chat
        const response = eliza.transform(message);
        const elizaMessageTime = new Date().toLocaleTimeString();
        const newElizaMessage = {user: 'elizabot', message: response, time: elizaMessageTime};
        chat = [...chat, newElizaMessage];
        $chats_store = JSON.stringify(chat);
        element.style.display = "none"; // Dölj elementet
    }

    function resetChat() {
        chat = [];
        const resetMessageTime = new Date().toLocaleTimeString();
        chat = [{user: 'elizabot', message: eliza.getInitial(), time: resetMessageTime }];
        $chats_store = JSON.stringify(chat);
    }
</script>
<main>
    <section>
        {#each chat as message}
            <article class="message" class:user-message={message.user === 'user'} class:elizabot-message={message.user === 'elizabot'} data-time={message.time}>
                <p>{message.message}</p>
            </article>
            
        {/each}
        <article id="visible">
            <span class="circle"></span>
            <span class="circle"></span>
            <span class="circle"></span>
        </article>
    </section>
    <form method="post" use:enhance={({formElement, formData, action, cancel}) => {
        cancel();
        const text = formData.get('text');
        write(text);
        formElement.reset();
    }}>
        <input type="text" autocomplete="off" name="text" placeholder="Type text here..." required />
        <button type="submit" class="send-button">Send</button>
    </form>
    <button onclick={() => {resetChat()}} aria-label="Reset Chat" class="reset-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"></path>
        </svg>
    </button>
</main>

<style>
    main {
        width: 60vw;
        height: 80vh;
        padding: 10px;
        background: linear-gradient(to bottom, #f0f0f0, #d0d0d0);
        display: grid;
        grid-template-rows: 90% 10%;
    }
    section {
        overflow-y: scroll;
    }
    form {
        display: flex;
        gap: 10px;
        padding: 10px;
        background-color: #ccc;
        border-radius: 10px;
        justify-content: flex-end;
        transition: all 0.3s ease;
    }
    input {
        flex-grow: 1;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #999;
        transition: all 0.3s ease;
    }
    input:focus {
        outline: none;
        border-color: #666;
        box-shadow: 0 0 5px rgba(100, 100, 100, 0.5);
    }
    .send-button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .send-button:hover {
        background-color: #45a049;
        transform: scale(1.1);
    }
    .reset-button {
        position: fixed;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    .reset-button:hover {
        transform: rotate(90deg) scale(1.1);
    }
    .reset-button:active {
        transform: rotate(90deg) scale(0.9);
    }
    .message {
        background-color: #e0e0e0;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        width: 90%;
    }
    .circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: typing 1s infinite;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .circle:nth-child(2) {
        animation-delay: 0.3s;
    }
    .circle:nth-child(3) {
        animation-delay: 0.6s;
    }
    .user-message {
        background-color: #a0e0a0;
        margin-left: auto;
        margin-right: 10px;
    }
    .user-message::before {
        content: "You: ";
        font-weight: bold;
    }
    .user-message::after {
        content: attr(data-time);
        font-size: 0.7em;
        color: #555;
        margin-left: 10px;
    }

    .elizabot-message {
        background-color: #a0a0e0;
    }

    .elizabot-message::before {
        content: "Elizabot: ";
        font-weight: bold;
    }
    .elizabot-message::after {
        content: attr(data-time);
        font-size: 0.7em;
        color: #555;
        margin-left: 10px;
    }
    .elizabot-message:first-child {
        filter: brightness(80%);
    }
    #visible {
        height: 60px;
        width: 100px;
        padding: 0;
        display: none;
    }
    @keyframes typing {
        0% {transform: scale(1);}
        50% {transform: scale(1.4);}
        100% {transform: scale(1);}
    }
</style>