import { Component } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { MessageService } from '../../core/services/message.service';
import { Supplier } from '../../core/models/supplier';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
    suppliers: Supplier[] = [];

    constructor(private supplierService: SupplierService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.getSuppliers();
    }

    getSuppliers(): void {
        this.supplierService.getSuppliers()
            .subscribe(suppliers => this.suppliers = suppliers);
    }

    // add(name: string, address: string): void {
    //     const HeroName = name.trim();
    //     const HeroAddress = address.trim();

    //     if (!HeroName) { return; }
    //     this.supplierService.addHero({ Name: HeroName, Address: HeroAddress } as Supplier)
    //         .subscribe(hero => {
    //             this.heroes.push(hero);
    //         });
    // }

    delete(supplier: Supplier): void {
        this.suppliers = this.suppliers.filter(h => h !== supplier);
        this.supplierService.deleteSupplier(supplier.Id).subscribe();
    }
}
