import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';

import style from './sass/Stat.scss';

export class Stat extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            data : null
        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
        this.setState({
            data  : (
                scope.data[this.props.name] || (scope.data[this.props.name] = {
                    value : 0,
                    misc : 0,
                    mod : 0
                })
            )
        })
    }

    handleChange(e){

        var stat =  scope.data[this.props.name];
        var changed = e.target.name;
        stat[changed] = Number(e.target.value);

        
        stat.mod = Math.floor(
            (stat.value + stat.misc - 10) /2
        );

        this.setState(stat);

        console.log(stat);
    }

    render()
    {
        return this.state.data == null ? '' : (
            <div className="c-stat">
            
                <div className="c-stat-row">
                    <div className="c-stat-row_label">
                        { this.props.name.toUpperCase() }
                    </div>
                    <div className="c-stat-row_input">
                        <input
                            type='number' 
                            id={this.props.name}
                            name="value" 
                            value={ this.state.data.value }
                            onChange={ e => this.handleChange(e) } />
                    </div>
                </div>

                <div className="c-stat-row c-stat-row--misc">
                    <div className="c-stat-row_label">
                        misc
                    </div>
                    <div className="c-stat-row_input">
                        <input
                            type='number' 
                            id={this.props.name + '_misc'}
                            name="misc"
                            value={ this.state.data.misc } 
                            onChange={ e => this.handleChange(e) } />
                    </div>
                </div>
                
                <div className="c-stat-mod">
                    { this.state.data.mod }
                </div>
            
            </div>
        );
    }
}

