export class StatModel
{
    constructor(conf){
        conf = conf || {};
        this.title  = conf.title    || "";
        this.code   = conf.code     || "";
        this.value  = conf.value    || 0;
        this.misc   = conf.misc     || 0;
        this.add    = conf.add      || [];
        this.mod    = conf.mod      || 0;
        this.deleted =  conf.deleted    || false;
    }

    toString(){
        return this.value;
    }

}

