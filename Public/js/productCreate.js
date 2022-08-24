window.onload = ()=>{
    let form = document.querySelector(".form-product")
    let formElements = form.querySelectorAll(".input")
    let inputName = document.querySelector(".name")
    let errorDivs = form.querySelectorAll(".errors")
    let inputImage = form.querySelector(".imageAvatar")
    let paws = document.querySelectorAll(".product-fa")
    let firsts = document.querySelector(".first")
    let seconds = document.querySelector(".second")
    let thirds = document.querySelector(".third")
    let fourths = document.querySelector(".fourths")
    let unoPaw= document.querySelector(".uno")

    let allowEmpty = ["breed", "pet_age", "color"]
    const expresiones = {
       field: /^[a-zA-ZÀ-ÿ\s]{1,100}$/, // Letras y espacios, pueden llevar acentos.
       image:/\.(jpe?g|png|gif|bmp)$/i
    }

    inputName.focus()
    
    form.addEventListener("submit", (e) =>{
      let emptyElements = []
      for (let i = 0; i < formElements.length; i++){
         let input =  formElements[i] 
         let errorDiv = errorDivs[i]
         
         if((input.value == "") && !(allowEmpty.indexOf(input.name) > -1)){
            
            emptyElements.push(input)
            input.classList.add("is-invalid")
            errorDiv.innerHTML =  `El campo ${input.placeholder} no puede estar vacío` 
            
         }else{
          errorDiv.innerHTML =  ""
          
         }
      }
      if(emptyElements.length > 0){
         e.preventDefault()
       }
    } )
 
      for (let i = 0; i < formElements.length; i++) {
       let input =  formElements[i] 
       let errorDiv = errorDivs[i]
       
       const validations = (e)=>{
          let elements= e.target     
          let fieldValidation = expresiones.field.test(elements.value)
          let acceptedExtensions = expresiones.image.test(elements.value)
         
          // validation ALL  NOT EMPTY
          if(elements.value == "" && !(allowEmpty.indexOf(input.name) > -1) ){
             errorDiv.innerHTML =  `El campo ${input.placeholder} no puede estar vacío`         
             elements.classList.add("is-invalid")    
             console.log(input.name)       
        
          }
 
          //validation ALL MIN 4
          else if (elements.value.length < 4 && (elements.name !== ("description") && elements.name !== ("category_id") )){
             errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener  4 letras como mínimo`
             elements.classList.add("is-invalid")     
          }
          else if (elements.value.length < 20 && elements.name === ("description")){
            errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener entre 20 letras como mínimo`
            elements.classList.add("is-invalid")     
         }
          //validation ADRESS NOT SPECIAL CHARACTER
          else if(fieldValidation == false && elements.name !== ("category_id") && (elements.name !== ("f_image") && elements.name !== ("image") && elements.name !== ("image1") && elements.name !== ("image2")) ){
             errorDiv.innerHTML =  `El campo ${input.placeholder} no puede caracteres especiales, solo se permiten ( . ), ( , ) y ( ° )`
             elements.classList.add("is-invalid") 
          }

          else if((elements.name === ("f_image") || elements.name === ("image") || elements.name === ("image1") || elements.name === ("image2")) && acceptedExtensions === false){
         
           
          
            errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener un formato del tipo ".jpg", ".jpeg", ".png" o ".gif"`
            elements.classList.add("is-invalid") 
         }
 
          else{
             errorDiv.innerHTML =  ""
             elements.classList.add("is-valid")
             elements.classList.remove("is-invalid")
          }   
         }
         input.addEventListener('keyup', validations)
       input.addEventListener('blur', validations)
       }


       for (let i = 0; i < paws.length; i++){
         let paw= paws[i]
      

         
         const pawViewForm = (e)=>{
             let pawTarget = e.target
           
            if(pawTarget.className.includes("1")){
               seconds.classList.remove("activate-product-view")
               thirds.classList.remove("activate-product-view")
               fourths.classList.remove("activate-product-view")
               seconds.classList.add("desactivate-product-view")
               thirds.classList.add("desactivate-product-view")
               fourths.classList.add("desactivate-product-view")
               firsts.classList.remove("desactivate-product-view")
               firsts.classList.add("activate-product-view")
               pawTarget.classList.add("uno")
               paws[0].classList.remove("dos")
               paws[1].classList.add("dos")
               paws[2].classList.add("dos")
               paws[3].classList.add("dos")
               
            }
            else if(pawTarget.className.includes("2")){
               firsts.classList.remove("activate-product-view")
               thirds.classList.remove("activate-product-view")
               fourths.classList.remove("activate-product-view")
               firsts.classList.add("desactivate-product-view")
               thirds.classList.add("desactivate-product-view")
               fourths.classList.add("desactivate-product-view")
               seconds.classList.add("activate-product-view")
               seconds.classList.remove("desactivate-product-view")
               pawTarget.classList.add("uno")
               paws[0].classList.add("dos")
               paws[1].classList.remove("dos")
               paws[2].classList.add("dos")
               paws[3].classList.add("dos")
            }else if(pawTarget.className.includes("3")){
               seconds.classList.remove("activate-product-view")
               firsts.classList.remove("activate-product-view")
               fourths.classList.remove("activate-product-view")
               seconds.classList.add("desactivate-product-view")
               firsts.classList.add("desactivate-product-view")
               fourths.classList.add("desactivate-product-view")
               thirds.classList.add("activate-product-view")
               thirds.classList.remove("desactivate-product-view")
               e.target.classList.add("uno")
               paws[0].classList.add("dos")
               paws[1].classList.add("dos")
               paws[2].classList.remove("dos")
               paws[3].classList.add("dos")
            }else if(pawTarget.className.includes("4")){
               seconds.classList.remove("activate-product-view")
               firsts.classList.remove("activate-product-view")
               thirds.classList.remove("activate-product-view")
               seconds.classList.add("desactivate-product-view")
               firsts.classList.add("desactivate-product-view")
               thirds.classList.add("desactivate-product-view")
               fourths.classList.add("activate-product-view")
               fourths.classList.remove("desactivate-product-view")
               e.target.classList.add("uno")
               paws[0].classList.add("dos")
               paws[1].classList.add("dos")
               paws[2].classList.add("dos") 
               paws[3].classList.remove("dos")             
            }

           
           }
           paw.addEventListener('click', pawViewForm)     
       };
      
    
    }