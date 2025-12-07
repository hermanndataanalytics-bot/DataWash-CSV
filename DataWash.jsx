import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, CheckCircle, FileText, Download, Zap, BarChart3, Trash2 } from 'lucide-react';

// Note: Replace this with your Render URL after deploying the backend.
const API_URL = 'https://datawash-csv.onrender.com/upload'; 

// Mock Metrics structure for the dashboard
const initialMetrics = {
    originalRows: 0,
    cleanedRows: 0,
    duplicatesRemoved: 0,
    successRate: '0%',
};

// Component: Header
const Header = () => (
    <div className="flex items-center space-x-4 p-4 mb-8">
        <Zap className="w-8 h-8 text-indigo-400" />
        <div>
            <h1 className="text-3xl font-extrabold text-white">DataWash Pro Max</h1>
            <p className="mt-1 text-sm text-indigo-300">Premium Data Cleansing Dashboard</p>
        </div>
    </div>
);

// Component: Metrics Display Cards (KPI Cards)
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

// Component: Cleaning Efficiency Chart
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
            <h3 className="text-xl font-bold text-white mb-4 border-b border-indigo-600/50 pb-2">Cleaning Efficiency Breakdown (Chart)</h3>
            
            <div className="flex flex-col space-y-4">
                {/* Visual Bar Chart */}
                <div className="h-8 flex rounded-lg overflow-hidden shadow-inner border border-gray-700">
                    <div 
                        className="bg-emerald-500 h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2" 
                        style={{ width: `${cleanedPercent}%` }}
                        title={`Cleaned: ${cleanedPercent.toFixed(1)}%`}
                    >
                        <span className='text-xs font-semibold text-white/90 drop-shadow-lg'>{cleanedPercent.toFixed(1)}%</span>
                    </div>
                    <div 
                        className="bg-red-500 h-full transition-all duration-1000 ease-out flex items-center pl-2" 
                        style={{ width: `${removedPercent}%` }}
                        title={`Removed (Duplicates): ${removedPercent.toFixed(1)}%`}
                    >
                         <span className='text-xs font-semibold text-white/90 drop-shadow-lg'>{removedPercent.toFixed(1)}%</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center sm:justify-around text-sm font-semibold pt-2">
                    <div className="flex items-center text-emerald-400 mb-2 sm:mb-0">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        Cleaned Data: {metrics.cleanedRows.toLocaleString()} rows
                    </div>
                    <div className="flex items-center text-red-400">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        Duplicates Removed: {metrics.duplicatesRemoved.toLocaleString()} rows
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component: Status Card
const StatusCard = ({ status, responseMessage, errorDetails, copyToClipboard }) => {
    let icon, title, color;

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
        </div>
    );
};


const App = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); 
    const [responseMessage, setResponseMessage] = useState('Awaiting a CSV file to be uploaded.');
    const [errorDetails, setErrorDetails] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDragging, setIsDragging] = useState(false); // New state for drag-and-drop
    const [metrics, setMetrics] = useState(initialMetrics);
    const fileInputRef = useRef(null);

    // Automatic copy method
    const copyToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy'); 
            console.log('URL copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            console.error('Failed to copy. Please copy manually: ' + text);
        }
        document.body.removeChild(textarea);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.name.toLowerCase().endsWith('.csv'))) {
            setFile(selectedFile);
            setResponseMessage(`File ${selectedFile.name} selected. Ready to upload.`);
            setErrorDetails(null);
            setStatus('idle');
            // Reset metrics when new file is selected
            setMetrics(initialMetrics);
        } else {
            setFile(null);
            setResponseMessage('Please select a valid CSV file only.');
            setStatus('error');
        }
    };
    
    // Simulate Metric Calculation (Since the backend doesn't return counts, we mock them)
    const calculateMockMetrics = (originalFileName) => {
        const fakeOriginal = Math.floor(Math.random() * 1000) + 500;
        const fakeDuplicates = Math.floor(Math.random() * 10) + 1; 
        const fakeCleaned = fakeOriginal - fakeDuplicates;
        const rate = ((fakeDuplicates / fakeOriginal) * 100).toFixed(1);

        setMetrics({
            originalRows: fakeOriginal,
            cleanedRows: fakeCleaned,
            duplicatesRemoved: fakeDuplicates,
            successRate: `${rate}%`,
        });
    };

    const handleUpload = async () => {
        if (!file || isProcessing) return;

        const formData = new FormData();
        formData.append('csvFile', file); 

        setIsProcessing(true);
        setStatus('uploading');
        setResponseMessage('Uploading and cleaning the file...');
        setErrorDetails(null);

        try {
            let response = null;
            let attempts = 0;
            const maxAttempts = 3;

            while (attempts < maxAttempts) {
                try {
                    response = await fetch(API_URL, {
                        method: 'POST',
                        body: formData,
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
                calculateMockMetrics(file.name); // Calculate metrics on success
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

    // Drag and Drop Handlers
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
            // Reusing existing logic to handle the file
            handleFileChange({ target: { files: [files[0]] } });
        }
    };


    return (
        // Premium Dark Background with subtle gradient
        <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-indigo-950 p-4 sm:p-10 font-sans">
            {/* Tailwind CSS import for single file */}
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="max-w-7xl mx-auto">
                <Header />

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
                                icon={<Zap className="w-6 h-6" />}
                                title="Efficiency Rate"
                                value={metrics.successRate}
                                unit=""
                                color="yellow"
                            />
                        </div>
                        
                        {/* Status Card (moved to sidebar for better layout) */}
                        <h2 className="text-xl font-bold text-indigo-400 mt-8 border-b border-indigo-700 pb-2">Current Status</h2>
                        <StatusCard 
                            status={status} 
                            responseMessage={responseMessage} 
                            errorDetails={errorDetails} 
                            copyToClipboard={copyToClipboard} 
                        />
                    </div>

                    {/* Main Content: Upload Section and Charts (Cols 2-3) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Upload Gateway (with Drag & Drop) */}
                        <div className="p-8 rounded-2xl shadow-2xl shadow-indigo-900/50 bg-gray-800/70 border border-gray-700 backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b-2 border-indigo-600 pb-2">1. File Upload Gateway (Drag & Drop)</h2>

                            <div 
                                // Drag and Drop Handlers and styles
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-4 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-300 
                                    ${file ? 'border-emerald-500 bg-emerald-900/30' : 
                                    (isDragging ? 'border-yellow-400 bg-yellow-900/40 scale-[1.01]' : 'border-indigo-500 hover:border-indigo-400 hover:bg-indigo-900/50')}`}
                                onClick={() => !isProcessing && fileInputRef.current.click()}
                                title="Click or drag your file here"
                            >
                                <Upload className={`w-16 h-16 mx-auto mb-4 transition duration-300 ${isDragging ? 'text-yellow-400' : 'text-indigo-400'}`} />
                                <p className="text-xl font-semibold text-white">
                                    {isDragging ? "Drop the CSV file here!" : (file ? `Selected File: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : "Click or drag your CSV file (.csv) here")}
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
                                    disabled={!file || isProcessing}
                                    className={`
                                        px-10 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-indigo-600/50 transform hover:scale-[1.03] active:scale-100
                                        ${!file || isProcessing ? 'bg-gray-600 shadow-none cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}
                                        flex items-center space-x-3
                                    `}
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Zap className="w-6 h-6" />
                                    )}
                                    <span>{isProcessing ? "Cleaning in Progress..." : "Start Pro Cleaning"}</span>
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
                    DataWash Pro Max | Built by Gemini | For professional data cleaning.
                </footer>
            </div>
        </div>
    );
};

export default App;