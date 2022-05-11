import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { HomeShopComponent } from 'src/app/components/home-shop/home-shop.component';
import { CurrentSystem } from 'src/app/model/current-system.model';

@Component({
	selector: 'void-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	system: CurrentSystem = new CurrentSystem();
	@ViewChild('shop', { static: true }) shop: HomeShopComponent;

	constructor(
		private as: ApiService,
		private cms: ClassMapperService
	) {}

	ngOnInit(): void {
		this.as.getCurrentSystem().subscribe(response => {
			if (response.status=='ok') {
				this.system = this.cms.getCurrentSystem(response.system);
			}
		});
	}

	openShop(id: number): void {
		this.shop.loadShop(id);
	}

	buySell(credits: number): void {
		this.system.credits = credits;
	}
}
