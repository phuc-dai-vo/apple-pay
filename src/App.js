import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [applePaySupported, setApplePaySupported] = useState(false);
  const [applePayCapabilities, setApplePayCapabilities] = useState('');
  const [canMakePayments, setCanMakePayments] = useState('');
  const [canMakePaymentsWithActiveCard, setCanMakePaymentsWithActiveCard] = useState('');
  const [option, setOption] = useState('');

  const updateInfor = () => {
    _applePayCapabilities();
    _canMakePayments();
    _canMakePaymentsWithActiveCard();
  };

  const _applePayCapabilities = async () => {
    if (window.ApplePaySession.applePayCapabilities) {
      try {
        const _applePayCapabilities = await window.ApplePaySession.applePayCapabilities(option);
        setApplePayCapabilities(_applePayCapabilities);
      } catch (error) {
        setApplePayCapabilities('ERROR');
      }
    } else {
      setApplePayCapabilities('NA - ApplePaySession.applePayCapabilities');
    }
  }

  const _canMakePayments = () => {
    if (window.ApplePaySession.canMakePayments) {
      try {
        const _canMakePayments = window.ApplePaySession.canMakePayments(option);
        setCanMakePayments(_canMakePayments ? 'TRUE' : 'FALSE');
      } catch (error) {
        setCanMakePayments('ERROR');
      }
    } else {
      setCanMakePayments('NA - ApplePaySession.canMakePayments');
    }
  }

  const _canMakePaymentsWithActiveCard = async () => {
    if (window.ApplePaySession.canMakePaymentsWithActiveCard) {
      try {
        const _canMakePaymentsWithActiveCard = await window.ApplePaySession.canMakePaymentsWithActiveCard(option);
        setCanMakePaymentsWithActiveCard(_canMakePaymentsWithActiveCard);
      } catch (error) {
        setCanMakePaymentsWithActiveCard('ERROR');
      }
    } else {
      setCanMakePaymentsWithActiveCard('NA - ApplePaySession.canMakePaymentsWithActiveCard');
    }
  }

  useEffect(() => {
    if (window.ApplePaySession) {
      setApplePaySupported(true);
      updateInfor();
    } else {
      setApplePaySupported(false);
    }
  }, []);

  return (
    <div className="App">
      <h3>Apple Pay Supported: {applePaySupported ? 'Yes' : 'No'}</h3>
      <main className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <div class="card" >
              <div class="card-body px-0">
                <table class="table table-striped p-0">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">API</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>applePayCapabilities</td>
                      <td>{applePayCapabilities}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>canMakePayments</td>
                      <td>{canMakePayments}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>canMakePaymentsWithActiveCard <span class="badge bg-danger">Deprecated</span> </td>
                      <td>{canMakePaymentsWithActiveCard}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
