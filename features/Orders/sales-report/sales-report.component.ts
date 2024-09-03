import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { SalesReport, SalesReportItem } from '../models/sales-report.model';
//import { SalesReport } from '../models/sales-report.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  salesReport?: SalesReport;
  startDate: Date = new Date();
  endDate: Date = new Date();
  orders: SalesReportItem[]=[] ;

  

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  onGenerateReport(): void {
    if (this.startDate && this.endDate) {
      this.orderService.getSalesReport(this.startDate, this.endDate).subscribe({
        next: (data) => {
          this.salesReport = data;
          if(this.salesReport?.salesReportItems){
            this.orders=this.salesReport?.salesReportItems;
          }
        },
        error: (error) => {
          console.log('Error fetching sales report', error);
        }
      });
    }
  }

  downloadExcel(): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.orders);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'Sales_Report.xlsx');
  }

  printReport(): void{
    window.print();
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validateDates() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      if (start > end) {
        this.endDate = new Date('');
        alert('Invalid');
      }
      else if (start > end) {
        this.endDate = new Date('');
        alert('Invalid');
      }
    }
  }
  
}

