import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { TrendingUp, Key, LogOut, Loader, User, Zap, Upload, HardDrive, Download, AlertTriangle, RefreshCw, Layers, FileText, Eraser } from 'lucide-react';
// --- Global Variable Setup (Mandatory for Canvas Environment) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const GEMINI_API_KEY = "";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

const APP_NAME = "Premium DataWash & Analytics";

// Default CSV data for demonstration
const DEFAULT_CSV_DATA = "ID,Name,Value\n1,Riana,12.50\n2,Tahina,Error\n3,Jean-Marc,45.99\n4,Unknown,0.00";

// --- Utility Components ---

const ChartCard = ({ title, children, className = "" }) => (
    // Updated styling for ChartCard: darker shadow, more prominent border
    <div className={`bg-white p-5 rounded-xl shadow-2xl border-t-4 border-indigo-200 h-full flex flex-col transition-all duration-300 hover:shadow-indigo-400/50 ${className}`}>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">{title}</h3>
        <div className="flex-grow">{children}</div>
    </div>
);

const KPI = ({ title, value, unit, icon: Icon, color }) => (
    // KPI uses ChartCard styling
    <ChartCard className="justify-center items-center p-6 text-center border-t-4 border-indigo-300">
        <div className={`text-4xl font-extrabold ${color} flex items-center justify-center`}>
            <Icon className="w-8 h-8 mr-3" />
            {value}
        </div>
        <p className="text-sm text-gray-500 mt-1">{title} ({unit})</p>
    </ChartCard>
);

const LineChartSim = ({ data, color, label }) => (
    <div className="h-48 pt-2">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <line x1="10" y1="90" x2="90" y2="90" stroke="#e5e7eb" strokeWidth="0.5" />
            
            {/* Create path from data */}
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2" // Thicker line
                points={data.map((y, i) => `${10 + i * (80 / (data.length - 1))},${90 - y * 0.8}`).join(' ')}
            />
            
            {/* Dots */}
            {data.map((y, i) => (
                <circle key={i} cx={10 + i * (80 / (data.length - 1))} cy={90 - y * 0.8} r="2" fill={color} />
            ))}
            
            <text x="50" y="98" fontSize="6" textAnchor="middle" fill="#9ca3af">Days</text>
        </svg>
        <p className="text-center text-xs text-gray-500 mt-1">{label}</p>
    </div>
);

// --- Main Application Component ---

