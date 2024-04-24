//ABOUT REACT
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

//SVG
import HouseLogo from './assets/icons/buy-a-house.svg';
import OriginIcon from './assets/icons/origin-icon.svg';
import DollarSign from './assets/icons/dollar-sign.svg';
import LeftArrowIcon from './assets/icons/left-arrow.svg';
import RightArrowIcon from './assets/icons/right-arrow.svg';

//STYLES
import './index.css';

export function App(): JSX.Element {
  const [money, setMoney] = useState('0');
  type MonthsType = {
    [key: number]: string;
  };
  const months: MonthsType = {
    1: 'January',
    2: 'Febuary',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  const currentYear: number = new Date().getFullYear();
  const currentMonth: number = new Date().getMonth() + 1; //1 - 12
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth + 1);
  const moneyInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    if (isNaN(parseInt(value))) {
      setMoney(() => '0');
    } else {
      const parsedValue: string = value.replace(/[^\d.]/gi, '');
      setMoney(() => parseFloat(parsedValue).toFixed(2).toString());
    }
  };
  const previousMonth = (): void => {
    if (year === currentYear && month - 1 === currentMonth) {
      // console.log("no");
    } else if (year > currentYear && month - 1 < 1) {
      setMonth(() => 12);
      setYear(() => year - 1);
    } else {
      setMonth(() => month - 1);
    }
  };
  const nextMonth = (): void => {
    if (month + 1 > 12) {
      setMonth(() => 1);
      setYear(() => year + 1);
    } else {
      setMonth(() => month + 1);
    }
  };
  const keyListener = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      previousMonth();
    } else {
      nextMonth();
    }
  };
  return (
    <div data-testid="greetings-container" className="main">
      <div className="background-container">
        {/* Navbar */}
        <div className="nav-container">
          <img src={OriginIcon} alt="origin-icon" width={100} height={32} />
        </div>

        {/* Content */}
        <div className="main-content">
          <div className="title-text">
            <p>
              Let&apos;s plan your
              <b> saving goal.</b>
            </p>
          </div>
          <div className="card-content">
            {/* Header */}
            <div className="card-header">
              <img src={HouseLogo} alt="buy-a-house" />
              <div className="title-container">
                <div className="header-title">
                  <p>Buy a house</p>
                </div>
                <div className="header-subtitle">
                  <p>Saving goal</p>
                </div>
              </div>
            </div>
            {/* Input */}
            <div className="content-inputs">
              <div className="total-amount-input-box">
                {/* Input box */}
                <label className="content-input-label">
                  <span className="label-title">Total amount</span>
                  <img
                    src={DollarSign}
                    className="icon-inside-input"
                    alt="dollar-sign"
                  />
                  <CurrencyInput
                    className="amount-input"
                    value={money}
                    onChange={moneyInputHandler}
                    decimalsLimit={2}
                    name="amount"
                    step={10}
                  />
                </label>
              </div>
              <div className="reach-goal-input-box">
                <label className="content-input-label">Reach goal by</label>
                <div onKeyDown={keyListener} tabIndex={-1} id="focus-key">
                  <div
                    className="box-of-arrow-l"
                    style={{ left: 0 }}
                    onClick={previousMonth}
                  >
                    <img
                      src={LeftArrowIcon}
                      alt="left-arrow-icon"
                      className="arrow-icon"
                    />
                  </div>
                  <div className="month-text">
                    <b style={{ color: '#1E2A32' }}>{months[month]}</b>
                    <p style={{ color: '#708797' }}>{year}</p>
                  </div>
                  <input
                    className="reach-date-input"
                    name="reachDate"
                    disabled
                  />
                  <div
                    className="box-of-arrow-r"
                    style={{ right: 0 }}
                    onClick={nextMonth}
                  >
                    <img
                      src={RightArrowIcon}
                      alt="right-arrow-icon"
                      className="arrow-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="monthly-amount-card">
              <div className="header-monthly-amount-card">
                <p className="monthly-amount-title">Monthly amount</p>
                <p className="price-monthly">$520.83</p>
              </div>
              <div className="bottom-monthly-amount-card">
                <p style={{ fontSize: 12, fontWeight: 400 }}>
                  You’re planning <b>48 monthly deposits</b> to reach your{' '}
                  <b>$25,000</b> goal by <b>October 2020</b>.
                </p>
              </div>
              <button
                className="confirm-button"
                onClick={() => console.log(months[currentMonth])}
              >
                <p>Confirm</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
