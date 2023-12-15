export class TRAVEL {
    public uuid: string;
    public country: string;
    public city: string;
    public beginDate: string;
    public endDate: string;

    constructor(uuid: string, country: string, city: string, beginDate: string, endDate: string) {
        this.uuid = uuid;
        this.country = country;
        this.city = city;
        this.beginDate = beginDate;
        this.endDate = endDate;
    }

}