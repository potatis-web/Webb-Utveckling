<h1>Photoapp</h1>
<p>Denna sida innehåller <strong>fina</strong> bilder</p>
<div class="photos">
    <div>
        <img src="https://i.redd.it/rofzm44oka091.png" alt="Flexbox egenskaper">
    </div>
    <div>
        <img src="https://i.redd.it/vd9dc7wfk9471.png" alt="Flexbox egenskaper">
    </div>
    <div>
        <img src="https://miro.medium.com/v2/resize:fit:1400/0*YeaUsQyhXSL1TCTH.png" alt="Flexbox egenskaper">
    </div>
    
   
</div>
<style>
    .photos {
        display: flex;
        max-width: 90vw;
        overflow: hidden;
        align-items: center;
        justify-content: center;
    }
    .photos img{
    /*Bredden på en bild, som ligger inom vår flex container,photos,
        är 100% av containers storlek (dess förälder)*/
        width: 50%;
    }

    .image-wrapper img {
        width: 100%;
    }
</style>