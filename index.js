(function(window) {
    function define_library() {
      // Create the library object and all its properties and methods.
      var randomImageGen = {};
      randomImageGen.init = function(img_tag_id,next_btn_class,prev_btn_class,topic) {
        var image = document.querySelector('#'+img_tag_id);
        var prev = document.querySelector('.'+prev_btn_class);
        var next = document.querySelector('.'+next_btn_class);
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
                fetch(`https://source.unsplash.com/1600x900/?${topic}`).then(response => {
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
      }
      return randomImageGen;
    }
  
    // Add the vanillaZoom object to global scope if its not already defined.
    if(typeof(randomImageGen) === 'undefined') {
      window.randomImageGen = define_library();
    }
    else{
      console.log("Library already defined.");
    }
  })(window);