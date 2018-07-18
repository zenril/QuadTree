import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';
import style from './sass/StatBlock.scss';
import { Icon } from '../icon';

export class StatBlock extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            add : {
                title: "",
                code: ""
            }
        };
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    handleChange(e){
    }

    addStat(e,n,v) {

        console.log('a');
        var t = scope.getStat(
            this.state.add.code,
            this.state.add.title
        );

        scope.fire(['scope:save'], this.state.edit);

        if(this.props.onChange){
            this.props.onChange(this.state.add);
        }
    }

    onChange(e){
        this.state.add[e.target.name] = e.target.value;
        this.setState({ add : this.state.add });
    }

    render()
    {
        return (
            <div className="c-block">
                <div className="c-block-utils">
                    <input name="code" type='text'  value={this.state.add.code || ''} onChange={ e => this.onChange(e) } />
                    <input name="title" type='text' value={this.state.add.title || ''} onChange={ e => this.onChange(e) } />
                    <Icon id="plus" name="add-stat" onClick={ (e, n, v)  => { this.addStat(e, n, v)}} />
                </div>

                <div className="c-block-list">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

