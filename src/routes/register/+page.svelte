<script>
    import { base } from '$app/paths';
    import {users_store} from "$lib/user";
    import { onMount } from 'svelte';

    let users = [];

    onMount(() => {
        /*Check if has more then 2 characters*/
        if($users_store.length > 2){
            users = JSON.parse($users_store);
        }
    });


    

    let color = "black"

    let colors = [
        {
            namn: "Blå",
            value: "blue"
        },
        {
            namn: "Röd",
            value: "red"
        },
        {
            namn: "Grön",
            value: "green"
        }
    ]

    function handleSubmit() {
        let new_user = {username: username, password: password, color: color};
        console.log("Starting username validation...")

        let found = false
       
        for (user of users) {
            console.log(user)
            if (user.username === new_user.username) {
                alert("This user already exists! Try another username")
                found=true
                break
            } 
        }

        if (!found){
            users = [...users, new_user];
            $users_store = JSON.stringify(users);
        }
        console.log("done")
    }

</script>

<main>
    <div class="container">
        <h1>Registrering</h1>
        <form on:submit|preventDefault={handleSubmit}>
            
            <div class="fields-container">
                <label for="username">Användarnamn</label>
                <input type="text" id="username" name="username">

                <label for="password">Lösenord</label>
                <input type="password" id="password" name="password">
            </div>

            
            <br>
            <label for="form-1">Favoritfärg</label>
            <select bind:value={color} id="form-1">
                {#each colors as c}
                    <option value={c.value}>{c.namn}</option>
                {/each}
            </select>
            <br>
            <div style="width: 100px; height: 100px; border-radius: 50%; overflow:hidden; background-color:{color};"></div>
            <br><br>
            <input type="submit" value="Registrera">
        </form>
        <div>
            <h2>Har du redan ett konto? <a href="{base}/login">Logga in</a></h2>
        </div>
    </div>
</main>

<style>
    main{
            background-image: url("https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg");
            background-size: cover;
            width: 100%;
            min-height: 500px;
            height: 100%;
            padding: 5%;
        }


    .container{
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;

            border: solid 5px rosybrown;
            border-radius: 10px;
            width: 35%;
            height: 80%;
            min-width: 300px;
            min-height: 500px;
            background-color: #3a2e3b;
            margin: auto;
    }     

    .fields-container > * {
        display: block;
        margin: 1rem;
    }

    label,h1,h2,a,input,select {
        color: rosybrown;
    }
    input,select {
        background-color: rgb(68, 56, 69);
        border: none;
        width: 5rem;
        height: 1rem;
        transition: width 0.5s, height 0.5s;
    }

    input:focus,
    select:focus {
        width: 100%;
        height: 2rem;
        outline: solid 2px rosybrown
    }
            
</style>
