import { useState } from 'react';
import './App.css';

function App() {
  const apiUrl = 'https://api.hatey.monster'
  const [apiToken, setApiToken] = useState("")
  const [message, setMessage] = useState("")
  const [labels, setLabels] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  let handleSubmit = async (event) => {
    event.preventDefault();
      let response = await fetch(`${apiUrl}/queries/?query=${message}`, {
        crossDomain:true,
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }
      });

      let responseJson = await response.json();

      if (response.status === 200 && responseJson.status === 'success') {
        setLabels(responseJson.labels)
        setErrorMessage(null)
      } else if (response.status === 401) {
        setLabels([])
        setErrorMessage('The API token is invalid.')
      }
      else {
        setLabels([])
        setErrorMessage("The API returned an error.")
      }
  };

  return (
    <>
<div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-24 w-auto"
                src="/logo.png"
                alt="Hatey Bot Logo"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Hatey Bot</h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        type="text"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      API Token
                    </label>
                    <div className="mt-1">
                      <input
                        id="api-token"
                        name="api-token"
                        type="password"
                        required
                        onChange={(e) => setApiToken(e.target.value)}
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-fuchsia-500 focus:outline-none focus:ring-fuchsia-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-fuchsia-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  {labels.map((label, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-green-100 px-6 py-2 text-sm font-medium text-green-800 mr-2 mb-2">
                    {label}
                  </span>
                  ))}
                </div>
                {errorMessage && (
                <div className="mt-8">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-6 py-2 text-sm font-medium text-red-800">
                  {errorMessage}
                  </span>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/bg.jpg"
            alt="Background for landing page"
          />
        </div>
      </div>
    </>
  );
}

export default App;
