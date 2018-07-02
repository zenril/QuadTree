import { scope } from './scope';
import React from 'react';
import ReactDOM from 'react-dom';
import Mustache from 'mustache';
import './thirdparty/mustache-wax';



import { Stat, StatBlock } from './components/stat';
import { EditBlock } from './components/editblock';
import { settings } from './helper/AppSettings';


class App extends React.Component
{
    constructor(props){
        super(props);
        
        var _this = this;
       

    
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
            stats : scope.items || (scope.items = []),
            blocks : scope.block || (scope.block = [])
        }
    }

    componentWillUnmount()
    {
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

    handleNewBlock(e){
        scope.blocks.push({
            value : ""
        });
        this.setState({
            blocks : scope.blocks
        });
    }

    handleSave(e) {
        settings.save(scope);
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
                <button onClick={ e => this.handleNewBlock(e) } >
                add</button>
                {
                    this.state.blocks.map( i => {
                        return (
                            <EditBlock block={i}/>
                        );
                    })
                }
            </div>
        );
    }
}


settings.load(function(data){
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

    ReactDOM.render(<App />, document.getElementById("interface")); 
});


