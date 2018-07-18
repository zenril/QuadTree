import { StatModel } from './components/stat';
import { EditBlockModel } from './components/editblock';
import uuidv4 from 'uuid/v4';
import { type } from 'os';
class Scope {
    constructor(props){
        this.data = {

        };

        this.items = [

        ];

        this.basicItems = [

        ];

        this.blocks = [

        ];

        this.icons = {

        };
    }

    getData(key) {
        var t = {};
        key = key || 'code';

        [].concat(this.basicItems, this.items).forEach( i => {
            t[i[key]] = i;
        });

        return t;
    }

    loadStats(stats){
        stats.filter( e => !e.deleted ).forEach( element => {
            var stat = new StatModel(element);
            this.items.push(stat);
            //this.data[stat.code] = stat;
        });
    }

    loadBlocks(blocks){
        blocks.filter( e => !e.deleted ).forEach(element => {
            var block = new EditBlockModel(element);
            this.blocks.push(block);
        });
    }

    getStat(name, title) {

        var items = [].concat(this.basicItems, this.items).filter( i => {
            return i.code == name;
        });

        if(items.length){
            return items[0];
        }
        
        var stat = new StatModel({
            title: title || "",
            code : name || ""
        });

        this.items.push(stat);
        return stat;
    }

    getIcon(name) {
        if(!this.icons[name]){
            this.icons[name] = {
                value : false
            };
        }
        return this.icons[name]
    }

    on (event, cb) {

        if(typeof event != 'string'){
            for (let i = 0; i < event.length; i++) {
                const ev = event[i];
                this.on(ev, cb);
            }
            return;
        }

        this.events = this.events || {};
        this.events[event] = this.events[event] || [];
        this.events[event].push(cb);
    };

    fire (event, data) {
        
        
        if(typeof event != 'string'){
            for (let i = 0; i < event.length; i++) {
                const ev = event[i];
                this.fire(ev, data);
            }
            return;
        }


        if (!this.events || !this.events[event]) return;
        this.events[event].forEach(cb => {
            if(typeof cb == 'function') cb.call(this, data);
        });
    };


}

export const scope = new Scope();