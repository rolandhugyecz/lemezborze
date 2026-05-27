import './style.css';
import data from './data.ts';
import { Album } from './album.ts';
const currencySLC: HTMLSelectElement = document.querySelector('#currency') as HTMLSelectElement;
const currencySLCBurgered: HTMLSelectElement = document.querySelector('#currency2') as HTMLSelectElement;
const sortingSLC: HTMLSelectElement = document.querySelector('#sorting') as HTMLSelectElement;
const albumok: Album[] = Album.LoadData(data);
const burgerBtn : HTMLButtonElement = document.querySelector('#burgerBtn') as HTMLButtonElement;
const flexBtns: HTMLDivElement = document.querySelector('#flexBtns') as HTMLDivElement;
const albumTB: HTMLTableElement = document.querySelector('#tablazatBody') as HTMLTableElement;
const searchBTN: HTMLDivElement = document.querySelector('#searchBTN') as HTMLDivElement;
const searchTXB: HTMLInputElement = document.querySelector('#search') as HTMLInputElement;
const savedSLC: any = localStorage.getItem('selected');
const savedCurrency: any = localStorage.getItem('currency');
let isIn: boolean = false;
let selectedCurrency: any = 'HUF';
let writtenCurrency: string = 'Ft';
let sortedList: Album[] = [...albumok];
let searchedList: Album[] = [];
let isSorted: boolean = false;
let isSearched: boolean = false;
let kosarList: Album[] = [];

if (savedCurrency) {
  writtenCurrency=savedCurrency;
}

if (savedSLC) {
  selectedCurrency = savedSLC;
  currencySLC.value=savedSLC;
  currencySLCBurgered.value=savedSLC;
}

window.addEventListener('storage', ()=>{
  window.location.reload();
})

const savedKosar = localStorage.getItem('kosar');
if (!savedKosar) {
  console.log('Nincs kosár!');
} else {
  kosarList = JSON.parse(savedKosar) as Album[];
}


searchBTN.addEventListener('click', () => {
  searchedList = [];
  let keresTXT: string | number = searchTXB.value.toUpperCase();
  if (keresTXT == '') {
    TableLoad(albumok, albumTB, Album.kosarba, Album.PriceConvert);
    isSearched = false;
  } else {
    albumok.forEach((a) => {
      if (
        a.artist.toUpperCase() == keresTXT ||
        a.record_name.toUpperCase() == keresTXT ||
        a.publisher == keresTXT
      ) {
        searchedList.push(a);
      }
    });
    if (searchedList.length == 0) {
      alert('Nincs ilyen album!');
    } else {
      isSearched = true;
      TableLoad(searchedList, albumTB, Album.kosarba, Album.PriceConvert);
    }
  }
});

sortingSLC.addEventListener('change', () => {
  if (isSearched) {
    sortedList = [...searchedList];
    console.log(sortedList);

    Sort(sortedList, sortingSLC.value);
    isSorted = true;
  } else {
    sortedList = [...albumok];
    Sort(sortedList, sortingSLC.value);
    isSorted = true;
  }
});

function currencyChange(list: Album[], SLC: HTMLSelectElement) {
  selectedCurrency = SLC.value;
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
  TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
   localStorage.setItem('currency',writtenCurrency);
}

currencySLCBurgered.addEventListener('change', () => {
  if (isSorted) {
    currencyChange(sortedList, currencySLCBurgered);
  } else if (isSearched) {
    currencyChange(searchedList, currencySLCBurgered);
  } else {
    currencyChange(albumok, currencySLCBurgered);
  }
  localStorage.setItem('selected',selectedCurrency);
  localStorage.setItem('currency',writtenCurrency);
});

currencySLC.addEventListener('change', () => {
  if (isSorted) {
    currencyChange(sortedList, currencySLC);
  } else if (isSearched) {
    currencyChange(searchedList, currencySLC);
  } else {
    currencyChange(albumok, currencySLC);
  }
  localStorage.setItem('selected',selectedCurrency);
  localStorage.setItem('currency',writtenCurrency);
});

TableLoad(albumok, albumTB, Album.kosarba, Album.PriceConvert);

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
function TableLoad(
  list: Album[],
  table: HTMLTableElement,
  callBackKosar: (index: number, kList: Album[], list: Album[]) => void,
  callBackCurrency: (price: number, currency: string) => number,
): void {
  table.innerHTML = '';
  list.forEach((a, currentIndex) => {
    let currentPrice: number = Math.round(
      callBackCurrency(a.price, selectedCurrency),
    );
    let tr: HTMLTableRowElement = document.createElement('tr');
    let Acells: string =
      `<td class="p-2">${a.artist}</td>` +
      `<td class="p-2">${a.record_name}</td>` +
      `<td class="p-2">${a.year}</td>` +
      `<td class="p-2">${a.publisher}</td>` +
      `<td class="p-2">${currentPrice} ${writtenCurrency}</td>` +
      `<td class"p-2"><img src="${a.imgurl}" class="w-35 border-white border-2" alt=""></td>` +
      `<div class="p-4 pt-5 cursor-pointer text-center justify-center" id="kosar${currentIndex}"><img src="src/assets/add-to-bag.png" class="w-20" alt="add-to-bag"></div>`;
    tr.innerHTML = Acells;
    table.appendChild(tr);
    callBackKosar(currentIndex, kosarList, list);
  });
}
function Sort(list: Album[], sortBy: string): void {
  switch (sortBy) {
    case 'AZ':
      list.sort((a, b) => a.artist.localeCompare(b.artist));
      TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
      break;
    case 'ZA':
      list.sort((b, a) => a.artist.localeCompare(b.artist));
      TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
      break;
    case 'KN':
      list.sort((a, b) => a.year - b.year);
      TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
      break;

    case 'KCS':
      list.sort((a, b) => b.year - a.year);
      TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
      break;

    case 'AN':
      list.sort((a, b) => a.price - b.price);
      TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
      break;

    case 'ACS':
      list.sort((a, b) => b.price - a.price);
      TableLoad(list, albumTB, Album.kosarba, Album.PriceConvert);
      break;
    default:
      TableLoad(albumok, albumTB, Album.kosarba, Album.PriceConvert);
      isSorted = false;
      break;
  }
}
