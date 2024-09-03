export interface SalesReport {
    startDate: string;
    endDate: string;
    totalSales: number;
    totalOrders: number;
    salesReportItems: SalesReportItem[];
  }
  
  export interface SalesReportItem {
    drugId: number;
    drugName: string;
    totalQuantitySold: number;
    totalAmount: number;
  }
  