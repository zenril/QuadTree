import uuidv4 from 'uuid/v4';
export class StatModel
{
    constructor(conf){
        conf = conf || {};
        this.id = conf.id || uuidv4();
        this.title  = conf.title    || "";
        this.code   = conf.code     || "";
        this.value  = conf.value    || 0;
        this.misc   = conf.misc     || 0;
        this.add    = conf.add      || [];
        this.mod    = conf.mod      || 0;
        this.deleted =  conf.deleted    || false;
        this.type =  conf.type || 'normal';
    }

    toString(){
        return this.value;
    }

}

