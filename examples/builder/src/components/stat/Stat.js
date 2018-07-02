import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';

import style from './sass/Stat.scss';

export class Stat extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            data : scope.getStat(this.props.name)
        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    handleChange(e){
        var stat =  this.state.data;
        var changed = e.target.name;
        stat[changed] = Number(e.target.value);

        stat.mod = Math.floor(
            (stat.value + stat.misc - 10) / 2
        );

        this.setState({ data : stat },
        function(){
            scope.fire(['stat:update', 'scope:save'], stat);
        });
    }

    onDelete(){
        this.state.data.deleted = true;
        this.setState({ data : this.state.data },
        function(){
            scope.fire(['stat:delete', 'scope:save'], this.state.data);
        });
    }

    render()
    {
        return this.state.data == null ? '' : (
            <div className="c-stat">
                <button onClick={ e => this.onDelete(e) } >
                    delete
                </button>

                <div className="c-stat-row">
                    <div className="c-stat-row_label">
                        { this.props.name.toUpperCase() }
                    </div>
                    <div className="c-stat-row_input">
                        <input
                            type='text'
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
                            type='text'
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

