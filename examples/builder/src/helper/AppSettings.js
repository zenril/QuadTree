import gdad from "gdrive-appdata";

class AppSettings
{

    debounce (a, b=250, c) {
        return (...d)=>clearTimeout(c,c=setTimeout(()=>a(...d),b))
    }

    constructor(){
    }

    load(cb){
        var _this = this;
        this.settings = null;
        this.tries = 0;
        this.addScript(api => {
            
            api.load('client:auth', _ => {
                this.settingsInit(cb);
            });
        
        });
    }

    failedToInit() {
        this.retry = this.retry || this.debounce(e => {
            this.settingsInit();
        }, 3000);
        this.retry();
    }
    
    settingsInit(cb) {
        this.tries++;
        this.gdad = gdad('appdata.json', '775581458798-if8ovf7b014udbbhlt00l1lff6dskmsu.apps.googleusercontent.com');
        this.gdad.read().then(function (data) {
            cb.call(this, data);
        }, e => {
            this.failedToInit(); 
        });
    }

    save(data){
        this._save = this._save || this.debounce(saveData => {
            this.gdad.save(saveData);
        }, 500);

        this._save(data);
    }


    addScript(cb){
        let script = document.createElement('script'),
        _this = this;
                
        script.type = 'text/javascript'
        script.src = 'https://apis.google.com/js/platform.js'
        script.onload = e => {
            _this.api = window.gapi;
            cb(_this.api, e);
        }
        document.getElementsByTagName('head')[0].appendChild(script)    
    }
}


export const settings = new AppSettings();