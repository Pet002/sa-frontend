import { PayMedicineInterface } from './IPayMedicine'
import { EmployeeInterface } from './IEmployee';

export interface ReceiptInterface {
	
	ID?: number,
	
    TotalPrice?: number,
    Receive?: number,
    Refund?: number,

	PayMedicineID?: number,
	PayMedicine?: PayMedicineInterface,

	TypeID?: number,
	Types?:PaymentTypeInterface,

	EmployeeID?: number,
	Employee?:EmployeeInterface,

}

export interface PaymentTypeInterface {
    ID: number,
    TypeName: string

}