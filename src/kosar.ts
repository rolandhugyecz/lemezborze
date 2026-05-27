import './style.css';
import { Album } from './album.ts';

const kosarDiv:HTMLDivElement = document.querySelector("#kosarban") as HTMLDivElement;
const burgerBtn: HTMLButtonElement = document.querySelector('#burgerBtn') as HTMLButtonElement;
const flexBtns: HTMLDivElement = document.querySelector('#flexBtns') as HTMLDivElement;
const osszPenzSpan: HTMLSpanElement = document.querySelector('#osszPenz') as HTMLSpanElement;
const torlesBTN: HTMLDivElement = document.querySelector('#torlesBTN') as HTMLDivElement;
const currencySLC: HTMLSelectElement = document.querySelector('#currency') as HTMLSelectElement;
const currencySLCBurgered: HTMLSelectElement = document.querySelector('#currency2') as HTMLSelectElement;
const curr:HTMLSpanElement = document.querySelector('#curr') as HTMLSpanElement;
let isIn: boolean = false;
let kosarList: Album[] = [];
let kosarTartalom: Map<string, number> = new Map([]);
let selectedCurrency: string = 'HUF';
let writtenCurrency: string = 'Ft';



if (currencySLCBurgered) {
  currencySLCBurgered.addEventListener('change', () => {
    currencyChange(currencySLCBurgered);
    curr.innerHTML=writtenCurrency;
    console.log(selectedCurrency);
    
  });
}
if (currencySLC) {
  currencySLC.addEventListener('change', () => {
    currencyChange(currencySLC);
    curr.innerHTML=writtenCurrency;
    console.log(selectedCurrency);

  });
}



function currencyChange(SLC: HTMLSelectElement) {
  selectedCurrency = SLC.value;
  console.log(selectedCurrency);
  
  switch (SLC.value) {
    case 'HUF':
      writtenCurrency = 'Ft';
      break;
    case 'EUR':
      writtenCurrency = '€';
      break;
    case 'GBP':
      writtenCurrency = '£';
      break;
    case 'USD':
      writtenCurrency = '$';
      break;
  }
}

torlesBTN.addEventListener('click',()=>{
  kosarList=[];
  localStorage.removeItem('kosar');
  kosarTartalom.clear();
  window.location.reload();
  console.log(savedKosar);
  
})

const savedKosar = localStorage.getItem('kosar');
if (!savedKosar) {
  console.log('Nincs kosár!');
} else {
  kosarList = JSON.parse(savedKosar) as Album[];
}

window.addEventListener('storage', ()=>{
  kosarDict();
  window.location.reload();
})

kosarDict();

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
            </div>
`.trim();

if (!burgerBtn || !flexBtns) {
  console.log('Nincsenek meg!');
} else {
  burgerBtn.addEventListener('click', () => {
    console.log("nyom");
    
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
  let currentIndex = 0;
  kosarDiv.innerHTML='';
  let osszPenz:number = 0;
  kosarTartalom.forEach((value,key)=>{
    let currentIndex: number = 0;
    for (let i = 0; i < kosarList.length; i++) {
      if (kosarList[i].record_name==key) {
        currentIndex = i;
      }
    }
    const a:Album=kosarList[currentIndex];
    const div = document.createElement('div');
    div.innerHTML = `<div class="flex flex-row justify-center gap-10" id="kosarban">
                    <div class="text-2xl"><b>${value} db </b> ${a.artist}: ${key}</div>
                    <div class="text-2xl">Ár: ${Album.PriceConvert((a.price*value),selectedCurrency)}</div>
                    </div>`;
    kosarDiv.appendChild(div);
    osszPenz += a.price*value;
    console.log(`${a.price*value} added`);
    
  })
  
  osszPenzSpan.innerHTML=osszPenz.toString();
  console.log(`${osszPenz} ${writtenCurrency}`);
}

function kosarDict():void{
  kosarList.forEach(k =>{
    const current = kosarTartalom.get(k.record_name) ?? 0;
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



export default torlesBTN;