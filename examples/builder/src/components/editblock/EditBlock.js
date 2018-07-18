import { scope } from '../../scope';
import React from 'react';
import ReactDOM from 'react-dom';
//import style from './sass/StatBlock.scss';
import { Icon } from '../icon';
import nunJucks from 'nunjucks';
import ReactMarkdown from 'react-markdown';

export class EditBlock extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            edit : this.props.block,
            editMode : false
        };
        this.blockPreview  = '';
        var _this = this;

        nunJucks.configure({ autoescape: true });

        scope.on(['stat:update', 'scope:save'], e => {
            _this.forceUpdate();
        });
    }

    onChange(e){
        this.state.edit.value = e.target.value;
        this.setState({ edit : this.state.edit });
        scope.fire(['scope:save'], this.state.edit);
    }

    // onDelete(){
    //     this.state.edit.deleted = true;
    //     this.setState({ edit : this.state.edit },
    //     function(){
    //         scope.fire(['block:delete', 'scope:save'], this.state.edit);
    //     });
    // }

    onEdit(){
        this.setState({
            editMode  : !this.state.editMode
        });
    }

    render()
    {
       
        try{
            var tt = nunJucks.renderString(this.state.edit.value, scope.data);
            if(tt){
                this.blockPreview = tt;
            } else {

            }
        } catch (e) {
        }

        return (
            <div className="c-edit-block">
                {/* <button onClick={ e => this.onDelete(e) } >
                    delete
                </button> */}

                <button onClick={ e => this.onEdit(e) } >
                    { this.state.editMode ? 'view mode' : 'edit mode' }
                </button>

                {
                    this.state.editMode ? 
                        <div className="c-edit-block-utils">
                            <textarea 
                                name='edit' 
                                onChange={ e => this.onChange(e) }
                                value={ this.state.edit.value || '' }>
                            </textarea>
                        </div>
                    : 
                        ''
                }

                <div className="c-block-preview">
                    <ReactMarkdown source={ this.blockPreview } />
                </div>
            </div>
        );
    }
}

