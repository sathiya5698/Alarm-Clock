const selectMenu = document.querySelectorAll("select");
// console.log(selectMenu);
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
let alarmImg = document.querySelector("img");

let alarmTime;
let isAlaramSet = false;
let ringTone = new Audio("Alarm.mp3")

for(let i=12 ; i>0 ; i--)
{
    i = i < 10 ? "0" + i : i ;
    let option = `<option value=${i}>${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59 ; i>0 ; i--)
{
    i = i < 10 ? "0" + i : i ;
    let option = `<option value=${i}>${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2 ; i>0 ; i--)
{
    let ampm = i == 1 ? "AM" : "PM" ;
    let option = `<option value=${ampm}>${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(()=>{

    let date = new Date()
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h>=12)
    {
        h = h-12;
        ampm = "PM"
    }

    h = h==0 ? h=12 : h;

    h = h<10 ? "0"+h : h;
    m = m<10 ? "0"+m : m;
    s = s<10 ? "0"+s : s;

    // console.log(`${h}:${m}:${s} ${ampm}`);
    currentTime.innerHTML=`${h}:${m}:${s} ${ampm}`;
    
    if(alarmTime==`${h}:${m} ${ampm}`)
    {
        // console.log("Alarm ringing...")
        alarmImg.src = "Alarm.png";
        alarmImg.classList.add("size1");
        ringTone.play();
        ringTone.loop = true;
    }
}, 1000)

setAlarmBtn.addEventListener("click", setAlaram);

function setAlaram()
{
    if(isAlaramSet)
    {
        alarmTime = "";
        ringTone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerHTML = "Set Alarm";
        alarmImg.classList.remove("size1");
        alarmImg.src = "Alarmoff.png";
        return isAlaramSet = false ;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM"))
    {
        return alert("Please, select a valid time to Set Alaram!")
    }
    isAlaramSet = true;
    alarmTime=time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alaram";
    // console.log(time);
}