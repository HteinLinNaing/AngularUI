import { Component } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { HeroService } from '../../core/services/hero.service';
import { MessageService } from '../../core/services/message.service';
// import { HEROES } from '../mock.heroes';

@Component({
    selector: 'app-heroes',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {

    heroes: Hero[] = [];

    constructor(private heroService: HeroService, private messageService: MessageService) { }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    add(name: string, address: string): void {
        const HeroName = name.trim();
        const HeroAddress = address.trim();

        if (!HeroName) { return; }
        this.heroService.addHero({ Name: HeroName, Address: HeroAddress } as Hero)
            .subscribe(hero => {
                this.heroes.push(hero);
            });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero.Id).subscribe();
    }
}
