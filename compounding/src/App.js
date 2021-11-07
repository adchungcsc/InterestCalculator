import './App.css';
import Compound from "./screens/compound/Compound";
import BoundariesChart from "./components/BoundariesChart";
import {useEffect, useState} from "react";

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
    const [investingBlocks, setInvestingBlocks] = useState([
        {
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
        },
    ])


    useEffect(() => {
        calculateTotalOverTimePeriod()
    }, [investingBlocks])



    function calculateTotalOverTimePeriod() {
        let toChart = []
        let currentYear = startYear
        toChart.push(['Year', {role: 'annotation', type: 'string'}, 'Principle', 'Total']);
        let moneyInput = investingBlocks[0]['initial']
        let runningTotal = moneyInput;
        for(let i = 0; i < investingBlocks.length; i++){
            let currentBlock = investingBlocks[i];
            for(let j = 0; j < currentBlock['time']; j++){
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
        }
        setChartedData(toChart)
        setEndPrincipal(moneyInput)
        setEndInterest(runningTotal - moneyInput)
        /*
        let runningTotal = investingBlocks[0]['initial'];
        let runningInterest = 0;
        let runningPrincipal = 0;
        let blockPrincipalTotal = 0;
        let interest = 0;
        for(let blockIndex = 0; blockIndex < investingBlocks.length; blockIndex++){
            let block = investingBlocks[blockIndex];
            blockPrincipalTotal = blockIndex === 0 ? block['initial'] : runningPrincipal
            console.log("NEXT BLOCK")
            for (let i = currentYear; i <= currentYear + block['time']; i++) {
                blockPrincipalTotal += block['contributions'];
                setEndPrincipal(blockPrincipalTotal)
                interest = ((runningTotal + block['contributions']) * (block['rateReturn'] / 100))
                runningInterest += interest
                runningTotal += interest + block['contributions']
                toChart.push([
                    i.toString(),
                    i !== currentYear ? null : block['name'],
                    blockPrincipalTotal,
                    runningTotal
                ])
                console.log(i + " " + blockPrincipalTotal + " " + interest + "   " + runningTotal)
            }
            currentYear += block['time'] + 1
            runningPrincipal += blockPrincipalTotal
        }
        //Set finals (omit last entry as that's one over)
        // setEndPrinciple(blockPrincipalTotal)
        setEndInterest(runningInterest)

        console.log(JSON.stringify(toChart)

        setChartedData(toChart)
        */
    }


    return (
        <div className="App">
            <BoundariesChart data={chartedData}/>
            <p>Interest Gained {endInterest}</p>
            <p>Contributed {endPrincipal}</p>
        </div>
    );
}

export default App;
