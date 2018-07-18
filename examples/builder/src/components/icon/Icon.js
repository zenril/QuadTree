import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';
import style from './sass/Icon.scss';

export class Icon extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            data : scope.getIcon(this.props.name)
        };
    }

    handleClick(e){
        var v = !this.state.data.value;
        this.state.data.value = v;

        if(this.props.onClick){
            this.props.onClick(e, this.props.name, v);
        }

        if(v && this.props.onTrue){
            this.props.onTrue(e, this.props.name, v);
        }

        if(!v && this.props.onFalse){
            this.props.onFalse(e, this.props.name, v);
        }

        this.setState({
            data : this.state.data
        });

    }

    render()
    {
        return (
            <div className="c-icon" onClick={e => this.handleClick(e)}>
                <svg className={this.props.id + ' c-icon_svg'}>
                    <use xlinkHref={"../../../svg/symbol-defs.svg#icon-" + this.props.id }></use>
                </svg>
            </div>
        );
    }
}