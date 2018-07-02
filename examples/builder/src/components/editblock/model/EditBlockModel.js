export class EditBlockModel
{
    constructor(conf){
        conf = conf || {};
        this.value   = conf.value     || "";
        this.deleted =  conf.deleted    || false;
    }

    toString(){
        return this.value;
    }

}

