import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoundariesChart from "./components/BoundariesChart";
import {useEffect, useState} from "react";
import AddBlock from "./components/AddBlock";

function App() {

    const [chartedData, setChartedData] = useState([])

    const [startYear, setStartYear] = useState(new Date().getFullYear())

    const [endPrincipal, setEndPrincipal] = useState(null)

    const [endInterest, setEndInterest] = useState(null)

    /*
    {
        name: description of this block
        initial: number of money to start
        contributions: change per unit time
        time: how long invested for
        rateReturn: percent rate of return
        rateInflation: percent rate of inflation
    }
     */
    /*
    [        {
            name: "Test Block",
            initial: 100000,
            contributions: 10000,
            time: 5,
            rateReturn: 7.0,
            rateInflation: 2.0,
        },
        {
            name: "Change Rate",
            initial: null,
            contributions: 10000,
            time: 5,
            rateReturn: 7.0,
            rateInflation: 2.0,
        },
        {
            name: "Change Rate Again",
            initial: null,
            contributions: 15000,
            time: 5,
            rateReturn: 7.0,
            rateInflation: 2.0,
        },]
     */
    const [investingBlocks, setInvestingBlocks] = useState([
    ])


    useEffect(() => {
        calculateTotalOverTimePeriod()
    }, [investingBlocks])


    function handleAddInvestingBlock(initial, name, contributions, time, rateReturn, rateInflation){
        let temp = investingBlocks
        temp.push({
            name: name,
            initial: initial,
            contributions: contributions,
            time: time,
            rateReturn: rateReturn,
            rateInflation: rateInflation,
        })
        setInvestingBlocks(temp)
        calculateTotalOverTimePeriod()
    }


    function calculateTotalOverTimePeriod() {
        let toChart = []
        let currentYear = startYear
        toChart.push(['Year', {role: 'annotation', type: 'string'}, 'Principle', 'Total']);
        if(investingBlocks.length === 0){
            toChart.push([
                (currentYear).toString(),
                null,
                0,
                0
            ])
            setChartedData(toChart)
        }else {
            let moneyInput = investingBlocks[0]['initial']
            let runningTotal = moneyInput;
            for (let i = 0; i < investingBlocks.length; i++) {
                let currentBlock = investingBlocks[i];
                for (let j = 0; j < currentBlock['time']; j++) {
                    moneyInput += currentBlock['contributions']
                    runningTotal += currentBlock['contributions']
                    let interest = runningTotal * (currentBlock['rateReturn'] / 100)
                    runningTotal += interest
                    toChart.push([
                        (currentYear + j).toString(),
                        j !== 0 ? null : currentBlock['name'],
                        moneyInput,
                        runningTotal
                    ])
                }
                currentYear += currentBlock['time']
            }
            setChartedData(toChart)
            setEndPrincipal(moneyInput)
            setEndInterest(runningTotal - moneyInput)
        }
    }


    return (
        <div className="App">
            <h1>Compounder</h1>
            <div>
                <BoundariesChart data={chartedData}/>
            </div>
            <p>Interest Gained {endInterest}</p>
            <p>Contributed {endPrincipal}</p>
            <AddBlock handleAddInvestingBlock={handleAddInvestingBlock}/>
        </div>
    );
}

export default App;
