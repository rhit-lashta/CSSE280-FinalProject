import './Login.css'
import React, { useEffect, useState,} from "react";
import { loadTypes, getPriceWidget } from "./scriptMain"; 


// https://mui.com/x/react-charts/bars/ Bar graph source//

function PriceHistory() {

  let [typeArray, setTypeArray] = useState([]);
  let [fullTypeArray, setFullTypeArray] = useState([]);

  let dateOptionsArray = [["1 month", 1], ["3 months", 3], ["1 year", 12]]; 

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

  let handleTypeChange = (e) => {
    let {value} = e.target;
    setTypeData(value)
    setTimeData("")
  };

  let handleTimeChange = (e) => {
    let {value} = e.target;
    setTimeData(value)

    handlePrice()
  };

  let handlePrice = () => {
    let price = getPriceWidget(fullTypeArray, currentType, currentTime)[0]
    setPrice(price);
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
            <div class ="chart">
              <div class="barGraphContainer">
                This is the content inside the box.
              </div>
            </div>
            <div>Current value: {currentAvgPrice}</div>
          </div>

          )
        }
            
      
      </main>
    </>
  )
}

export default PriceHistory