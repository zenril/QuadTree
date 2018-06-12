import { scope } from './MScope';
import React from 'react';
import ReactDOM from 'react-dom';

import { Measure } from './components/Measure';

export class Interface extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            measure : null,
            lines : [],

        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
        let _this = this;
        scope.map.listenEvent('measure:new', function(measure){
            _this.setState({
                measure : true
            });            
        });
    }

    render()
    {
        return (
            <div className='app-main'>
                {( this.state.measure ?  (
                    <Measure />
                ) :  "" )}
            </div>
        );
    }
}

