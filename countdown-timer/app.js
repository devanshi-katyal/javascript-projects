const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway= document.querySelector(".giveaway")
const deadline= document.querySelector(".deadline")
const items= document.querySelectorAll(".deadline-format h4")

//dynamic date
let futureDate= new Date(2020, 8,25,1,43,0)
const month= months[futureDate.getMonth()]
const year= futureDate.getFullYear()
const hours= futureDate.getHours();
const mins= futureDate.getMinutes();
const weekday= weekdays[futureDate.getDay()]
const date= futureDate.getDate()

giveaway.textContent= `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours} :${mins}`
//future time in ms
const futureTime= futureDate.getTime();
function getRemainingTime(){
    const today= new Date().getTime();
    const t = futureTime- today;
   //value in ms
    const oneDay= 24*60*60*1000;
    const oneHour= 60*60*1000;
    const oneMiute= 60*1000;
    let Days= Math.floor(t/oneDay)
    let hours=Math.floor((t%oneDay) / oneHour)
    let minutes= Math.floor(t%oneHour / oneMiute)
    let seconds= Math.floor(t%oneMiute / 1000)
    //formatting the values
    function format(item){
        if(item <10){
            return item = `0${item}`
        }
        return item
    }
    // setting values array
    const values=[ Days, hours, minutes, seconds]
    items.forEach((item, index) => {
        item.innerHTML= format(values[index])
    })
    if(t<0){
        clearInterval(countdown)
        deadline.innerHTML= `<h4 class="expire"> sorry, this offer has expired. please check again.</h4>`
    }
}
let countdown= setInterval(getRemainingTime, 1000)
getRemainingTime()