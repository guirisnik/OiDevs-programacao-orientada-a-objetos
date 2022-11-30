export class Entities {

    constructor(){
        this.id = this.create_UUID();
    }

    create_UUID() {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt/16);
            return (c == 'x' ? r :(r&0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    
    // module.exports = {create_UUID};

}

// module.exports = Entidade;
// const teste = new Entities
// console.log(teste.id)