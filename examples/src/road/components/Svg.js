import { scope } from '../MScope';
import React from 'react';
import ReactDOM from 'react-dom';

export class Svg extends React.Component
{

    constructor(props){
        super(props);
    }

    render()
    {
        return (
            <svg className={this.props.id + ' c-icon_svg'}>
                <use xlinkHref={"/src/svg/symbol-defs.svg#icon-" + this.props.id }></use>
            </svg>
        );
    }
}

export class ToolbarIcon extends React.Component
{

    constructor(props){
        super(props);
    }  

    handleClick(e){
        if(!scope.toolbar){
            scope.toolbar = {};
        }

        scope.toolbar[this.props.name] = !scope.toolbar[this.props.name];
        if(this.props.onClick) this.props.onClick(e);
    }

    render()
    {
        return <div onClick={e => this.handleClick(e) } className="c-panel--toolbar-icon">
            { this.props.children }
        </div>
    }
}