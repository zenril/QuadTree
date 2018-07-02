import { scope } from './scope';
import React from 'react';
import ReactDOM from 'react-dom';
import Mustache from 'mustache';
import './thirdparty/mustache-wax';



import { Stat, StatBlock } from './components/stat';
import { EditBlock, EditBlockModel } from './components/editblock';
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
            blocks : scope.blocks || (scope.blocks = [])
        }

        scope.on(['stat:delete', 'block:delete'], e => {
            _this.forceUpdate();
        });

        scope.on(['scope:save'], e => {
            settings.save(scope);
        });
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

    handleNewBlock(e){
        scope.blocks.push(new EditBlockModel());

        this.setState({
            blocks : scope.blocks
        });
    }

    handleSave(e) {
        settings.save(scope);
    }

    render()
    {
        return (
            <div className="c-sheet">
            <button onClick={e => this.handleSave(e)}>save</button>
                <StatBlock onChange={ e => this.onChange(e) }>

                    {
                        this.state.stats.filter( e => !e.deleted ).map( (e, i) => {
                            return <Stat key={i} name={e.code} title={e.title}/>
                        })
                    }
                </StatBlock>
                <button onClick={ e => this.handleNewBlock(e) } >
                add</button>
                {
                    this.state.blocks.filter( e => !e.deleted ).map( (e, i) => {
                        return (
                            <EditBlock key={i} block={e}/>
                        );
                    })
                }
            </div>
        );
    }
}


settings.load(function(data){
    if(data.items){
        scope.loadStats(data.items);
    }

    if(data.blocks){
        scope.loadBlocks(data.blocks);
    }

    ReactDOM.render(<App />, document.getElementById("interface"));
});