const App = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAiProcessing, setIsAiProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('repair'); // Set default tab to Repair for focus

    // Data States
    const [inputCsv, setInputCsv] = useState(DEFAULT_CSV_DATA);
    const [cleanedData, setCleanedData] = useState(null);

    // State for Firestore Data
    const [metrics, setMetrics] = useState({
        totalApiCalls: 0,
        quotaLimit: 200,
        cleanRate: 85,
        errorScore: 0.015,
        avgLatency: 450,
        currentPlan: 'Pro'
    });

    const apiKeyDisplay = useMemo(() => userId ? `sk-datawash-${userId.substring(0, 8)}${Math.random().toString(36).substring(2, 6)}` : '*********', [userId]);

    // 1. Firebase Initialization and Authentication
    useEffect(() => {
        if (!firebaseConfig) {
            setError("Firebase configuration is missing.");
            setIsLoading(false);
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestore);
            setAuth(firebaseAuth);

            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else if (initialAuthToken) {
                    await signInWithCustomToken(firebaseAuth, initialAuthToken);
                } else {
                    await signInAnonymously(firebaseAuth);
                }
                setIsLoading(false);
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Firebase initialization failed:", e);
            setError("Could not initialize services. Check console for details.");
            setIsLoading(false);
        }
    }, []);

    // 2. Firestore Data Listener (Quota & Metrics)
    useEffect(() => {
        if (!db || !userId) return;

        const userMetricsPath = `artifacts/${appId}/users/${userId}/metrics/dashboard`;
        const metricsDocRef = doc(db, userMetricsPath);

        const unsubscribe = onSnapshot(metricsDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setMetrics(prev => ({ ...prev, ...docSnap.data() }));
            } else {
                setDoc(metricsDocRef, metrics).catch(console.error);
            }
        }, (err) => {
            console.error("Error listening to metrics:", err);
            setError("Failed to sync dashboard data.");
        });

        return () => unsubscribe();
    }, [db, userId]);

    // 3. AI-Repair Engine (Gemini API Call for CSV Cleaning)
    const handleAiRepair = useCallback(async () => {
        if (!db || !userId) return;

        const { totalApiCalls, quotaLimit } = metrics;
        if (totalApiCalls >= quotaLimit) {
            alert("Quota Exceeded! Please upgrade your plan.");
            return;
        }

        if (!inputCsv.trim()) {
            alert("Please paste CSV data or drop a file to repair.");
            return;
        }

        setIsAiProcessing(true);
        setCleanedData(null);
        
        // Prepare the system instruction for Gemini
        const systemPrompt = "You are an expert data cleaning and repair engine. Analyze the provided CSV data. Identify any errors, inconsistencies, or missing values (like 'Error' or 'Unknown'). Your task is to correct these issues while strictly preserving the CSV format (header row and comma separators). Ensure all numeric fields are correctly formatted as numbers. Only return the corrected CSV data, nothing else.";
        
        const userQuery = `Repair and clean the following CSV data:\n\n${inputCsv}`;
        
        // Exponential Backoff for Fetch
        const MAX_RETRIES = 5;
        const initialDelay = 1000; // 1 second

        const executeFetchWithRetry = async (url, options) => {
            for (let i = 0; i < MAX_RETRIES; i++) {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        if (response.status === 429 && i < MAX_RETRIES - 1) {
                            const delay = initialDelay * Math.pow(2, i) + Math.random() * 1000;
                            await new Promise(resolve => setTimeout(resolve, delay));
                            continue; // Retry
                        }
                        throw new Error(`API Request failed with status ${response.status}`);
                    }
                    return response;
                } catch (error) {
                    if (i === MAX_RETRIES - 1) throw error;
                    const delay = initialDelay * Math.pow(2, i) + Math.random() * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        };

        try {
            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                tools: [{ "google_search": {} }],
            };

            const response = await executeFetchWithRetry(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Error: Could not retrieve cleaned data.";
            
            // Update Quota and Metrics in Firestore
            const userMetricsPath = `artifacts/${appId}/users/${userId}/metrics/dashboard`;
            const metricsDocRef = doc(db, userMetricsPath);
            
            const newTotalCalls = totalApiCalls + 1;
            const newCleanRate = Math.min(100, metrics.cleanRate + Math.floor(Math.random() * 5));
            
            await setDoc(metricsDocRef, {
                totalApiCalls: newTotalCalls,
                cleanRate: newCleanRate,
            }, { merge: true });

            setCleanedData(text);

        } catch (e) {
            console.error("AI Repair Engine Failed:", e);
            setCleanedData(`AI Repair Engine Failed: ${e.message}. Please check your input or connection.`);
            setError("AI Processing failed.");
        } finally {
            setIsAiProcessing(false);
        }
    }, [db, userId, metrics, inputCsv, GEMINI_API_URL]);


    // 4. Export to Excel (Simulated)
    const handleExportCsv = useCallback(() => {
        if (!cleanedData) {
            alert("Please run CSV Cleaning first before exporting the data.");
            return;
        }

        const blob = new Blob([cleanedData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'cleaned_data_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [cleanedData]);

    // 5. Drag & Drop/File Handling Logic
    const handleFileDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
                alert("Only CSV files are accepted.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setInputCsv(event.target.result);
                setCleanedData(null); // Reset cleaned data
            };
            reader.readAsText(file);
        }
    }, []);

    const handleFileInput = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setInputCsv(event.target.result);
                setCleanedData(null); // Reset cleaned data
            };
            reader.readAsText(file);
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    // --- Tab Content Components ---

    const DashboardContent = () => {
        const requestsLeft = metrics.quotaLimit - metrics.totalApiCalls;
        const quotaPercentage = (metrics.totalApiCalls / metrics.quotaLimit) * 100;
        const usageColorClass = quotaPercentage < 75 ? 'text-green-600' : quotaPercentage < 90 ? 'text-yellow-600' : 'text-red-600';

        return (
            <div className="space-y-8">
                {/* KPIs Section */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Key Performance Indicators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPI title="AI API Calls" value={metrics.totalApiCalls} unit={`/${metrics.quotaLimit}`} icon={HardDrive} color={usageColorClass} />
                    <KPI title="Clean Success Rate" value={`${metrics.cleanRate}%`} unit="Accuracy" icon={RefreshCw} color="text-green-600" />
                    <KPI title="Avg. Repair Latency" value={metrics.avgLatency} unit="ms" icon={AlertTriangle} color="text-yellow-600" />
                    <KPI title="Plan" value={metrics.currentPlan} unit="Subscription" icon={Layers} color="text-indigo-600" />
                </div>

                {/* Charts Section (Height reduced) */}
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Usage Trends & Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartCard title="Monthly Usage Trend (Simulated Chart.js)">
                        <LineChartSim 
                            data={[40, 60, 55, 75, 80, 95, 88]} 
                            color="#4f46e5" // Indigo for chart line
                            label="API Calls (Last 7 Days)"
                        />
                    </ChartCard>

                    <ChartCard title="Error Rate Trend">
                        <LineChartSim 
                            data={[10, 8, 12, 5, 7, 3, 2]} 
                            color="#ef4444" 
                            label="Error Rate (%)"
                        />
                    </ChartCard>
                </div>

                {/* API Key Card */}
                <ChartCard title="API Key Access">
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                        <code className="block bg-gray-100 p-3 rounded-lg text-sm font-mono text-gray-800 break-all select-all flex-grow mr-4 mb-3 sm:mb-0 w-full sm:w-auto">
                            {apiKeyDisplay}
                        </code>
                        <button
                            onClick={() => {
                                // Use document.execCommand('copy') for better compatibility in iFrames
                                const dummy = document.createElement("textarea");
                                document.body.appendChild(dummy);
                                dummy.value = apiKeyDisplay;
                                dummy.select();
                                document.execCommand("copy");
                                document.body.removeChild(dummy);
                                alert("API Key copied to clipboard."); 
                            }}
                            className="py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex-shrink-0 shadow-md hover:shadow-lg"
                        >
                            Copy <Key className="w-4 h-4 ml-2 inline" />
                        </button>
                    </div>
                </ChartCard>
            </div>
        );
    };

    const AiRepairEngineContent = () => {
        const requestsLeft = metrics.quotaLimit - metrics.totalApiCalls;

        return (
            <ChartCard title="CSV Cleaning & AI-Repair Engine" className="!p-8">
                <p className="text-sm text-gray-500 mb-6">Use Drag & Drop or paste your CSV data below. The AI will clean and repair your data.</p>
                
                {/* Drag & Drop Area */}
                <div 
                    className="mb-6 p-6 border-2 border-dashed border-indigo-300 rounded-xl bg-indigo-50/50 hover:bg-indigo-100/70 transition-colors cursor-pointer text-center"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    <input 
                        type="file" 
                        id="file-upload" 
                        accept=".csv" 
                        className="hidden" 
                        onChange={handleFileInput} 
                    />
                    <FileText className="w-10 h-10 mx-auto text-indigo-500 mb-2" />
                    <p className="text-base font-semibold text-indigo-700">Drop your CSV file here</p>
                    <p className="text-sm text-gray-500">or click to select a file (.csv)</p>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
                    {/* Input */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center"><Upload className="w-4 h-4 mr-1" /> Raw CSV Input (Editable)</label>
                        <textarea
                            className="flex-grow p-3 border border-gray-300 rounded-lg font-mono text-xs focus:ring-indigo-500 focus:border-indigo-500 resize-none shadow-inner"
                            value={inputCsv}
                            onChange={(e) => setInputCsv(e.target.value)}
                            placeholder="Paste your CSV data here..."
                        />
                    </div>

                    {/* Output */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center"><Zap className="w-4 h-4 mr-1" /> AI Cleaned Output (Read Only)</label>
                        <textarea
                            className="flex-grow p-3 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50 resize-none shadow-inner"
                            value={cleanedData || (isAiProcessing ? 'Processing data, please wait...' : 'Run CSV Cleaning Engine to see output...')}
                            readOnly
                            placeholder="Cleaned data will appear here..."
                        />
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleAiRepair}
                        disabled={isAiProcessing || requestsLeft <= 0}
                        className="flex-1 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-lg"
                    >
                        {isAiProcessing ? (
                            <>
                                <Loader className="w-5 h-5 mr-2 animate-spin" />
                                Cleaning...
                            </>
                        ) : (
                            <>
                                <Eraser className="w-5 h-5 mr-2" />
                                Run CSV Cleaning Engine ({requestsLeft} left)
                            </>
                        )}
                    </button>
                    
                    {/* Dedicated Download Button */}
                    <button
                        onClick={handleExportCsv}
                        disabled={!cleanedData}
                        className="flex-1 py-3 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-lg"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Cleaned CSV
                    </button>
                </div>
            </ChartCard>
        );
    };

    const SubscriptionContent = () => {
        return (
            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 text-center">Online SaaS Subscription Tiers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {/* Subscription Cards */}
                    {['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
                        <div key={plan} className={`flex flex-col p-6 rounded-xl border-2 ${plan === metrics.currentPlan ? 'border-indigo-500 shadow-xl' : 'border-gray-200 shadow-md'} transition-all duration-300 hover:scale-[1.02] ${plan === metrics.currentPlan ? 'bg-indigo-50/50' : 'bg-white'}`}>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan}</h3>
                            <ul className="flex-grow space-y-2 text-sm text-gray-600 mb-6">
                                <li>{plan === 'Basic' ? '200' : plan === 'Pro' ? '1,000' : 'Unlimited'} AI Repairs/mo</li>
                                <li>Real-time Data Sync</li>
                                <li>{plan === 'Basic' ? 'Standard' : 'Priority'} Support</li>
                            </ul>
                            <button
                                className={`w-full py-3 rounded-lg font-semibold transition-colors shadow-md ${
                                    plan === metrics.currentPlan
                                        ? 'bg-indigo-100 text-indigo-800 cursor-not-allowed border border-indigo-300'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }`}
                                disabled={plan === metrics.currentPlan}
                                onClick={() => alert(`Upgrading to ${plan} plan (Simulated)`)}
                            >
                                {plan === metrics.currentPlan ? 'Active Plan' : 'Select Plan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Render Logic
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-50">
                <Loader className="w-10 h-10 text-indigo-600 animate-spin mr-3" />
                <span className="text-xl text-gray-700">Loading Premium SaaS Platform...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-8 bg-red-100 text-red-800">
                <h1 className="text-2xl font-bold">Initialization Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        // Changed background gradient to be much lighter (from-white to-indigo-50)
        <div className="min-h-screen bg-gradient-to-br from-white to-indigo-50 p-4 md:p-8 font-sans">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-indigo-200/70 mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                    <Zap className="w-8 h-8 text-indigo-600 mr-2" />
                    {APP_NAME}
                </h1>
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                    <p className="text-sm text-gray-600 flex items-center">
                        <User className="w-4 h-4 mr-1 text-indigo-500" />
                        User ID: <code className="ml-1 text-xs font-mono bg-indigo-100 px-2 py-0.5 rounded text-indigo-800">{userId}</code>
                    </p>
                    <button
                        onClick={() => signOut(auth)}
                        className="mt-2 text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center"
                    >
                        <LogOut className="w-4 h-4 mr-1" />
                        Sign Out
                    </button>
                </div>
            </header>

            {/* --- Tab Navigation --- */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {[
                        { id: 'dashboard', name: 'Premium Dashboard', icon: TrendingUp },
                        { id: 'repair', name: 'AI Repair Engine', icon: Zap },
                        { id: 'subscription', name: 'Subscription', icon: Layers },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                                activeTab === tab.id
                                    ? 'border-b-2 border-indigo-600 text-indigo-700 bg-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <tab.icon className="w-5 h-5 mr-2" />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* --- Tab Content --- */}
            <main>
                {activeTab === 'dashboard' && <DashboardContent />}
                {activeTab === 'repair' && <AiRepairEngineContent />}
                {activeTab === 'subscription' && <SubscriptionContent />}
            </main>
        </div>
    );
};

export default App;