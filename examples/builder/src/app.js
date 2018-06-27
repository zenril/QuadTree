import { scope } from './scope';
import React from 'react';
import ReactDOM from 'react-dom';

import { Stat, StatBlock } from './components/stat';

class App extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            stats : []
        }
    }

    componentWillUnmount()
    {
    }

    componentDidMount()
    {
    }

    onChange(e){
        this.setState({ stats : scope.items });
    }

    render()
    {
        return (
            <div className="c-sheet">
                <StatBlock onChange={ e => this.onChange(e) }>
                    {
                        this.state.stats.map( e => {
                            return <Stat name={e.code} title={e.title}/>
                        })
                    }
                    {/* <Stat name='str' title='Strength'/>
                    <Stat name='dex' title='Dexterity'/>
                    <Stat name='con' title='Constitution'/>
                    <Stat name='int' title='Intelligence'/>
                    <Stat name='wis' title='Wisdom'/>
                    <Stat name='cha' title='Charisma'/> */}
                </StatBlock>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("interface")); 