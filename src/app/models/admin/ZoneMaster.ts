export class ZoneMaster{
    id!:number;
    zoneName !:string;
    description !: string;
    isActive !: boolean;
    createdBy!:string;
}

export class ZoneCoords {
    id!:number;
    zoneId!:number;
    latitude!:number;
    longitude!:number;
    seqNo :number;
}