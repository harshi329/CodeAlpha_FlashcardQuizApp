let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
{
    question:"What is HTML?",
    answer:"HTML (HyperText Markup Language) is the standard language used to create and structure web pages."
},
{
    question:"What is CSS?",
    answer:"CSS (Cascading Style Sheets) is used to style and design web pages, including colors, layouts, and fonts."
}
];

let currentIndex = 0;
let editMode = false;

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const flashcard = document.getElementById("flashcard");

const modal = document.getElementById("modal");
const deleteModal = document.getElementById("deleteModal");

function saveStorage(){
    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}

function showToast(message){

    const toast =
    document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}

function displayCard(){

    flashcard.classList.remove("flip");

    question.textContent =
    flashcards[currentIndex].question;

    answer.textContent =
    flashcards[currentIndex].answer;

    document.getElementById("cardCounter").textContent =
    `Card ${currentIndex + 1} of ${flashcards.length}`;

    document.getElementById("progressFill").style.width =
    `${((currentIndex + 1) / flashcards.length) * 100}%`;
}

displayCard();

/* Flip Card */

flashcard.addEventListener("click",()=>{

    flashcard.classList.toggle("flip");

});

/* Next */

document.getElementById("nextBtn").onclick = ()=>{

    currentIndex++;

    if(currentIndex >= flashcards.length){
        currentIndex = 0;
    }

    displayCard();
};

/* Previous */

document.getElementById("prevBtn").onclick = ()=>{

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = flashcards.length - 1;
    }

    displayCard();
};

/* Add Card */

document.getElementById("addBtn").onclick = ()=>{

    editMode = false;

    document.getElementById("modalTitle").textContent =
    "Add Flashcard";

    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";

    document.getElementById("errorMsg").textContent = "";

    modal.style.display = "flex";
};

/* Edit Card */

document.getElementById("editBtn").onclick = ()=>{

    editMode = true;

    document.getElementById("modalTitle").textContent =
    "Edit Flashcard";

    document.getElementById("newQuestion").value =
    flashcards[currentIndex].question;

    document.getElementById("newAnswer").value =
    flashcards[currentIndex].answer;

    document.getElementById("errorMsg").textContent = "";

    modal.style.display = "flex";
};

/* Save Card */

document.getElementById("saveCard").onclick = ()=>{

    const q =
    document.getElementById("newQuestion").value.trim();

    const a =
    document.getElementById("newAnswer").value.trim();

    const errorMsg =
    document.getElementById("errorMsg");

    if(q === "" || a === ""){

        errorMsg.textContent =
        "⚠ Please fill all fields";

        return;
    }

    errorMsg.textContent = "";

    if(editMode){

        flashcards[currentIndex].question = q;
        flashcards[currentIndex].answer = a;

        showToast("✏ Flashcard Updated");

        editMode = false;

    }else{

        flashcards.push({
            question:q,
            answer:a
        });

        currentIndex =
        flashcards.length - 1;

        showToast("✅ Flashcard Added");
    }

    saveStorage();

    modal.style.display = "none";

    displayCard();
};

/* Delete Card */

document.getElementById("deleteBtn").onclick = ()=>{

    deleteModal.style.display = "flex";
};

document.getElementById("cancelDelete").onclick = ()=>{

    deleteModal.style.display = "none";
};

document.getElementById("confirmDelete").onclick = ()=>{

    if(flashcards.length === 1){

        showToast(
        "⚠ At least one flashcard is required"
        );

        deleteModal.style.display = "none";

        return;
    }

    flashcards.splice(currentIndex,1);

    if(currentIndex >= flashcards.length){
        currentIndex =
        flashcards.length - 1;
    }

    saveStorage();

    displayCard();

    deleteModal.style.display = "none";

    showToast("🗑 Flashcard Deleted");
};

/* Close Modal */

document.getElementById("closeModal").onclick = ()=>{

    modal.style.display = "none";
};

window.onclick = (e)=>{

    if(e.target === modal){
        modal.style.display = "none";
    }

    if(e.target === deleteModal){
        deleteModal.style.display = "none";
    }
};

/* Keyboard Controls */

document.addEventListener("keydown",(e)=>{

    if(e.key === "ArrowRight"){
        document.getElementById("nextBtn").click();
    }

    if(e.key === "ArrowLeft"){
        document.getElementById("prevBtn").click();
    }

    if(e.key === "Escape"){

        modal.style.display = "none";
        deleteModal.style.display = "none";
    }
});
