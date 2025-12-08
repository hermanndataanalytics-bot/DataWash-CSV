import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    Upload, X, Loader2, CheckCircle, FileText, Download, Zap, 
    BarChart3, LogIn, User, Lock, ExternalLink, Trash2, FileSearch 
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged, 
    signOut 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    onSnapshot, 
    updateDoc 
} from 'firebase/firestore';

// --- Global Configuration ---
const API_URL = 'https://datawash-csv.onrender.com/upload'; 

const FREE_QUOTA_LIMIT = 5; 
const QUOTA_COLLECTION_PATH = (appId, userId) => 
    `/artifacts/${appId}/users/${userId}/quotas/usage`;

// --- Firebase Initialization ---
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

let app = null;
let db = null;
let auth = null;

if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
}

// Initial Metrics structure
const initialMetrics = {
    originalRows: 0,
    cleanedRows: 0,
    duplicatesRemoved: 0,
    successRate: '0%', // Percentage of rows removed (duplicates)
};

// Component: Header (Tsy miova)
const Header = ({ userId, handleSignOut, quota, isAuthReady }) => (
    <div className="flex justify-between items-center p-4 mb-8 border-b border-indigo-700/50">
        <div className="flex items-center space-x-4">
            <Zap className="w-8 h-8 text-indigo-400" />
            <div>
                <h1 className="text-3xl font-extrabold text-white">DataWash Pro Max</h1>
                <p className="mt-1 text-sm text-indigo-300">Premium Data Cleansing Dashboard</p>
            </div>
        </div>

        <div className="flex items-center space-x-4">
            {isAuthReady && userId && (
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400">User ID:</p>
                    <p className="text-sm font-mono text-indigo-300 truncate max-w-xs" title={userId}>
                        {userId}
                    </p>
                </div>
            )}

            {isAuthReady && (
                <QuotaDisplay quota={quota} />
            )}

            {isAuthReady && (
                 <button
                    onClick={handleSignOut}
                    className="flex items-center px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-150 shadow-md"
                    title="Sign Out"
                >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign Out
                </button>
            )}
             
        </div>
    </div>
);

// Component: Quota Display (Tsy miova)
const QuotaDisplay = ({ quota }) => {
    const remaining = quota.limit - quota.used;
    const isOverLimit = remaining <= 0;

    let colorClass = 'bg-emerald-600';
    if (remaining <= 1) colorClass = 'bg-red-600';
    else if (remaining <= 3) colorClass = 'bg-yellow-600';

    return (
        <div className={`px-4 py-2 rounded-lg font-bold text-white shadow-lg transition duration-300 ${colorClass}`}>
            <p className="text-xs font-light">Free Quota Remaining</p>
            <p className="text-lg text-center">{remaining} / {quota.limit}</p>
        </div>
    );
};


// Component: Metrics Display Cards (Tsy miova)
const MetricCard = ({ icon, title, value, unit, color }) => (
    <div className={`p-5 rounded-xl shadow-lg border border-${color}-700 bg-${color}-900/30 backdrop-blur-sm transition duration-300 hover:bg-${color}-800/50`}>
        <div className="flex justify-between items-center">
            <div className={`text-${color}-400`}>{icon}</div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
        </div>
        <div className="mt-2">
            <p className="text-3xl font-extrabold text-white">
                {value}
                {unit && <span className="text-base font-normal ml-1 text-gray-400">{unit}</span>}
            </p>
        </div>
    </div>
);

