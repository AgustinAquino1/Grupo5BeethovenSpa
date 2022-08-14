window.onload = ()=>{
   let form = document.querySelector(".register")
   let formElements = form.querySelectorAll(".input")
   let inputName = document.querySelector(".name")
   let errorDivs = form.querySelectorAll(".errors")
   let inputPass = form.querySelector(".pass")
   let inputImage = form.querySelector(".imageAvatar")
   const expresiones = {
      adress: /^[a-zA-Z0-9\s\,\.\°]+$/, // Letras, numeros, punto, coma y grados
      name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\u0021-\u002b\u003c-\u0040]).{8,}$/, // 8 a 20 digitos.
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      image:/\.(jpe?g|png|gif|bmp)$/i
   }
   console.log({inputImage})
   inputName.focus()
   
   form.addEventListener("submit", (e) =>{
     let emptyElements = []
     for (let i = 0; i < formElements.length; i++){
        let input =  formElements[i] 
        let errorDiv = errorDivs[i]
        
        if(input.value === ""){

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
         let nameValidation = expresiones.name.test(elements.value)
         let adressValidation = expresiones.adress.test(elements.value)
         let emailValidation = expresiones.email.test(elements.value)
         let passwordValidation =  expresiones.password.test(elements.value)
         let acceptedExtension=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[\u0021-\u002b\u003c-\u0040]).{8,}$/
         let acceptedExtensions = expresiones.image.test(elements.value)
        
         // validation ALL  NOT EMPTY
         if(elements.value == ""){
            errorDiv.innerHTML =  `El campo ${input.placeholder} no puede estar vacío`         
            elements.classList.add("is-invalid")           
       
         }

         //validation NAME AND SURNAME  <3 & 16>
         else if (((elements.value.length < 3 || elements.value.length > 16 )) && ((elements.name === ("name") || elements.name === ("surname")))){
            errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener entre 3 y 16 letras`
            elements.classList.add("is-invalid")     
         }
         //validation NAME AND SURNAME  NOT A NUMBER OR SPECIAL CHARACTER
         else if((nameValidation == false) && ((elements.name === ("name") || elements.name === ("surname")))){
            errorDiv.innerHTML =  `El campo ${input.placeholder} no puede contener números ni caracteres especiales`
            elements.classList.add("is-invalid")  
         }
         //validation ADRESS >4 & <40
         else if((elements.value.length < 4 || elements.value.length > 40 ) && elements.name === ("adress")){
            errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener entre 4 y 40 caracteres`
            elements.classList.add("is-invalid")  
         }
         //validation ADRESS NOT SPECIAL CHARACTER
         else if(adressValidation == false && elements.name === ("adress")){
            errorDiv.innerHTML =  `El campo ${input.placeholder} no puede caracteres especiales, solo se permiten ( . ), ( , ) y ( ° )`
            elements.classList.add("is-invalid") 
         }

         //validation IMAGE 
         else if(elements.name === ("avatar") && acceptedExtensions === false){
         
           
          
            errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener un formato del tipo ".jpg", ".jpeg", ".png" o ".gif"`
            elements.classList.add("is-invalid") 
         }

         //validation EMAIL
         else if(emailValidation == false && elements.name === ("email")){
            errorDiv.innerHTML =  `El campo ${input.placeholder} debe tener un formato del tipo email@email.com`
            elements.classList.add("is-invalid") 
         }
         //validation PASSWORD
         
         else if((elements.name === "pass") && passwordValidation == false){
            errorDiv.innerHTML =  "El password debe tener por lo menos 8 caracteres: una mayúscula, una minuscula, un número y un caracter especial"
            elements.classList.add("is-invalid")           
         }
      
         //validation PASSWORD2
         else if((elements.name === "pass2" ) && (elements.value != inputPass.value)){         
            errorDiv.innerHTML =  "Las contraseñas no coinciden"
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
     
   
   }
