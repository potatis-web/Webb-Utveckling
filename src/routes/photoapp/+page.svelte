<script>
    let image = "https://picsum.photos/id/70/367/267"
    let photo = "https://picsum.photos/id/88/367/267"
    let picture = "https://picsum.photos/id/93/367/267"
</script>


<h1>Photoapp</h1>
<p>Denna sida innehåller <strong>fina</strong> bilder</p>
<div class="photos">
    <div class="image-wrapper">
        <img src={image} alt="Flexbox egenskaper">
    </div>
    <div class="image-wrapper">
        <img src={photo} alt="Flexbox egenskaper">
    </div>
    <div class="image-wrapper">
        <img src={picture} alt="Flexbox egenskaper">
    </div>
</div>
<style>

    h1{
        text-align: center;
        font-size: 50px;
        margin: 20px;
        color: cornflowerblue;
    }


    .photos {
        display: flex;
        max-width: 90vw;
        overflow: hidden;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background-color: gainsboro;
    }



    .image-wrapper {
        flex-grow: 1;
        flex-basis: 300px;
        margin: 0.8rem;
        transition: scale 0.5s, flex 0.5s;
        width: 300px;

        
    }
    
    .image-wrapper img {
        width: 100%;
        border-radius: 20px;
        box-shadow: 4px 8px 10px rgba(0,0,0,0.2);
    }

    .image-wrapper:hover {
        flex-grow:2;
    }

    .image-wrapper:active {
        scale: 0.9;
    }
</style>