// Component: Cleaning Efficiency Chart (FANATSARANA: Mampiasa angona marina)
const CleaningEfficiencyChart = ({ metrics }) => {
    const { originalRows, cleanedRows, duplicatesRemoved } = metrics;
    
    if (originalRows === 0) {
        return (
            <div className="p-6 rounded-xl bg-gray-800/70 border border-gray-700 text-center text-gray-500 h-48 flex items-center justify-center">
                <p>Upload a file and start cleaning to view the efficiency chart.</p>
            </div>
        );
    }
    
    // Calculate percentages
    const total = originalRows;
    const cleanedPercent = (cleanedRows / total) * 100;
    const removedPercent = (duplicatesRemoved / total) * 100;

    return (
        <div className="p-6 rounded-2xl shadow-xl shadow-gray-900/50 bg-gray-800/70 border border-gray-700 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-600/50 pb-2">Cleaning Efficiency Breakdown (Visualization)</h3>
            
            <div className="flex flex-col space-y-4">
                {/* Visual Bar Chart */}
                <div className="h-8 flex rounded-lg overflow-hidden shadow-inner border border-gray-700">
                    {/* Data Cleaned (Green) */}
                    <div 
                        className="bg-emerald-500 h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2" 
                        style={{ width: `${cleanedPercent}%` }}
                        title={`Cleaned: ${cleanedPercent.toFixed(1)}%`}
                    >
                        {/* Asehoy ny isan-jato raha lehibe kokoa noho ny 5% */}
                        {cleanedPercent > 5 && <span className='text-xs font-semibold text-white/90 drop-shadow-lg'>{cleanedPercent.toFixed(1)}%</span>}
                    </div>
                    {/* Duplicates Removed (Red) */}
                    <div 
                        className="bg-red-500 h-full transition-all duration-1000 ease-out flex items-center pl-2" 
                        style={{ width: `${removedPercent}%` }}
                        title={`Removed (Duplicates): ${removedPercent.toFixed(1)}%`}
                    >
                         {removedPercent > 5 && <span className='text-xs font-semibold text-white/90 drop-shadow-lg'>{removedPercent.toFixed(1)}%</span>}
                    </div>
                    {/* Empty Space if any (should be zero if total = originalRows) */}
                    <div 
                        className="bg-gray-700 h-full" 
                        style={{ width: `${100 - (cleanedPercent + removedPercent)}%` }}
                    ></div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center sm:justify-around text-sm font-semibold pt-2">
                    <div className="flex items-center text-emerald-400 mb-2 sm:mb-0">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        Cleaned Data: **{metrics.cleanedRows.toLocaleString()} rows**
                    </div>
                    <div className="flex items-center text-red-400">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Duplicates Removed: **{metrics.duplicatesRemoved.toLocaleString()} rows**
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component: Status Card (Tsy miova)
const StatusCard = ({ status, responseMessage, errorDetails, copyToClipboard, isOverLimit }) => {
    let icon, title, color;

    if (isOverLimit) {
        icon = <Lock className="w-8 h-8 text-yellow-400" />;
        title = "Quota Limit Reached";
        color = "border-yellow-600 bg-yellow-800/50";
    } else {
        switch (status) {
            case 'idle':
                icon = <FileText className="w-8 h-8 text-gray-500" />;
                title = "Awaiting CSV File Upload";
                color = "border-gray-600 bg-gray-800/50";
                break;
            case 'uploading':
            case 'cleaning':
                icon = <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />;
                title = "Cleaning and Processing in Progress...";
                color = "border-indigo-600 bg-indigo-800/50"; 
                break;
            case 'success':
                icon = <CheckCircle className="w-8 h-8 text-emerald-400" />;
                title = "Cleaning Completed Successfully!";
                color = "border-emerald-600 bg-emerald-800/50";
                break;
            case 'error':
                icon = <X className="w-8 h-8 text-red-400" />;
                title = "An Error Occurred";
                color = "border-red-600 bg-red-800/50";
                break;
            default:
                icon = <FileText className="w-8 h-8 text-gray-500" />;
                title = "Awaiting File";
                color = "border-gray-600 bg-gray-800/50";
        }
    }

    return (
        <div className={`p-6 mt-6 rounded-2xl border-2 ${color} shadow-2xl transition-all duration-300`}>
            <div className="flex items-center space-x-4">
                {icon}
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="mt-3 text-base text-gray-300">{responseMessage}</p>

            {(status === 'success' && errorDetails) && (
                <div className="mt-4 p-4 bg-gray-900 border border-emerald-600 rounded-xl shadow-inner">
                    <p className="font-semibold text-emerald-400 mb-2">Cleaned File URL (.csv):</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <a 
                            href={errorDetails} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 truncate text-sm text-indigo-400 hover:text-indigo-200 underline w-full sm:w-auto"
                            title={errorDetails}
                        >
                            {errorDetails}
                            <ExternalLink className="inline w-3 h-3 ml-1" />
                        </a>
                        <div className="flex space-x-2 mt-2 sm:mt-0">
                            <button
                                onClick={() => copyToClipboard(errorDetails)}
                                className="px-3 py-1 text-sm bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md"
                                title="Copy URL"
                            >
                                Copy
                            </button>
                            {/* Prominent Download Button */}
                            <a 
                                href={errorDetails} 
                                download="cleaned_data.csv" 
                                className="px-3 py-1 flex items-center text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition duration-150 shadow-md font-bold"
                                title="Download cleaned file"
                            >
                                <Download className="w-4 h-4 mr-1" /> Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {(status === 'error' && errorDetails) && (
                <div className="mt-4 p-4 bg-gray-900 border border-red-600 rounded-xl shadow-inner">
                    <p className="font-semibold text-red-400">Error: {errorDetails}</p>
                    <p className="text-sm text-red-300 mt-1">Check the API URL and the format of the uploaded file.</p>
                </div>
            )}
            {isOverLimit && (
                 <div className="mt-4 p-4 bg-gray-900 border border-yellow-600 rounded-xl shadow-inner">
                    <p className="font-semibold text-yellow-400">Upgrade Required</p>
                    <p className="text-sm text-gray-300 mt-1">You have used your {FREE_QUOTA_LIMIT} free cleaning sessions. Please upgrade to continue using DataWash Pro Max!</p>
                </div>
            )}
        </div>
    );
};


const App = () => {
    // --- State ho an'ny DataWash ---
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); 
    const [responseMessage, setResponseMessage] = useState('Awaiting a CSV file to be uploaded.');
    const [errorDetails, setErrorDetails] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDragging, setIsDragging] = useState(false); 
    const [metrics, setMetrics] = useState(initialMetrics);
    
    // --- State ho an'ny Auth sy Quota ---
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [quota, setQuota] = useState({ used: 0, limit: FREE_QUOTA_LIMIT });
    
    const fileInputRef = useRef(null);

    // --- Firebase Auth & Quota Logic (Tsy miova) ---

    // 1. Authentication Setup
    useEffect(() => {
        if (!auth) {
            console.error("Firebase Auth is not initialized.");
            setIsAuthReady(true);
            return;
        }

        const initialAuth = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Firebase Authentication failed:", error);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setupQuotaListener(user.uid); 
            } else {
                setUserId(null);
            }
            setIsAuthReady(true);
        });

        if (!auth.currentUser) {
            initialAuth();
        }

        return () => unsubscribe();
    }, []); 

    // 2. Quota Listener Setup
    const setupQuotaListener = useCallback((uid) => {
        if (!db) return;

        const quotaDocPath = QUOTA_COLLECTION_PATH(appId, uid);
        const docRef = doc(db, quotaDocPath);

        const unsubscribeQuota = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists()) {
                setQuota(docSnap.data());
            } else {
                const newQuota = { used: 0, limit: FREE_QUOTA_LIMIT, level: 'free' };
                await setDoc(docRef, newQuota);
                setQuota(newQuota);
            }
        }, (error) => {
            console.error("Error listening to quota:", error);
        });

        return () => unsubscribeQuota();

    }, [db, appId]);


    // --- Fampiasa Manampy (Utilities) ---

    const handleSignOut = async () => {
        if (auth) {
            try {
                await signOut(auth);
                setUserId(null);
                setQuota({ used: 0, limit: FREE_QUOTA_LIMIT });
                await signInAnonymously(auth); 
            } catch (error) {
                console.error("Error signing out:", error);
            }
        }
    };
    
    const copyToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy'); 
            // Azonao soloina amin'ny Toast na Notification izany
            console.log('URL copied to clipboard!'); 
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
    };

    // --- Esory ny calculateMockMetrics! Tsy ilaina intsony. ---
    // Tsy misy calculateMockMetrics intsony

    // --- File Handling & Upload Logic (UPDATED: Raiso Metrics avy amin'ny Server) ---

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.name.toLowerCase().endsWith('.csv'))) {
            setFile(selectedFile);
            setResponseMessage(`File ${selectedFile.name} selected. Ready to upload.`);
            setErrorDetails(null);
            setStatus('idle');
            setMetrics(initialMetrics);
        } else {
            setFile(null);
            setResponseMessage('Please select a valid CSV file only.');
            setStatus('error');
        }
    };
    
    const handleUpload = async () => {
        // 1. Fanamarinana ny Quota
        if (quota.used >= quota.limit) {
            setStatus('error');
            setResponseMessage(`You have reached your Free Tier quota of ${quota.limit} cleanings.`);
            return;
        }

        if (!file || isProcessing || !userId) return; 

        const formData = new FormData();
        formData.append('csvFile', file); 

        setIsProcessing(true);
        setStatus('uploading');
        setResponseMessage('Uploading and cleaning the file...');
        setErrorDetails(null);

        try {
            const headers = new Headers();
            headers.append('X-User-ID', userId); 
            
            let response = null;
            let attempts = 0;
            const maxAttempts = 3;

            while (attempts < maxAttempts) {
                try {
                    response = await fetch(API_URL, {
                        method: 'POST',
                        body: formData,
                        headers: headers, 
                    });
                    break;
                } catch (e) {
                    attempts++;
                    if (attempts >= maxAttempts) throw new Error('Could not connect to the Server after multiple attempts.');
                    const delay = Math.pow(2, attempts) * 1000; 
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }


            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setResponseMessage('Cleaning successful! Download is ready.');
                setErrorDetails(result.cleanedDataUrl); 
                
                // *** 1. ALAO IREO METRICS MARINA AVY AMIN'NY BACKEND ***
                const original = result.originalRowCount || 0;
                const cleaned = result.cleanedRowCount || 0;
                const removed = result.duplicatesRemoved || 0;

                const successRate = original > 0 
                    ? ((removed / original) * 100).toFixed(1) + '%'
                    : '0%';

                // *** 2. AMPIDIRO AO AMIN'NY STATE NY METRICS MARINA ***
                setMetrics({
                    originalRows: original,
                    cleanedRows: cleaned,
                    duplicatesRemoved: removed,
                    successRate: successRate,
                });

                // 3. Fampitomboana ny Quota rehefa nahomby (Update Firestore)
                if (db) {
                    const quotaDocPath = QUOTA_COLLECTION_PATH(appId, userId);
                    const docRef = doc(db, quotaDocPath);
                    await updateDoc(docRef, { used: quota.used + 1 });
                }

            } else {
                setStatus('error');
                setResponseMessage(result.message || 'Error from the Server. The file might be empty or in the wrong format.');
                setErrorDetails(result.error || 'Server Error (Check logs).');
            }
        } catch (error) {
            setStatus('error');
            setResponseMessage('Connection or Server failed.');
            setErrorDetails(error.message || 'Check if your Node.js service is running.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Drag and Drop Handlers (Tsy miova)
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange({ target: { files: [files[0]] } });
        }
    };


    return (
        // Premium Dark Background with subtle gradient
        <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-indigo-950 p-4 sm:p-10 font-sans">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="max-w-7xl mx-auto">
                <Header 
                    userId={userId} 
                    handleSignOut={handleSignOut} 
                    quota={quota} 
                    isAuthReady={isAuthReady}
                />

                {/* Dashboard Grid Layout */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Metrics Sidebar (Col 1) */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-xl font-bold text-indigo-400 mb-4 border-b border-indigo-700 pb-2">Analysis Summary (KPI Cards)</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard 
                                icon={<BarChart3 className="w-6 h-6" />}
                                title="Original Rows"
                                value={metrics.originalRows.toLocaleString()}
                                color="indigo"
                            />
                            <MetricCard 
                                icon={<CheckCircle className="w-6 h-6" />}
                                title="Cleaned Rows"
                                value={metrics.cleanedRows.toLocaleString()}
                                color="emerald"
                            />
                            <MetricCard 
                                icon={<Trash2 className="w-6 h-6" />}
                                title="Duplicates Removed"
                                value={metrics.duplicatesRemoved.toLocaleString()}
                                color="red"
                            />
                            <MetricCard 
                                icon={<FileSearch className="w-6 h-6" />} {/* Novana ho FileSearch ho an'ny Data Quality/Efficiency */}
                                title="Removal Rate"
                                value={metrics.successRate}
                                unit=""
                                color="yellow"
                            />
                        </div>
                        
                        {/* Status Card */}
                        <h2 className="text-xl font-bold text-indigo-400 mt-8 border-b border-indigo-700 pb-2">Current Status</h2>
                        <StatusCard 
                            status={status} 
                            responseMessage={responseMessage} 
                            errorDetails={errorDetails} 
                            copyToClipboard={copyToClipboard} 
                            isOverLimit={quota.used >= quota.limit}
                        />
                    </div>

                    {/* Main Content: Upload Section and Charts (Cols 2-3) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Upload Gateway (with Drag & Drop) */}
                        <div className="p-8 rounded-2xl shadow-2xl shadow-indigo-900/50 bg-gray-800/70 border border-gray-700 backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-indigo-600 pb-2">1. File Upload Gateway (Secured)</h2>

                            <div 
                                // Disable upload area if quota is exceeded
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-4 border-dashed rounded-xl p-16 text-center transition-all duration-300 
                                    ${quota.used >= quota.limit ? 'border-yellow-600 bg-yellow-900/20 cursor-not-allowed' : (file ? 'border-emerald-500 bg-emerald-900/30' : 
                                    (isDragging ? 'border-yellow-400 bg-yellow-900/40 scale-[1.01]' : 'border-indigo-500 hover:border-indigo-400 hover:bg-indigo-900/50 cursor-pointer'))}`}
                                onClick={() => !isProcessing && quota.used < quota.limit && fileInputRef.current.click()}
                                title={quota.used >= quota.limit ? "Quota Reached - Cannot upload" : "Click or drag your file here"}
                            >
                                <Upload className={`w-16 h-16 mx-auto mb-4 transition duration-300 ${quota.used >= quota.limit ? 'text-yellow-400' : (isDragging ? 'text-yellow-400' : 'text-indigo-400')}`} />
                                <p className="text-xl font-semibold text-white">
                                    {quota.used >= quota.limit ? "Quota Limit Reached. Upgrade required." : (isDragging ? "Drop the CSV file here!" : (file ? `Selected File: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : "Click or drag your CSV file (.csv) here"))}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">Maximum file size: 50MB</p>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    accept=".csv"
                                    className="hidden"
                                />
                            </div>

                            <div className="mt-8 flex justify-center space-x-4">
                                <button
                                    onClick={handleUpload}
                                    disabled={!file || isProcessing || quota.used >= quota.limit}
                                    className={`
                                        px-10 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-indigo-600/50 transform hover:scale-[1.03] active:scale-100
                                        ${!file || isProcessing || quota.used >= quota.limit ? 'bg-gray-600 shadow-none cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}
                                        flex items-center space-x-3
                                    `}
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Zap className="w-6 h-6" />
                                    )}
                                    <span>{isProcessing ? "Cleaning in Progress..." : (quota.used >= quota.limit ? "Quota Reached" : "Start Pro Cleaning")}</span>
                                </button>
                                {file && !isProcessing && (
                                    <button
                                        onClick={() => { setFile(null); setStatus('idle'); setResponseMessage('Awaiting a CSV file to be uploaded.'); setErrorDetails(null); fileInputRef.current.value = ''; setMetrics(initialMetrics); }}
                                        className="px-6 py-4 rounded-xl text-gray-300 bg-gray-700 hover:bg-gray-600 font-semibold transition-all duration-300 shadow-md transform hover:scale-105"
                                    >
                                        Clear <X className="inline w-5 h-5 ml-2" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 2. Charts Section */}
                        <CleaningEfficiencyChart metrics={metrics} />
                    </div>
                </main>

                <footer className="mt-16 text-center text-sm text-gray-400 p-6 border-t border-indigo-700">
                    DataWash Pro Max | Built by Gemini | Free Tier Quota: {FREE_QUOTA_LIMIT} cleans.
                </footer>
            </div>
        </div>
    );
};

export default App;
```eof

Mampiasà an'ity code vaovao ity, ary rehefa avy nanao *deploy* ny *backend* ianao, dia andramo *upload* rakitra CSV vaovao. Tokony hahita ny **Metrics marina** ianao eo amin'ny dashboard miaraka amin'ny *Visualization* manjelanjelatra!
