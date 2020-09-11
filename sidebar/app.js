const sideToggle= document.querySelector(".sidebar-toggle");
const sidebar= document.querySelector(".sidebar");
const closebtn= document.querySelector(".close-btn");
sideToggle.addEventListener("click", () =>{
  sidebar.classList.toggle("show-sidebar")
})
closebtn.addEventListener("click", () =>{

  sidebar.classList.remove("show-sidebar")
})
