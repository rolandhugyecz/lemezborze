import './style.css'
const burgerBtn: HTMLButtonElement = document.querySelector('#burgerBtn') as HTMLButtonElement;
const flexBtns: HTMLDivElement = document.querySelector('#flexBtns') as HTMLDivElement;
const szoveg: string = `<a href="index.html"> <div class="px-4 flex items-center gap-2"> <h1>Kezdőlap</h1>
<img src="src/assets/homeicon.png" alt="home" class="w-10"> </div></a><a href="kapcsolat.html" target="_blank"><div class="px-4 flex items-center gap-2"><h1>Kapcsolat</h1>
<img src="src/assets/contacticon.png" alt="home" class="w-10"></div></a><button type="button" class="cursor-pointer border-2 rounded-4xl mx-6"><img src="src/assets/cart.png" alt="Kosár" class="w-12"></button>"`

// burgerBtn.addEventListener('click', ()=>{
//     if (flexBtns.classList.contains("hidden")) {
//         flexBtns.classList.remove("hidden");
//         console.log("removed");
        
//     }
//     else{
//         flexBtns.classList.add("hidden");
//         console.log("added");
        
//     }
burgerBtn.addEventListener('click', ()=>{
    if(flexBtns.innerHTML==szoveg){
        flexBtns.innerHTML=""
        console.log("siker");
        
    }
    else{
        flexBtns.innerHTML==szoveg
        console.log("szoveg");
        console.log(flexBtns.innerHTML);
        
        
    }
})