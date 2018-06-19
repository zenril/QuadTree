import React from 'react';
import ReactDOM from 'react-dom';

import { Stat, StatBlock } from './components/stat';

class App extends React.Component
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

    render()
    {
        return (
            <div className="c-sheet">
                <StatBlock>
                    <Stat name='str' title='Strength'/>
                    <Stat name='dex' title='Dexterity'/>
                    <Stat name='con' title='Constitution'/>
                    <Stat name='int' title='Intelligence'/>
                    <Stat name='wis' title='Wisdom'/>
                    <Stat name='cha' title='Charisma'/>
                </StatBlock>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("interface")); 