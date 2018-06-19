import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';
import style from './sass/StatBlock.scss';

export class StatBlock extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    handleChange(e){
    }

    render()
    {
        return (
            <div className="c-block">
                { this.props.children }
            </div>
        );
    }
}

