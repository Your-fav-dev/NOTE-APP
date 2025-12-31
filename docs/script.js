const parentDiv = document.getElementById("parentDiv");
const childDiv = document.getElementById("childDiv");
const olist  = document.getElementById("olist");
const textUserInput = document.getElementById("textInput");
const addButton = document.getElementById("addBtn");
const deleteButton = document.getElementById("deleteBtn");
const saveButton = document.getElementById("saveBtn");

function addOrRemoveNotes(action){
    performance.mark("note-op-start");

    let userNote = tinymce.get('textInput').getContent();
    if(!userNote.trim()){
        return;
    }else if(action === "add"){
        // child elements added
        const paragElem = document.createElement("p");
        const delXElem = document.createElement("button");
        // text for elements
        paragElem.innerHTML = userNote;
        delXElem.textContent = "X";
        // element style
        paragElem.style.whiteSpace = "pre-wrap";
        delXElem.style.color = "red";
        // config for delXElem button
        delXElem.addEventListener("click", () => {
            delXElem.previousSibling.remove();
            delXElem.remove();
        })
        // append elements
        olist.appendChild(paragElem);
        olist.appendChild(delXElem);
        // clear editor
        tinymce.get("textInput").setContent("")
        tinymce.get("textInput").focus()
    }else if(action === "remove"){
        olist.lastChild.previousSibling.remove()
        olist.lastChild.remove()
    }
    // 2. End the timer and measure the difference
    performance.mark("note-op-end");
    performance.measure(`Note ${action} Speed`, "note-op-start", "note-op-end");

    // 3. Optional: Log to console immediately
    const lastMeasure = performance.getEntriesByName(`Note ${action} Speed`).pop();
    console.log(`${action} took ${lastMeasure.duration.toFixed(4)}ms`);
}

addButton.addEventListener("click", () => {
    addOrRemoveNotes("add");
});
deleteButton.addEventListener("click", () => {
    const lastChild = olist.lastChild;
    const sibling = lastChild.previousSibling;
    sibling.remove();
    lastChild.remove();
});

tinymce.init({
  selector: '#textInput',
//   height: 300,
//   with: 200,

  license_key: 'gpl',

  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
    'preview', 'anchor', 'searchreplace', 'visualblocks',
    'code', 'fullscreen', 'insertdatetime', 'media',
    'table', 'help', 'wordcount'
  ],

  toolbar:
    'undo redo | blocks | ' +
    'bold italic underline strikethrough | forecolor backcolor | ' +
    'bullist numlist outdent indent | ' +
    'removeformat | link image media table | ',

  menubar: true,

  branding: false
});
 /* 
   plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
    'preview', 'anchor', 'searchreplace', 'visualblocks',
    'code', 'fullscreen', 'insertdatetime', 'media',
    'table', 'help', 'wordcount'
  ],

  toolbar:
    'undo redo | blocks | ' +
    'bold italic underline strikethrough | forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | ' +
    'removeformat | link image media table | ' +
    'code fullscreen preview help',

 */

window.onload = function(){
    const ad = document.querySelector(".tox-promotion-link");
    const divWithAd = document.querySelector(".tox-promotion");
    const otherBs = this.document.querySelector(".tox-menubar");
    ad.remove()
    divWithAd.remove()
    otherBs.remove()
}
