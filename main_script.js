
    var image = document.querySelector("#random_image");
    var prev = document.querySelector(".button_prev");
    var next = document.querySelector(".button_next");
    var secptr = -1;
    var images = [];

    fetch(`https://source.unsplash.com/1600x900/?${topic}`).then(response => {
        images.push(response.url);
        image.src = response.url;
        secptr++;
        checkClass(secptr);
    })

    function checkClass(secptr){
        if(secptr == 0 || secptr == -1){
            prev.classList.add("disabled");
        }else{
            prev.classList.remove("disabled");
        }
    }

    checkClass(secptr);

    next.addEventListener('click',() => {
        if((images.length -1) == secptr){
            fetch('https://source.unsplash.com/1600x900/?beach').then(response => {
                images.push(response.url);
                image.src = response.url
            })
            secptr++;
            checkClass(secptr);
        }else{
            secptr++;
            image.src = images[secptr];
            checkClass(secptr);

        }
        
    })
    

    prev.addEventListener('click',(e) => {
        if(e.target.classList[3] == "disabled"){
            return null
        }else{
            secptr--;
            if(secptr == 0 || secptr == -1){
                prev.classList.add("disabled");
            }
            image.src = images[secptr];
        }
    })
