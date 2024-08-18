let addBtn = document.getElementById("addBtn");
let container = document.querySelector("#container");

addBtn.addEventListener('click',()=>{
    addNote();
});

const saveNote = () =>{
    const notes = document.querySelectorAll(".card textarea");
    const data =[];
    notes.forEach(note => {
        data.push(note.value);
    });
    if(data.length === 0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
};


const addNote = (text = "") =>{
    const note = document.createElement("div");
    note.classList.add("card");
    note.innerHTML = `
    <div class="card" id="card">
        <div class="btn-area">
        <button id="saveBtn"><img id="changeImg" src="img/save.png"></button>
        <h2>Note</h2>
        <button id="delBtn"><img src="img/delete.png"></button>
        </div>
        <textarea id="textArea" rows="15" cols="50" placeholder="Type here..." autocomplete="off">${text}</textarea>
    </div>`;

    note.querySelector("#delBtn").addEventListener("click",()=>{
        note.remove();
        saveNote();
    });

    note.querySelector("#saveBtn").addEventListener('click',()=>{
        saveNote();
    });
    note.querySelector("textarea").addEventListener("keypress",function(){
        note.querySelector("#changeImg").src = "img/refresh.png";
    })
    note.querySelector("textarea").addEventListener("mouseout",function(){
        note.querySelector("#changeImg").src = "img/save.png";
        saveNote();
    })

    // note.querySelector("textarea").addEventListener("focusout",
    //     function(){
    //         saveNote();
    //     }
    // )
    container.appendChild(note);
    saveNote();
};

(
    function () {
        const Lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(Lsnotes === null){
            addNote()
        }
        else{
            Lsnotes.forEach(lsNote => {
                addNote(lsNote);
            });
        }
    }
)()
// // <div class="card" id="card">
// //     <div class="btn-area">
// //         <button id="saveBtn"><img src="img/save.png"></button>
// //         <h2>Note</h2>
// //         <button id="delBtn"><img src="img/delete.png"></button>
// //     </div>
// //     <textarea id="textArea" rows="15" cols="50" placeholder="Type here..." autocomplete="off"></textarea>
// // </div>`
