const btns= document.querySelectorAll(".tab-btn")
const about= document.querySelector(".about")
const articles= document.querySelectorAll(".content")
about.addEventListener("click", function(e){
    // console.log(e.target)
    const id =e.target.dataset.id
    if(id){
        btns.forEach(btn =>{
            //ermove the active class
            btn.classList.remove("active")

        })
        e.target.classList.add("active")
        //hide he other articles
        articles.forEach( article =>{
            console.log(article)
            article.classList.remove("active")
        })
        const element= document.getElementById(id)
        element.classList.add("active")
    }

})