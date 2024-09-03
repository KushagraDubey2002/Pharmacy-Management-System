export interface UpdateDrugRequest {
    name: string;
    price: number;
    quantity: number;
    supplierId: number;
    expiryDate: Date;
}