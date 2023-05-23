document.querySelectorAll(".drop-zone__input").forEach(inputelement => {
    const dropZoneElement = inputelement.closest(".drop-zone");

    dropZoneElement.addEventListener("dragover" , e => {
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type , e => {
            dropZoneElement.classList.remove("drop-zone--over");
        })
    });
});