import './style.css';
import data from './data.ts';
<<<<<<< HEAD:src/kiadas.ts
=======
import { Album } from './album.ts';
>>>>>>> f112ff59c084fc0f5db708a7ea827bbea46901b9:src/kosar.ts

const kosarDiv:HTMLDivElement = document.querySelector("#kosarban") as HTMLDivElement;
const burgerBtn = document.querySelector(
  '#burgerBtn',
) as HTMLButtonElement | null;
const flexBtns = document.querySelector('#flexBtns') as HTMLDivElement | null;
const kiadArtist: HTMLInputElement = document.querySelector('#kiadArtist') as HTMLInputElement;
const kiadTitle: HTMLInputElement = document.querySelector('#kiadTitle') as HTMLInputElement;
const kiadPublisher: HTMLInputElement = document.querySelector('#kiadPublisher') as HTMLInputElement;
const kiadYear: HTMLInputElement = document.querySelector('#kiadYear') as HTMLInputElement;
const kiadPrice: HTMLInputElement = document.querySelector('#kiadPrice') as HTMLInputElement;
const kiadURL: HTMLInputElement = document.querySelector('#kiadURL') as HTMLInputElement;
const kiadasBTN: HTMLDivElement = document.querySelector('#kiadasBTN') as HTMLDivElement;
const torlesBTN: HTMLDivElement = document.querySelector('#torlesBTN') as HTMLDivElement;
let isIn: boolean = false;
let kosarList: Album[] = [];

const savedKosar = localStorage.getItem('kosar');
if (!savedKosar) {
  console.log('Nincs kosár!');
} else {
  kosarList = JSON.parse(savedKosar) as Album[];
}

kosarFeltolt()

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
<<<<<<< HEAD:src/kiadas.ts
}
=======

}
  function kosarFeltolt(): void {
    kosarList.forEach(k => {
      const div = document.createElement('div');
      div.innerHTML = `          <div class="flex flex-row justify-center gap-10" id="kosarban">
              <div class="text-5xl font-bold">${k.record_name}</div>
            </div>`;
      kosarDiv.appendChild(div);
    });
  }

>>>>>>> f112ff59c084fc0f5db708a7ea827bbea46901b9:src/kosar.ts
