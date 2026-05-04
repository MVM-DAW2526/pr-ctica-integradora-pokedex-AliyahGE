class Pokemon {

    constructor(data) {

        this.name = data.name;
        this.id = data.id;

        this.sprites = data.sprites;
        
        this.types = data.types;

        this.stats = data.stats;

        this.level = data.level || 1;


        this.hp = this.buscarStat('hp');
        this.hpMax = this.hp;

    }

    buscarStat(nombreStat) {

        for (let i = 0; i < this.stats.length; i++) {

            if (this.stats[i].stat.name === nombreStat) {
                return this.stats[i].base_stat;
            }
        }

        return 50;
    }

    ferMal(dany) {

        this.hp = this.hp - dany;

        if (this.hp < 0) {
            this.hp = 0;
        }
    }

}