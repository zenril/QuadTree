import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';

import style from './sass/Stat.scss';

export class Stat extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            data : props.stat || scope.getStat(
                this.props.stat.code, 
                this.props.stat.title
            ),
            editMode : props.editMode
        }
    }

    componentDidUpdate()
    {
        if(this.props.editMode !=  this.state.editMode) {
            this.setState({
                editMode : this.props.editMode
            });
        }
    }

    componentDidMount()
    {
    }

    handleChange(e){
        var stat =  this.state.data;
        var changed = e.target.name;

        if(changed == 'misc' || changed == 'value'){
            stat[changed] = Number(e.target.value);
        } else {
            stat[changed] = e.target.value;
        }

        stat.mod = Math.floor(
            (stat.value + stat.misc - 10) / 2
        );

        this.setState({ data : stat },
        function(){
            scope.fire(['stat:update', 'scope:save'], stat);
        });
    }

    deleteAction(){
        this.state.data.deleted = true;
        this.setState({ data : this.state.data },
        () => {
            scope.fire(['stat:delete', 'scope:save'], this.state.data);
        });
    }

    onDelete(){
        scope.fire(['confirmation:request'], {
            confirm : () => {
                this.deleteAction();
                scope.fire(['scope:save'], {});
            },
            cancel : () => {
                
            }
        });
    }

    render()
    {
        return this.state.data == null ? '' : (
            <div className="c-stat">
            {   
                this.state.editMode ? 
                    <button onClick={ e => this.onDelete(e) } >
                        delete
                    </button>
                :   
                ''
            }
                <div className="c-stat-row">
                    <div className="c-stat-row_label">

                        {   
                            this.state.editMode ? 
                                <input
                                    type='text'
                                    name="code"
                                    value={ this.state.data.code }
                                    onChange={ e => this.handleChange(e) } />
                                :   
                                <span>
                                    { this.state.data.code }
                                </span>
                        }
                    </div>
                    <div className="c-stat-row_input">
                        {   
                            this.state.editMode ? 
                                <input
                                    type='text'
                                    id={this.state.data.name}
                                    name="value"
                                    value={ this.state.data.value }
                                    onChange={ e => this.handleChange(e) } />
                            :   
                                <span>
                                    { this.state.data.value }
                                </span>
                        }
                    </div>
                </div>

                <div className="c-stat-row c-stat-row--misc">
                    <div className="c-stat-row_label">
                        misc
                    </div>
                    <div className="c-stat-row_input">
                        {   
                            this.state.editMode ? 
                                <input
                                    type='text'
                                    id={this.state.data.code + '_misc'}
                                    name="misc"
                                    value={ this.state.data.misc }
                                    onChange={ e => this.handleChange(e) } />
                                :   
                                <span>
                                    { this.state.data.misc }
                                </span>
                        }
                    </div>
                </div>

                <div className="c-stat-mod">
                    { this.state.data.mod }
                </div>

            </div>
        );
    }
}

