export interface IFilterEmployee {

    condition: IItem[];            
    access: IItem[];         
    job: IItem[];         
}

export interface IItem {
    name:string,
    alpha3Code:string

}

