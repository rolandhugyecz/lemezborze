import './style.css'
import data from "./data.ts";
import { Album } from './album.ts';

const currencySLC :HTMLSelectElement = document.querySelector('#currency') as HTMLSelectElement;
const albumok: Album[] = Album.LoadData(data);
const kosarList: Album[] = [];


const burgerBtn = document.querySelector('#burgerBtn') as HTMLButtonElement | null;
const flexBtns = document.querySelector('#flexBtns') as HTMLDivElement | null;
const albumTB: HTMLTableElement = document.querySelector('#tablazatBody') as HTMLTableElement;
let isIn: boolean = false;
let selectedCurrency: string = "HUF"
let writtenCurrency:string = "Ft";

console.log(albumok.length);


currencySLC.addEventListener('change',()=>{
  selectedCurrency = currencySLC.value;
  switch (currencySLC.value) {
    case "HUF":
      writtenCurrency = "Ft";
      break;
      case "EUR":
        writtenCurrency = "€";
        break;
        case "GBP":
          writtenCurrency = "£";
          break;
          case "USD":
            writtenCurrency = "$";
            break;
          }
          albumTB.innerHTML=""
          TableLoad(albumok, albumTB, Album.kosarba,Album.PriceConvert)
          
        })
TableLoad(albumok, albumTB, Album.kosarba,Album.PriceConvert)
console.log(writtenCurrency);
console.log();


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
     console.log("Nincsenek meg!");
    
} else {
    burgerBtn.addEventListener('click', () => {
        if (!isIn) {
            (document.querySelector('#burger') as HTMLImageElement).src = "src/assets/close.png"
            flexBtns.classList.add("mb-4");
            flexBtns.innerHTML = szoveg;
            isIn=true;
            console.log("added");
            
        } else {
            (document.querySelector('#burger') as HTMLImageElement).src = "src/assets/burger.png"
            flexBtns.classList.remove("mb-4");
            flexBtns.innerHTML = "";
            console.log("removed");
            isIn=false;
        }
    });
 }

 function TableLoad(list: Album[], table: HTMLTableElement, callBackKosar: (index: number, kList: Album[], list: Album[]) => void, callBackCurrency: (price:number,currency:string)=> number): void {
    list.forEach((a, currentIndex) => {
    let currentPrice:number=Math.round(callBackCurrency(a.price,selectedCurrency))
    let tr: HTMLTableRowElement = document.createElement('tr')
    let Acells : string=`<td class="p-2">${a.artist}</td>`+
                              `<td class="p-2">${a.record_name}</td>`+
                              `<td class="p-2">${a.year}</td>`+
                              `<td class="p-2">${a.publisher}</td>`+
                              `<td class="p-2">${currentPrice} ${writtenCurrency}</td>` +
                              `<td class"p-2"><img src="${a.imgurl}" class="w-35 border-white border-2" alt=""></td>` +
                              `<div class="p-4 pt-5 cursor-pointer text-center justify-center" id="kosar${currentIndex}"><img src="src/assets/add-to-bag.png" class="w-20" alt="add-to-bag"></div>`
    tr.innerHTML = Acells;
     table.appendChild(tr);
     callBackKosar(currentIndex, kosarList, list)
  });
}