import { scope } from '../MScope';
import React from 'react';
import ReactDOM from 'react-dom';

export class Measure extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            measure : 0
        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    handleChange(e){
        this.setState({measure : e.target.value}, function(){
            scope.map.baseMeasure = this.state.measure;
        });        
    }

    render()
    {
        return (
            <div className="linerow">
                <input type="number" value={this.state.measure || 0} onChange={ e => this.handleChange(e) } />
            </div>
        );
    }
}

