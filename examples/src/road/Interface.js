import { scope } from './MScope';
import React from 'react';
import ReactDOM from 'react-dom';

import { Measure } from './components/Measure';
import { ToolBar } from './components/Toolbar';
import { PanelLine } from './components/PanelLine';

export class Interface extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            measure : scope.map.measure,
            lines : scope.map.lines
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

        scope.map.listenEvent('line:new', function(measure){
            
            _this.setState({
                lines : scope.map.lines
            }, function(){
                console.log(_this.state.lines);
            });            
        });
    }

    render()
    {
        return (
            <div className='c-panel'>
                <div className="c-panel--inner">
                    <ToolBar />
                    {scope.toolbar.open ? (
                        <div className='c-panel--lines'>
                            
                            {( this.state.measure ?  (
                                <Measure />
                            ) :  "" )}

                            {(
                                this.state.lines.map( (l) => {
                                    return <PanelLine line={l} />;
                                })
                            )}

                        </div>
                    ) : ''}
                </div>
            </div>
        );
    }
}

