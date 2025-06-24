import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiSend, FiRefreshCw, FiCopy, FiCheck } from 'react-icons/fi';

function App() {
  const [emailText, setEmailText] = useState('');
  const [tone, setTone] = useState('formal');
  const [summary, setSummary] = useState('');
  const [intent, setIntent] = useState('');
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('compose');

  const API_URL = 'http://localhost:8000';

  const processEmail = async () => {
    if (!emailText.trim()) return;
    
    setIsLoading(true);
    try {
      // Get all responses in parallel
      const [summaryRes, intentRes, replyRes] = await Promise.all([
        axios.post(`${API_URL}/summarize/`, { email_text: emailText }),
        axios.post(`${API_URL}/classify/`, { email_text: emailText }),
        axios.post(`${API_URL}/generate_reply/`, { email_text: emailText, tone })
      ]);

      setSummary(summaryRes.data.summary);
      setIntent(intentRes.data.intent);
      setReply(replyRes.data.reply);

      // Add to history
      setHistory(prev => [{
        id: Date.now(),
        email: emailText,
        summary: summaryRes.data.summary,
        intent: intentRes.data.intent,
        reply: replyRes.data.reply,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Error processing email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadFromHistory = (item) => {
    setEmailText(item.email);
    setSummary(item.summary);
    setIntent(item.intent);
    setReply(item.reply);
  };

  const clearAll = () => {
    setEmailText('');
    setSummary('');
    setIntent('');
    setReply('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <FiMail className="mr-2" /> AI Email Assistant
          </h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('compose')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'compose' ? 'bg-indigo-800' : 'bg-indigo-700 hover:bg-indigo-800'}`}
            >
              Compose
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'history' ? 'bg-indigo-800' : 'bg-indigo-700 hover:bg-indigo-800'}`}
            >
              History
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        {activeTab === 'compose' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email Input */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                  <h2 className="text-lg font-semibold text-indigo-800">Incoming Email</h2>
                </div>
                <div className="p-4">
                  <textarea
                    className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Paste the email you received here..."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                  />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">Tone:</label>
                    <select
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      <option value="formal">Formal</option>
                      <option value="friendly">Friendly</option>
                      <option value="short">Short</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={clearAll}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={processEmail}
                      disabled={isLoading || !emailText.trim()}
                      className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center ${(isLoading || !emailText.trim()) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <>
                          <FiRefreshCw className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Analyze
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary & Intent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                    <h2 className="text-lg font-semibold text-indigo-800">Summary</h2>
                  </div>
                  <div className="p-4">
                    {summary ? (
                      <p className="text-gray-700">{summary}</p>
                    ) : (
                      <p className="text-gray-400 italic">Summary will appear here</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                    <h2 className="text-lg font-semibold text-indigo-800">Intent</h2>
                  </div>
                  <div className="p-4">
                    {intent ? (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        intent === 'complaint' ? 'bg-red-100 text-red-800' :
                        intent === 'inquiry' ? 'bg-blue-100 text-blue-800' :
                        intent === 'task' ? 'bg-yellow-100 text-yellow-800' :
                        intent === 'request' ? 'bg-purple-100 text-purple-800' :
                        intent === 'gratitude' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {intent.charAt(0).toUpperCase() + intent.slice(1)}
                      </span>
                    ) : (
                      <p className="text-gray-400 italic">Intent will appear here</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Reply */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-indigo-800">Suggested Reply</h2>
                  {reply && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="mr-1" /> Copied!
                        </>
                      ) : (
                        <>
                          <FiCopy className="mr-1" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="p-4 flex-grow">
                  {reply ? (
                    <div className="prose max-w-none text-gray-700">
                      <p>{reply}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic h-full flex items-center justify-center">
                      Your AI-generated reply will appear here
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-indigo-50 border-b border-indigo-100">
              <h2 className="text-lg font-semibold text-indigo-800">History</h2>
            </div>
            <div className="p-4">
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => loadFromHistory(item)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                            item.intent === 'complaint' ? 'bg-red-100 text-red-800' :
                            item.intent === 'inquiry' ? 'bg-blue-100 text-blue-800' :
                            item.intent === 'task' ? 'bg-yellow-100 text-yellow-800' :
                            item.intent === 'request' ? 'bg-purple-100 text-purple-800' :
                            item.intent === 'gratitude' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.intent.charAt(0).toUpperCase() + item.intent.slice(1)}
                          </span>
                          <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-center py-8">
                  No history yet. Process some emails to see them here.
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>AI Email Assistant - Powered by FastAPI & React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;