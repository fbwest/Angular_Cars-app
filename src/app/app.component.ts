import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required]
  });

  // carsData = [
  //   { image: "1", name: "Lamborghini Huracan Spyder", gear: "полный", engine: 5.2, seats: 2 },
  //   { image: "2", name: "Chevrolet Corvette", gear: "полный", engine: 6.2, seats: 2 },
  //   { image: "3", name: "Ferrari California", gear: "полный", engine: 3.9, seats: 4 },
  //   { image: "4", name: "Lamborghini Urus", gear: "полный", engine: 4.0, seats: 5 },
  //   { image: "5", name: "Audi R8", gear: "полный", engine: 5.2, seats: 2 },
  //   { image: "6", name: "Chevrolet Camaro", gear: "полный", engine: 2.0, seats: 4 }
  // ];
  carsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car){
      this.priceForm.patchValue({car: car.name});
    }
  }

  onSubmit() {
    if (this.priceForm.valid) {
      this.appService
        .sendQuery(this.priceForm.value)
        .subscribe({
          next: (response: any) => { alert(response.message); this.priceForm.reset() },
          error: (response) => { alert(response.error.message); }
        });
    }
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }
}
