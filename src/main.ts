import './style.css'
import data from "./data.ts";
import { Album } from './album.ts';


const albumok: Album[] = Album.LoadData(data);
const kosarList: Album[] = [];


const burgerBtn = document.querySelector('#burgerBtn') as HTMLButtonElement | null;
const flexBtns = document.querySelector('#flexBtns') as HTMLDivElement | null;
const albumTB: HTMLTableElement = document.querySelector('#tablazatBody') as HTMLTableElement;
let isIn: boolean = false;

console.log(albumok.length);

TableLoad(albumok, albumTB, Album.kosarba)

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

 function TableLoad(list: Album[], table: HTMLTableElement, callBackKosar: (index: number, kList: Album[], list: Album[]) => void): void {
   list.forEach((a, currentIndex) => {
     let tr: HTMLTableRowElement = document.createElement('tr')
     let Acells : string=`<td class="p-2">${a.artist}</td>`+
                               `<td class="p-2">${a.record_name}</td>`+
                               `<td class="p-2">${a.year}</td>`+
                               `<td class="p-2">${a.publisher}</td>`+
                               `<td class="p-2">${a.price}</td>` +
                               `<td class="p-2 cursor-pointer" id="kosar${currentIndex}">Kosárba</td>`
     tr.innerHTML = Acells;
     table.appendChild(tr);
     callBackKosar(currentIndex, kosarList, list)
  });
}