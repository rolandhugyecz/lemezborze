class Album{
    artist: string;
    record_name: string;
    year: number;
    publisher: string;
    price: number;
    imgurl:string;
    constructor(row: string){
        let slices:string[] = row.split(";")
        this.artist = slices[0];
        this.record_name = slices[1];
        this.year = Number(slices[2]);
        this.publisher = slices[3];
        this.price = Number(slices[4]);
        this.imgurl = slices[5];
    }
        static LoadData(data: string[]): Album[]{
        let albumok: Album[] = [];
        data.forEach(row => {
            albumok.push(new Album(row));
        });
        return albumok;
    }
    static kosarba(index:number, kList:Album[], list:Album[]):void {
        const k = document.querySelector(`#kosar${index}`) as HTMLTableCellElement;
        if (!k) console.log("Nincs kosar element!");
        else{
            k.addEventListener('click', ()=>{
                kList.push(list[index])
                console.log(`${list[index].artist} added`);
                
        })
        }
        }
    static PriceConvert(price:number,currency:string){
        switch (currency) {
            case "HUF":
                return price;
            case "EUR":
                return price*0.0028;
            case "USD":
                return price*0.0032;
            case "GBP":
                return price*0.0024;
            default:
                return 0;
        }
    }
}

export {Album}