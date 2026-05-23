class Album{
    artist: string;
    record_name: string;
    year: number;
    publisher: string;
    price: number;
    constructor(row: string){
        let slices:string[] = row.split(";")
        this.artist = slices[0];
        this.record_name = slices[1];
        this.year = Number(slices[2]);
        this.publisher = slices[3];
        this.price = Number(slices[4]);
    }
        static LoadData(data: string[]): Album[]{
        let albumok: Album[] = [];
        data.forEach(row => {
            albumok.push(new Album(row));
        });
        return albumok;
    }
}

export {Album}