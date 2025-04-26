import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context, ContextProvider } from './context';
import Header from './components/Header';
import BetsUsers from './components/BetsUsers';
import Main from './components/Main';
import { ContactMeTelegram } from './components/ContactMeTelegram';
import propeller from './assets/images/propeller.png';

function App() {
  const { unityLoading, currentProgress, rechargeState } = React.useContext(Context);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ToastContainer />
      <ContactMeTelegram />
      {unityLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded flex flex-col items-center">
            <div className="animate-spin">
              <img alt="propeller" src={propeller} className="w-16 h-16" />
            </div>
            <div className="w-48 h-2 bg-gray-200 mt-4">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${currentProgress * 1.111 + 0.01}%` }}
              ></div>
            </div>
            <p className="mt-2">{Number(currentProgress * 1.111 + 0.01).toFixed(2)}%</p>
          </div>
        </div>
      )}
      {rechargeState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded text-center">
            <div className="text-lg mb-4">Insufficient balance amount</div>
            <a
              href="https://induswin.com/#/pages/recharge/recharge"
              className="text-blue-500 underline"
            >
              Induswin.com
            </a>
          </div>
        </div>
      )}
      <Header />
      <div className="flex flex-col md:flex-row gap-4 p-4 flex-grow">
        <BetsUsers />
        <Main />
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}
