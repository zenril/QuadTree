import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';
//import style from './sass/StatBlock.scss';
import { Icon } from '../icon';
import Mustache from 'mustache';

export class EditBlock extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            edit : this.props.block
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

    onChange(e){
        //console.log('a');
        this.state.edit.value = e.target.value;
        this.setState({ edit : this.state.edit });

        
    }

    render()
    {

        
        var blockPreview = '';

        try{
            var tt = Mustache.render(this.state.edit.value, scope.data);
            if(tt){
                blockPreview = tt;
            } else {
                console.log(tt);
            }
        } catch (e) {
        }

        return (
            <div className="c-edit-block">
                <div className="c-edit-block-utils">
                    <textarea name='edit' onChange={ e => this.onChange(e) } value={this.state.edit.value || ''}>
                    
                    </textarea>
                </div>
 
                <div className="c-block-list">
                    { blockPreview }
                </div>                
            </div>
        );
    }
}

