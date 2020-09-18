// ****** SELECT ITEMS **********
const alert= document.querySelector(".alert")
const form= document.querySelector(".grocery-form")
const grocery= document.getElementById("grocery")
const submitBtn= document.querySelector(".submit-btn")
const container= document.querySelector(".grocery-container")
const list= document.querySelector(".grocery-list")
const clearBtn= document.querySelector(".clear-btn")
// edit option
let editElement
let editFag= false
let editId= " "
// ****** EVENT LISTENERS **********
form.addEventListener("submit" , addItem)
clearBtn.addEventListener("click", clearItems)
window.addEventListener("DOMContentLoaded", setupItems);
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault()
    const value= grocery.value;
    const id = new Date().getTime().toString()
    if(value && !editFag){
        const element= document.createElement("article")
        //adding class
        element.classList.add("grocery-item")
        // adding id
        const attr= document.createAttribute("data-id")
        attr.value= id
        element.setAttributeNode(attr)
        element.innerHTML= `    <p class="title">${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn"> <i class="fas fa-edit"></i></button>
                    <button type="button" class="delete-btn"> <i class="fas fa-trash"></i></button>
                </div>`
        const deleteBtn= element.querySelector(".delete-btn")
        const editBtn= element.querySelector(".edit-btn")
        deleteBtn.addEventListener("click", deleteItem)
        editBtn.addEventListener("click", editItem)
        //append child
        list.appendChild(element)
        //display alert
        displayAlert("item added succesfully", "success")
        //show container
        container.classList.add("show-container")
        //add to local storage
        addToLocalStorage(id, value)
        //set back to default storage
        setBackToDefault()
    } else if( value && editFag){
        editElement.innerHTML= value
        displayAlert("value changed succesfully", "success")
        setBackToDefault()
        editLocalStorage( editId , editElement)
    } else {
        console.log(" ")
    }

}
function displayAlert(text, action){
    alert.textContent= text
    alert.classList.add(`alert-${action}`)
    // remove alert
    setTimeout(() => {
        alert.textContent=""
        alert.classList.remove(`alert-${action}`)
    }, 2000)
}
//clear button
function clearItems(){
    const items= document.querySelectorAll(".grocery-item")
    if(items.length >0){
        items.forEach( item => {
            list.removeChild(item)
        })
        container.classList.remove("show-container")
        displayAlert("empty list", "danger")
    }
   setBackToDefault()
    localStorage.removeItem("list")
}
function setBackToDefault(){
    grocery.value=""
    editFag= false
    editId=""
    submitBtn.textContent="submit"
}
function editItem(e){
 const element= e.currentTarget.parentElement.parentElement
    //set edit item
    editElement=e.currentTarget.parentElement.previousElementSibling
 console.log(element, editElement)
    //setting form value
    grocery.value= editElement.innerHTML
    editFag= true
    editId= element.dataset.id
    submitBtn.textContent= "edit"
}
function deleteItem(e){

    const element= e.currentTarget.parentElement.parentElement
    const id= element.dataset.id
    console.log("Deleting", element, id)
    list.removeChild(element)
    if( list.children.length === 0){
        container.classList.remove("show-container")
    }
    displayAlert("deleted", "danger")
    setBackToDefault()
    removeFromLocalStorage(id)
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    console.log("adding to loal storage")
    const grocery={id, value}
    let items=getLocalStorage()
    items.push(grocery)
    localStorage.setItem("list", JSON.stringify(items))
}
function removeFromLocalStorage(id){
    let items= getLocalStorage()
    items= items.filter( item => {
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function editLocalStorage(id, value){
    let items= getLocalStorage()
    items= items.map(item =>{
        if(item.id === id){
            item.value= value
        }
        return item
    })
    localStorage.setItem("list", JSON.stringify(items))
}
function getLocalStorage(){
    return localStorage.getItem("list")? JSON.parse(localStorage.getItem('list')):[]
}

// ****** SETUP ITEMS **********
function setupItems(){
    let items= getLocalStorage()
    if(items.length >0){
        items.forEach(item => {
            createlist(item.id, item.value)
        })
        container.classList.add("show-container")
    }
}
function createlist(id, value){
    const element= document.createElement("article")
    //adding class
    element.classList.add("grocery-item")
    // adding id
    const attr= document.createAttribute("data-id")
    attr.value= id
    element.setAttributeNode(attr)
    element.innerHTML= `    <p class="title">${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn"> <i class="fas fa-edit"></i></button>
                    <button type="button" class="delete-btn"> <i class="fas fa-trash"></i></button>
                </div>`
    const deleteBtn= element.querySelector(".delete-btn")
    const editBtn= element.querySelector(".edit-btn")
    deleteBtn.addEventListener("click", deleteItem)
    editBtn.addEventListener("click", editItem)
    //append child
    list.appendChild(element)
}