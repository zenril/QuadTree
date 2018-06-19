import { scope } from '../MScope';
import React from 'react';
import ReactDOM from 'react-dom';

export class PanelLine extends React.Component
{

    constructor(props){
        super(props);
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    handleMouseEnter(e){

        scope.selectedLine = this.props.line;
        scope.selectedLine.state.selected = true;
        if(this.props.onMouseEnter)
            this.props.onMouseEnter(e);
    }

    handleMouseLeave(e){
        
        if(scope.selectedLine){
            scope.selectedLine.state.selected = false;
        }
        scope.selectedLine = null;

        if(this.props.onMouseLeave)
            this.props.onMouseLeave(e);
    }

    handleChange(e){
        this.props.line.name = e.target.value;
        scope.map.saveLines();
    }
    
    componentDidUpdate(){
        //console.log();
    }

    render()
    {
        return (
            <div 
                className="c-panel--lines-line" 
                onMouseEnter={ e => this.handleMouseEnter(e) }
                onMouseLeave={ e => this.handleMouseLeave(e) }>

                
                
                <div className="c-panel--lines-line_label">
                    <label>Length: {this.props.line.getLength()}</label>
                </div>
                <div className="c-panel--lines-line_input">
                    <input type="text" 
                        value={this.props.line.name || ''} 
                        placeholder="name" 
                        onChange={ e => this.handleChange(e) } />
                </div>

            </div>
        );
    }
}

