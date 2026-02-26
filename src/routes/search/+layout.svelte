<script>
        
    // Importera goto-funktionen för att navigera mellan sidor
    import { goto } from '$app/navigation';
    
    // Funktion som hanterar formulärets submit-händelse
    function handleSubmit(e) {
        // Förhindra att sidan laddas om (standardbeteende för formulär)
        e.preventDefault();
        
        // Skapa ett FormData-objekt från formuläret
        const formData = new FormData(e.target);
        
        // Hämta värdet från input-fältet med name="search"
        const search = formData.get('search');
        
        // Navigera till den dynamiska routen /search/[pokemon]
        goto('/search/' + search);
    }


</script>
<main>
    <form onsubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Sök upp en Pokemon (Namn, Id)" autocomplete="off"/>
    </form>
    <slot />
</main>
<div class="backdrop"></div>
<style>
    main {
        width: 80vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        margin: 5vh auto;
        border-radius: 10px;
        display: flex; 
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }
    form {
        width: 90%;
    }
    input {
        width: clamp(300px, 100%, 100%);
        text-align: center;
        padding: 10px 0;
        border-radius: 30px;
    }


    .backdrop {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        position: fixed;
        background-size: cover;
        z-index: -1;
        filter: blur(5px);
        background-image: url("https://imageio.forbes.com/specials-images/imageserve/604202ff091b6539cb90fcbc/The-backs-of-a-number-of-Pok-mon-cards-/960x0.jpg?format=jpg&width=960");
    }
</style>