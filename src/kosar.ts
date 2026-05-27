import './style.css';
import data from './data.ts';
import { Album } from './album.ts';

const kosarDiv:HTMLDivElement = document.querySelector("#kosarban") as HTMLDivElement;
const burgerBtn = document.querySelector(
  '#burgerBtn',
) as HTMLButtonElement | null;
const flexBtns = document.querySelector('#flexBtns') as HTMLDivElement | null;
let isIn: boolean = false;
let kosarList: Album[] = [];
let kosarTartalom: Map<string, number> = new Map([]);

const savedKosar = localStorage.getItem('kosar');
if (!savedKosar) {
  console.log('Nincs kosár!');
} else {
  kosarList = JSON.parse(savedKosar) as Album[];
}

window.addEventListener('storage', ()=>{
  kosarDict();
  // kosarFeltolt();
  window.location.reload();
})
kosarDict();
// kosarFeltolt();

const szoveg = `
          <div class="flex justify-end mx-8 mb-2"> <!-- Kosár gomb -->
            <div class="border-2 w-17.5 rounded-4xl cursor-pointer hover:bg-[#36a87b]">
              <img src="src/assets/cart.png" alt="Kosár" >
            </div>
          </div>
              <div class="rounded-2xl hover:bg-[#36a87b] mb-2">  <!-- Home gomb -->
                <a href="index.html">
                  <div class="px-4 flex gap-2">
                    <h1>Kezdőlap</h1>
                    <img src="src/assets/homeicon.png" alt="home" class="w-10">
                  </div>
                </a>
              </div>
                        <a href="kiadas.html" >
            <div class="px-4 flex items-center gap-2 rounded-2xl hover:bg-[#36a87b]">
              <h1 id="kiadas">Kiadás</h1>
              <img src="src/assets/vinyl.png" alt="home" class="w-10">
            </div>
          </a>
            <div class="rounded-2xl hover:bg-[#36a87b]"> <!-- Contact gomb -->
              <a href="kapcsolat.html" target="_blank">
                <div class="px-4 flex items-center gap-2">
                  <h1>Kapcsolat</h1>
                  <img src="src/assets/contacticon.png" alt="contact" class="w-10">
                </div>
              </a>
            </div>
`.trim();

if (!burgerBtn || !flexBtns) {
  console.log('Nincsenek meg!');
} else {
  burgerBtn.addEventListener('click', () => {
    if (!isIn) {
      (document.querySelector('#burger') as HTMLImageElement).src =
        'src/assets/close.png';
      flexBtns.classList.add('mb-4');
      flexBtns.innerHTML = szoveg;
      isIn = true;
      console.log('added');
    } else {
      (document.querySelector('#burger') as HTMLImageElement).src =
        'src/assets/burger.png';
      flexBtns.classList.remove('mb-4');
      flexBtns.innerHTML = '';
      console.log('removed');
      isIn = false;
    }
    console.log('changed');
  });

}
function kosarFeltolt(): void {
  kosarDiv.innerHTML='';
  kosarTartalom.forEach((value,key)=>{
    kosarList.forEach(a => {
      let currentIndex: number;
      if(a.record_name==key){
        
      }
    });
    const div = document.createElement('div');
    div.innerHTML = `<div class="flex flex-row justify-center gap-10" id="kosarban">
                    <div class="text-2xl">${value} db ${key}</div>
                    </div>`;
    kosarDiv.appendChild(div);
  })
}

function kosarDict():void{
  kosarList.forEach(k =>{
    const current = kosarTartalom.get(k.record_name);
    if (kosarTartalom.has(k.record_name)) {
      kosarTartalom.set(k.record_name,current+1);
      console.log(kosarTartalom.get(k.record_name));
      console.log(`${k.record_name} +1`);
    }
    else{
      kosarTartalom.set(k.record_name,1);
      console.log(`${k.record_name} hozzáadva`);
    }
  })
  kosarFeltolt();
}

