import uuidv4 from 'uuid/v4';
export class EditBlockModel
{
    constructor(conf){
        conf = conf || {};
        this.id = conf.id || uuidv4();
        this.value   = conf.value     || "";
        this.column = conf.column       || 1
        this.deleted =  conf.deleted    || false;
    }

    toString(){
        return this.value;
    }

}

