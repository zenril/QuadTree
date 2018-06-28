import { scope } from './scope';
import React from 'react';
import ReactDOM from 'react-dom';
import Mustache from 'mustache';
import './thirdparty/mustache-wax';
var gdad = require('gdrive-appdata');


import { Stat, StatBlock } from './components/stat';


class App extends React.Component
{
    constructor(props){
        super(props);
//offovf need to figiur eout
        
        var _this = this;
        window.onLoadCallback = function(){
            gapi.load('client');
            gapi.load('auth', function(){
            var appData = gdad('suecrasseassstosr.json', '775581458798-if8off7b014udbbhlt00l1lff6dskmsu.apps.googleusercontent.com');
                window.appData = appData;
            appData.read().then(function (data) {

            _this.handleJson(data);
            // do something with data here
          }, function () {
            setTimeout(function(){
                appData.read().then(function (data) {
                    _this.handleJson(data);
                    // do something with data here
                  }, function () {
                    // handle error (show UI button and try to read again; this time it will show the authorize popup)
                  });
            }, 1);
          });
        });

    }
        Mustache.Formatters = {
            "add": function (value, tomath) {
                return value + tomath;
            },
            "sub": function (value, tomath) {
                return value - tomath;
            },
            "div": function (value, tomath) {
                return value / tomath;
            },
            "multi": function (value, tomath) {
                return value * tomath;
            }
        }


        this.state = {
            stats : [],
            blockEdit : ''
        }
    }

    componentWillUnmount()
    {
    }

    handleJson(data) {
        console.log(data);
        if(data.data) {
            scope.data = data.data;
        }
        if(data.items){
            scope.items = data.items;
        }
        if(data.blocks){
            scope.blocks = data.blocks;
        }

        this.setState({ stats : scope.items });
    }
    componentDidMount()
    {

    }

    onChange(e){
        this.setState({ stats : scope.items });
    }

    handleBlockEdit(e){
        this.setState({
            blockEdit : e.target.value
        });
    }

    handleSave(e) {
        if(window.appData){
            //console.log(JSON.stringify(scope));
            window.appData.save(scope);
        }
    }

    render()
    {
        var blockPreview = '';
        try{
            blockPreview = Mustache.render(this.state.blockEdit, scope.data);
        } catch (e) {

        }
        return (
            <div className="c-sheet">
            <button onClick={e => this.handleSave(e)}>save</button>
                <StatBlock onChange={ e => this.onChange(e) }>
                    {
                        this.state.stats.map( e => {
                            return <Stat name={e.code} title={e.title}/>
                        })
                    }
                </StatBlock>

                <textarea name='block' onChange={e => this.handleBlockEdit(e)} value={this.state.blockEdit || ''}>
                    
                </textarea>

                <div>
                    <pre>
                    {blockPreview}
                    </pre>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("interface")); 