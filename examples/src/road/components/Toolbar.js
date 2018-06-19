import { scope } from '../MScope';
import React from 'react';
import ReactDOM from 'react-dom';
import { Svg, ToolbarIcon } from './Svg';

export class ToolBar extends React.Component
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

    handleJSON(e){
        window.localStorage['save_baseMeasure'] = null;// JSON.stringify(this.baseMeasure);
        window.localStorage['save_baseUnit'] =  null;//JSON.stringify(this.baseUnit);
        window.localStorage['save_measure'] = null;//JSON.stringify(scope.map.measure);
        window.localStorage['save_lines'] = null;//JSON.stringify(scope.map.lines);
        window.location.reload();
    }

    render()
    {
        return (
            <div className="c-panel--toolbar">
                <ToolbarIcon name="open" >
                    <Svg id={scope.toolbar.open ? 'circle-right' : 'circle-left'} />
                </ToolbarIcon>

                <ToolbarIcon name="checkmark" onClick={ e => this.handleJSON(e) } >
                    <Svg id={'checkmark'} />
                </ToolbarIcon>
            </div>
        );
    }
}

