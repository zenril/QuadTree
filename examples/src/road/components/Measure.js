import { scope } from '../MScope';
import React from 'react';
import ReactDOM from 'react-dom';

export class Measure extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            measure : scope.map.baseMeasure,
            unit : scope.map.baseUnit,
            start : (scope.map.baseMeasure || '') + (scope.map.baseUnit || '')
        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    handleChange(e){
        var value = e.target.value;
        var unit = value.replace(/\s/g, '').match(/\D+$/);
        var val = Number(value.replace(/\s|[^0-9\.]/g, ''));
        console.log(val);
        this.setState({
            start : value,
            measure : val,
            unit :  unit
        }, function(){
            scope.map.baseMeasure = this.state.measure;
            scope.map.baseUnit = this.state.unit;
            scope.map.saveLines();
        });        
    }

    render()
    {
        return (
            <div className="c-panel--lines-line">
                <div className="c-panel--lines-line_label">
                    <label>Measure</label>
                </div>
                <div className="c-panel--lines-line_input">
                    <input type="text" placeholder="30km" value={this.state.start} onChange={ e => this.handleChange(e) } />
                </div>
            </div>
        );
    }
}

