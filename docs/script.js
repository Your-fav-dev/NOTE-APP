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
        const paragElem = document.createElement("div");
        const delXElem = document.createElement("button");
        // text for elements
        paragElem.innerHTML = userNote;
        delXElem.textContent = "X";
        // element style
        delXElem.classList.add("delete-note");
        paragElem.classList.add("sticky-note");
        paragElem.style.whiteSpace = "pre-wrap";
        // paragElem.style.border = "2px solid red"
        delXElem.style.color = "red";
        // config for delXElem button
        delXElem.addEventListener("click", () => {
            delXElem.parentElement.remove();
            delXElem.previousSibling.remove();
            delXElem.remove();
        })
        // append elements
        olist.appendChild(paragElem);
        paragElem.appendChild(delXElem);
        // clear editor
        tinymce.get("textInput").setContent("")
        tinymce.get("textInput").focus()
    }else if(action === "remove"){
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
      let child = olist.lastChild
      if(child != null){
        child.remove();
      }else {
        return;
      }
});

tinymce.init({
  selector: '#textInput',
  license_key: 'gpl',

  height: 45,
  resize: false,


  selector: 'textarea',
  skin: 'oxide-dark',
  // content_css: 'dark',
  content_style: `
    body {
      background-color: #1D1E26;
      color: #E6E6EB;
    }
  ` ,

  plugins: ['lists', 'code'],
  toolbar: 'bold italic | bullist numlist | code',

  menubar: false,
  branding: false
});


// function test(){
//   const bitch = document.querySelector(".tox tox-tinymce")
//   // const havij = document.getElementById("tinymce")
//   // const parent = havij.parentElement
//   bitch.style.backgroundColor = "black"
// }
// window.onload = test


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

// window.onload = function(){
//     const ad = document.querySelector(".tox-promotion-link");
//     const divWithAd = document.querySelector(".tox-promotion");
//     const otherBs = this.document.querySelector(".tox-menubar");
//     ad.remove()
//     divWithAd.remove()
//     otherBs.remove()
// }
