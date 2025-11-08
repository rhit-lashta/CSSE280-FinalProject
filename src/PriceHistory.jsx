import './Login.css'
import React, { useEffect, useState,} from "react";
import { loadTypes } from "./scriptMain";
import { getPriceWidget } from "./marketCalulations"
import { BarChart } from '@mui/x-charts/BarChart';


function PriceHistory() {

  let [typeArray, setTypeArray] = useState([]);
  let [fullTypeArray, setFullTypeArray] = useState([]);

  
  let dateOptionsArray = [["1 Week", 0.25], ["2 Weeks", 0.49], ["1 Month", 1], ["3 Months", 3], ["6 Months", 6], ["1 Year", 12], ["2 Years", 24], ["3 Years", 36], ["5 Years", 60], ["10 Years", 120]]; 

  useEffect(() => {
    
    let fetchTypes = async () => {
      try {
        let typesData = await loadTypes();
        
        setFullTypeArray(typesData)

        let types = [];
        for (let i = 0; i < typesData.length; i++) {
          types.push(typesData[i][0]);
        }
        setTypeArray(types);
        //setError(null);
      } catch (error) {
        //setError(err.message);
        setTypeArray([]);
      } finally {
        //setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  let [currentType, setTypeData] = useState("");
  let [currentTime, setTimeData] = useState("");

  let [currentAvgPrice, setPrice] = useState(0);
  let [dates, setDates] = useState(["Empty"]);
  let [dateSales, setDateSales] = useState([0]);

  let handleTypeChange = (e) => {
    let {value} = e.target;
    setTypeData(value)
    setTimeData("")
  };

  let handleTimeChange = (e) => {
    let {value} = e.target;
    setTimeData(value)

    handlePrice(value)
  };

  let handlePrice = (time) => {
    let priceInformation = getPriceWidget(fullTypeArray, currentType, time)
    setPrice(priceInformation[0]);
    setDates(priceInformation[1]);
    setDateSales(priceInformation[2])
  };
  

  return (
    <> 
      <main>

        <h1>Price History</h1>

        <div>
            <label for="typeSelector"> Type: </label>
            <select id="typeSelector" name="type" className="typeSelector" value={currentType} onChange={handleTypeChange} required>
              <option value="">--Select a Type--</option>
                {typeArray.map((typeOption) => (
                  <option key={typeOption} value={typeOption}>
                    {typeOption}
                  </option>
            ))}
          </select>
        </div>

        {currentType != "" && (
          <div>
            <label for="timeSelector"> Choose a Timeframe: </label>
            <select id="timeSelector" name="type" className="dateSelector" value={currentTime} onChange={handleTimeChange} required>
              <option value="">--Select a Time Range--</option>
                {dateOptionsArray.map((option) => (
                  <option key={option[0]} value={option[1]}>
                    {option[0]}
                  </option>
                ))}
            </select>
            </div>
          )
        }

        {(currentTime != "" && currentType != "") && (

          <div>
            <BarChart
              xAxis={[
            {
            id: 'Dates',
              data: dates,
              labelString: 'Dates Sold'
            },
            
            ]}
            series={[
            {
              data: dateSales,
              labelString: 'Average Price of Item'
            },
            ]}
            height={300}
            />
            <div>Current value: {currentAvgPrice}</div>
          </div>

          )
        }
      </main>
    </>
  )
}

export default PriceHistory