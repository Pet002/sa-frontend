import { EmployeeInterface } from "./IEmployee"
import { MedicineInterface } from "./IMedicine"

export interface OrdersInterface {
    ID: number,

    MedicineID: number,
    Medicine: MedicineInterface,

    OrderAmount: number,
    
    MedicineCompanyID: number,
    MedicineCompany: CompanyInterface,

    OrderTime: Date,

    EmployeeID: number,
    Employee: EmployeeInterface
}
export interface CompanyInterface {
    ID: number,
    Company_Name: string,
	Location: string
}