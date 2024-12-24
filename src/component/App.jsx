import React, { useState } from "react";
import { InputBox } from "./index";
import useCurrencyInfo from "../../hooks/useCurrencyInfo";

const App = () => {
  const [amount, setAMount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("ngn");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAMount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div className="container">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="box">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAMount(amount)}
                selectedCurrency={from}
              />
              <div className="button">
                <button className="swap" onClick={swap}>
                  Swap
                </button>
              </div>
              <InputBox
                label="to"
                amount={convertedAmount}
                currencyOptions={options}
                amountDisabled={true}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
              />
              <div>
                <button className="submit" type="submit">
                  Convert {from} to {to}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;

