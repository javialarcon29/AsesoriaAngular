import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  income: number = 0;
  period: string = 'monthly';
  taxType: string = 'irpf';
  taxAmount: number | null = null;
  netIncome: number | null = null;
  grossIncome: number | null = null;

  calculateTax(): void {
    const annualIncome = this.period === 'monthly' ? this.income * 12 : this.income;
    this.grossIncome = annualIncome;

    switch (this.taxType) {
      case 'irpf':
        this.calculateIRPF(annualIncome);
        break;
      case 'sociedades':
        this.calculateSociedades(annualIncome);
        break;
      case 'autonomos':
        this.calculateAutonomos(annualIncome);
        break;
      default:
        break;
    }
  }

  calculateIRPF(income: number): void {
    const taxRate = this.getIRPFTaxRate(income);
    this.taxAmount = income * taxRate;
    this.netIncome = income - this.taxAmount;
  }

  calculateSociedades(income: number): void {
    const taxRate = 0.25; // Tipo fijo del 25%
    this.taxAmount = income * taxRate;
    this.netIncome = income - this.taxAmount;
  }

  calculateAutonomos(income: number): void {
    const flatFee = 294; // Cuota fija de autónomos en España
    const taxRate = this.getIRPFTaxRate(income);
    this.taxAmount = income * taxRate + flatFee;
    this.netIncome = income - this.taxAmount;
  }

  getIRPFTaxRate(income: number): number {
    if (income <= 12450) {
      return 0.19;
    } else if (income <= 20200) {
      return 0.24;
    } else if (income <= 35200) {
      return 0.30;
    } else if (income <= 60000) {
      return 0.37;
    } else {
      return 0.45;
    }
  }
}

