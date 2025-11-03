<!--Delar upp sidan i två delar-->
<main>
  <div>

    <h1 class="name"> Elias Jirdén </h1>
    <h2>Här har jag samlat min uppgifter jag gjort i samband med webbutveckling i årskurs 2 på Maja Beskowgymnasiet!</h2>
    <h3>Inspirerade citat för min webbutvecklingsresa: Grafik design är min passion</h3>
    <!--Under denna kommer vi lägga till fler element-->
    <p id="inspo">
    "The only way to learn a new programming language is by writing programs in it." - <strong>Dennis Ritchie</strong>, creator of the C programming language.
    </p>

    <p style="background-color:pink">
        "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it." - <span>Patrick McKenzie, software engineer and entrepreneur</span>.
    </p>

  </div>
    <!--Här kommer vi lägga till en bild senare i uppgiften 1.2.4 Extra styling-->  

</main>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>

<style>
    main {
        /*Styling för att dela upp sidan i två delar. */
        /*Vi kommer gå igenom detta i detalj senare*/
        margin: auto;
        width: 80vw;
        height: 70vh;
        display: grid;
        grid-template-columns: repeat(2,50%);
        overflow: hidden;
    }

    div {
        /*Styling för att centrera texten i behållaren*/
        margin: auto;
    }

    h1 {
        color:grey;
    }

    h2 {
        color: rgb(255, 165, 0);
    }

    h3 {
        color: #3cb371;
        font-family: sans-serif;
        font-weight: bold;
    }


    /* Vi skiljer elementen med ett kommatecken(,) för att ge möjligheten till att ge flera element samma styling*/
    h1, h2, h3, p {
        display: inline-block;
        /*Ger utrymme mellan element*/
        margin: 10px;
    }
        

    .name {
        font-family:'Gill Sans';
        font-size: 50px;
    }

    #inspo {
        font-family: courier;
        font-size: 160%;
    }

    span {
        color: green;
    }    


  </style>
