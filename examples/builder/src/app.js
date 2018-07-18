import { scope } from './scope';
import React from 'react';
import ReactDOM from 'react-dom';
import './thirdparty/mustache-wax';



import { Stat, StatBlock, BasicStat } from './components/stat';
import { EditBlock, EditBlockModel } from './components/editblock';
import { Icon } from './components/icon';
import { settings } from './helper/AppSettings';


class App extends React.Component
{
    constructor(props){
        super(props);
        var _this = this;

        this.state = {
            stats : scope.items || (scope.items = []),
            basicStats : scope.basicItems || (scope.basicItems = []),
            blocks : scope.blocks || (scope.blocks = []),
            editStats : false,
            dialog : null,
        }

        scope.on(['stat:delete', 'block:delete', 'stat:update'], e => {
            _this.forceUpdate();
        });
        

        scope.on(['scope:save'], e => {
            settings.save(scope);
        });

        scope.on(['confirmation:request'], e => {
            this.setState({
                dialog : e
            });
        });
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    onBasicChange(e){
        this.setState({ stats : scope.basicItems });
        //scope.populateData();
    }

    onChange(e){
        this.setState({ stats : scope.items });
        //scope.populateData();
    }

    handleDialogDelete(e){
        if(this.state.dialog){
            this.state.dialog.confirm(e);
        }

        this.setState({
            dialog : null
        });
    }

    handleDialogCancel(e){
        if(this.state.dialog){
            this.state.dialog.cancel(e);
        }

        this.setState({
            dialog : null
        });
    }

    handleNewBlock(e, data){
        scope.blocks.push(new EditBlockModel({
            column : data.column
        }));

        this.setState({
            blocks : scope.blocks
        });
    }

    handleStatEdit(e){
        this.setState({
            editStats : !this.state.editStats
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

                    <Icon id="enlarge" name="add-stat" onClick={e => this.handleStatEdit(e)} />    
                    
                    {
                        this.state.stats.filter( e => !e.deleted ).map((e, i) => {
                            return <Stat key={e.id} stat={e} editMode={this.state.editStats} />
                        })
                    }
                </StatBlock>


                {/* <StatBlock onChange={ e => this.onBasicChange(e) }>
                    {
                        this.state.stats.filter( e => !e.deleted ).map((e, i) => {
                            return <Stat key={e.id} name={e.code} title={e.title}/>
                        })
                    }
                </StatBlock> */}
                
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

                {
                    this.state.dialog ? (
                        <div className="c-dialog">
                            <div className="c-dialog-box">
                                <div className="c-dialog-box--message">Are you sure?</div>
                                <div className="c-dialog-box--actions">
                                    <button className="c-dialog-box--confirm" onClick={ e => this.handleDialogDelete(e) }>DELETE MY SHIT</button>
                                    <button className="c-dialog-box--cancel" onClick={ e => this.handleDialogCancel(e) }>Dialog go away</button>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }


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


