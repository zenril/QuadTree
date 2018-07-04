import { scope } from './scope';
import React from 'react';
import ReactDOM from 'react-dom';
import './thirdparty/mustache-wax';



import { Stat, StatBlock } from './components/stat';
import { EditBlock, EditBlockModel } from './components/editblock';
import { settings } from './helper/AppSettings';


class App extends React.Component
{
    constructor(props){
        super(props);
        var _this = this;

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

    handleNewBlock(e, data){
        scope.blocks.push(new EditBlockModel({
            column : data.column
        }));

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
                        this.state.stats.filter( e => !e.deleted ).map((e, i) => {
                            return <Stat key={e.id} name={e.code} title={e.title}/>
                        })
                    }
                </StatBlock>
                
                <div className='c-blockcols'>
                    <div className='c-blockcols-list'>
                        <button onClick={ e => this.handleNewBlock(e, { column : 1 })}>ADD col 1</button>
                        {
                            this.state.blocks.filter( e => !e.deleted && e.column == 1 ).map( (e, i) => {
                                return (
                                    <EditBlock key={e.id} block={e} />
                                );
                            })
                        }
                    </div>

                    <div className='c-blockcols-list'>
                        <button onClick={ e => this.handleNewBlock(e, { column : 2 })}>ADD col 2</button>
                        {
                            this.state.blocks.filter( e => !e.deleted && e.column == 2 ).map( (e, i) => {
                                return (
                                    <EditBlock key={e.id} block={e} />
                                );
                            })
                        }
                    </div>
                    
                </div>


            </div>
        );
    }
}


settings.load(function(data){

    if(data.items) {
        scope.loadStats(data.items);
    }

    if(data.blocks) {
        scope.loadBlocks(data.blocks);
    }

    ReactDOM.render(<App />, document.getElementById("interface"));
});


