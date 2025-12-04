<script>
    let varor = $state([
        {name: "Mjölk"}
        ])
    let varor2 = $state([
        {name: "ECO-WORTHY Bluetooth Lithium Battery, 12V, 100AH, LiFePO4 Battery with Low Temperature Protection, Intelligent BMS, 1280Wh Energy, for Caravans, Motorhomes, Solar System, Phishing"}

    ])
    function addProduct() {

    }
</script>
<main class="container">
    <h1>Shoppinglist</h1>
    <div class="categories-container">
        <section>
            <h2>Varor att köpa</h2>
            <form onsubmit={addProduct} class="product-form">
                <div>
                    <label for="product">Lägg till vara:    </label>
                    <input id="product"type="text">
                </div>
                <input type="submit" value="Lägg till">
            </form>
            <ol>
                {#each varor2 as vara}
                    <li>
                        <div class="product-container">
                            {vara.name}
                            <button>←</button>
                            <button>→</button>
                        </div>
                    </li>
                {/each}
            </ol>
        </section>
        <section>
            <h2>Köpta varor</h2>
            <ul>
                {#each varor as vara}
                    <li>
                        <div class="product-container">
                        {vara.name}
                        <button>Ta bort</button>
                        </div>
                    </li>
                {/each}
            </ul>
        </section>

    </div>
</main>

<style>
    .container{
        background-color: rgb(220, 110, 140);
        width: 60vw;
        height: 70vh;
        border-radius: 20px;

        display: grid;
        grid-template-rows: 1fr 9fr 1fr;
                
    }

    .container > h1 {
        border-radius: 1rem;
        text-align: center;
        width: 100%;
    }   

    .categories-container {
        height: 100%;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2,1fr);
        margin: 0.5rem;
    }

    .categories-container > section {
        height: 100%;
        width: 100%;
    }

    .categories-container > section:nth-child(1) {
        background-color: rgba(0,0,0,0.1);
    }
    .categories-container > section:nth-child(2) {
        background-color: rgba(0,0,0,0.2);
    }

    section > h2 {
        background-color: rgba(0,0,0,0.1);
        margin: 0;
        text-align: center;
    }

    .product-form {
        display: flex;
        justify-content: space-evenly;
        background-color: rgba(0,0,0,0.2);
        padding: 1rem;
    }
    input, button {
        background-color: rgba(0,0,0,0.1);
        border: transparent;
        margin-left: 10px;
        padding: 0.5rem;
        transition: scale 500ms, outline 500ms;
    }

    input:focus,
    button:focus {
        outline: 0.2rem solid rgba(0,0,0,0.2); 
        scale: 1.1
    }

    .product-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>