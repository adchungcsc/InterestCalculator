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

    const [endYearOfCalculationDollars, setEndYearOfCalculationDollars] = useState(null)

    const [investingBlocks, setInvestingBlocks] = useState([])


    useEffect(() => {
        calculateTotalOverTimePeriod()
    }, [investingBlocks])


    function handleAddInvestingBlock(initial, name, contributions, time, rateReturn, rateInflation) {
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
        toChart.push(['Year', {
            role: 'annotation',
            type: 'string'
        }, 'Principle', `${new Date().getFullYear()} Adjusted Dollars`, 'Total']);
        if (investingBlocks.length === 0) {
            toChart.push([
                (currentYear).toString(),
                null,
                0,
                0,
                0
            ])
            setChartedData(toChart)
        } else {
            let moneyInput = investingBlocks[0]['initial']
            let runningTotal = moneyInput;
            let yearCalculatedDollars = moneyInput;
            for (let i = 0; i < investingBlocks.length; i++) {
                let currentBlock = investingBlocks[i];
                for (let j = 0; j < currentBlock['time']; j++) {
                    moneyInput += currentBlock['contributions']
                    runningTotal += currentBlock['contributions']
                    let interest = runningTotal * (currentBlock['rateReturn'] / 100)
                    runningTotal += interest
                    //Adjust for inflation
                    yearCalculatedDollars += currentBlock['contributions'] + interest
                    yearCalculatedDollars *= (1 - (currentBlock['rateInflation'] / 100))
                    toChart.push([
                        (currentYear + j).toString(),
                        j !== 0 ? null : currentBlock['name'],
                        moneyInput,
                        yearCalculatedDollars,
                        runningTotal
                    ])
                }
                currentYear += currentBlock['time']
            }
            setChartedData(toChart)
            setEndPrincipal(moneyInput)
            setEndYearOfCalculationDollars(yearCalculatedDollars)
            setEndInterest(runningTotal - moneyInput)
        }
    }


    const style = {
        display: "flex",
        justifyContent: "space-between"
    }

    return (
        <div className="App">
            <h1>Compounder</h1>
            <div>
                <BoundariesChart data={chartedData}/>
            </div>
            <hr/>
            {endInterest !== null ?
                <div style={style}><h3>📈 Interest Gained </h3> <h3>📈 {endInterest.toFixed(2)}</h3></div> : <p></p>}
            {endYearOfCalculationDollars !== null ? <div style={style}>
                <h3>💸 {new Date().getFullYear()} Dollars:</h3> <h3>💸 {endYearOfCalculationDollars.toFixed(2)}</h3></div> :
                <p></p>}
            {endPrincipal !== null ? <div style={style}><h3>💵 Net Contributions:</h3> <h3>💵 {endPrincipal.toFixed(2)}</h3></div> :
                <p></p>}
            <hr/>
            <AddBlock handleAddInvestingBlock={handleAddInvestingBlock}/>
        </div>
    );
}

export default App;
