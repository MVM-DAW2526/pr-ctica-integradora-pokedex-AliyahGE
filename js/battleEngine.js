class Battle {

    constructor(pokemon1, pokemon2) {

        this.pokemon1 = pokemon1;
        this.pokemon2 = pokemon2;

    }

    atacar(agresor, agredit) {

        // el pokemon que pega busca su stat de ataque, lo divide entre 5 y se lo resta a la vida del agredido
        const atac = agresor.buscarStat('attack');

        const dany = Math.floor(atac / 5);

        agredit.ferMal(dany);

        return dany;
    }

    torn() {

        // pokemon1 se enfada y pega a pokemon2
        this.atacar(this.pokemon1, this.pokemon2);

        if (this.pokemon2.hp <= 0) {
            return this.pokemon1;
        }

        // pokemon2 dewelve el golpe
        this.atacar(this.pokemon2, this.pokemon1);

        if (this.pokemon1.hp <= 0) {
            return this.pokemon2;
        }

        return null;
    }

}