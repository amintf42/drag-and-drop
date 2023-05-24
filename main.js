document.querySelectorAll(".drop-zone__input").forEach(inputelement => {
    const dropZoneElement = inputelement.closest(".drop-zone");

    dropZoneElement.addEventListener("click" , e =>{
        inputelement.click();
    });

    inputelement.addEventListener("change" , e =>{
        if(inputelement.files.length){
            updatethumbnail(dropZoneElement , inputelement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover" , e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type , e => {
            dropZoneElement.classList.remove("drop-zone--over");
        })
    });

    dropZoneElement.addEventListener("drop" ,  e =>{
        e.preventDefault();

       
        if(e.dataTransfer.files.length){
            inputelement.files = e.dataTransfer.files;
            updatethumbnail(dropZoneElement , e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    })
});


function updatethumbnail (dropZoneElement , file){
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
// console.log(file)
    if(dropZoneElement.querySelector(".drop-zone__prompt")){
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }    

    if(!thumbnailElement){
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    if(file.type.startsWith("image/")){
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`
        }
    } else{
        thumbnailElement.style.backgroundImage = null;
    }
}