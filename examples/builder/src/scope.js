class Scope {
    constructor(props){
        this.data = {
            
        };

        this.items = [

        ];

        this.blocks = [

        ];

        this.icons = {

        };
    }

    getStat(name, title) {
        if(!this.data[name]){
            this.data[name] = {
                title: title || "",
                code : name || "",
                value : 0,
                misc : 0,
                add : [],
                mod : 0,
                toString : function(){
                    return this.value;
                }
            };
            this.items.push(this.data[name]);
        }
        return this.data[name]
    }

    getIcon(name) {
        if(!this.icons[name]){
            this.icons[name] = {
                value : false
            };
        }
        return this.icons[name]
    }    


}

export const scope = new Scope();