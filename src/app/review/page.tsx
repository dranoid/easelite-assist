'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { truncateAddress } from '../config/addressUtils';

interface Application {
  id: number;
  category: string;
  title: string;
  walletAddress: string;
  reason: string;
  votes: number;
}

const sampleApplications: Application[] = [
  {
    id: 1,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0x1234567890123456789012345678901234567890',
    reason: 'I need this stipend to cover my transportation costs for attending coding bootcamp.',
    votes: 0,
  },
  {
    id: 2,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    reason: 'This grant will support my research on improving blockchain scalability.',
    votes: 0,
  },
  {
    id: 3,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0x9876543210987654321098765432109876543210',
    reason: 'I want to create an online course to teach blockchain basics to beginners.',
    votes: 0,
  },
  {
    id: 4,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0xfedcbafedcbafedcbafedcbafedcbafedcbafed',
    reason: 'We need funding to develop a new decentralized lending protocol.',
    votes: 0,
  },
  {
    id: 5,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0x1111222233334444555566667777888899990000',
    reason: 'We want to organize monthly blockchain meetups in our city.',
    votes: 0,
  },
  {
    id: 6,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0xaaaabbbbccccddddeeeeffffgggghhhhiiiijjjj',
    reason: 'I plan to curate an NFT art exhibition to showcase local digital artists.',
    votes: 0,
  },
  {
    id: 7,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0x123abc456def789ghi101112jkl131415mno1617',
    reason: 'We aim to research and promote energy-efficient blockchain solutions.',
    votes: 0,
  },
  {
    id: 8,
    category: 'stipend',
    title: '10 Dollar stipend',
    walletAddress: '0xhealth1health2health3health4health5health6',
    reason: 'Our project aims to secure medical records using blockchain technology.',
    votes: 0,
  }
];

const ReviewPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(sampleApplications);
  const [remainingPoints, setRemainingPoints] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'votes' | 'id'>('id');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [allocatedPoints, setAllocatedPoints] = useState<number>(0);

  useEffect(() => {
    const sortedApps = [...applications].sort((a, b) => 
      sortBy === 'votes' ? b.votes - a.votes : a.id - b.id
    );
    setApplications(sortedApps);
  }, [applications, sortBy]);

  const handleVote = (id: number, points: number) => {
    if (remainingPoints - points < 0) {
      alert('Not enough points!');
      return;
    }

    setApplications(prevApps =>
      prevApps.map(app =>
        app.id === id ? { ...app, votes: app.votes + points } : app
      )
    );
    setRemainingPoints(prev => prev - points);
    setAllocatedPoints(prev => prev + points);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-indigo-700' : 'text-indigo-300'}`}>
            Grant Application Review
          </h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-full ${
              theme === 'light' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-300 text-gray-900'
            } transition-colors duration-300`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
            Remaining Points: <span className={theme === 'light' ? 'text-indigo-600' : 'text-indigo-300'}>{remainingPoints}</span>
          </p>
          <p className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
            Allocated Points: <span className={theme === 'light' ? 'text-indigo-600' : 'text-indigo-300'}>{allocatedPoints}</span>
          </p>
          <select 
            className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'light' 
                ? 'bg-white text-gray-800 border-gray-300' 
                : 'bg-gray-800 text-gray-200 border-gray-700'
            }`}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'votes' | 'id')}
          >
            <option value="id">Sort by ID</option>
            <option value="votes">Sort by Votes</option>
          </select>
        </div>
        <AnimatePresence>
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {applications.map(app => (
              <motion.div 
                key={app.id} 
                className={`rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-white' 
                    : 'bg-gray-800'
                }`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <h2 className={`text-2xl font-semibold mb-2 ${theme === 'light' ? 'text-indigo-700' : 'text-indigo-300'}`}>
                    {app.title}
                  </h2>
                  <p className={`text-sm mb-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Category: {app.category}
                  </p>
                  <p className={`text-sm mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    Wallet: {truncateAddress(app.walletAddress)}
                  </p>
                  <p className={`mt-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {app.reason}
                  </p>
                </div>
                <div className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <span className={`text-lg font-semibold ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-300'}`}>
                      Votes: {app.votes}
                    </span>
                    <div className="flex space-x-2">
                      {[1, 2, 3].map(points => (
                        <motion.button
                          key={points}
                          onClick={() => handleVote(app.id, points)}
                          className={`px-4 py-2 rounded-full text-white font-semibold ${
                            remainingPoints - points < 0
                              ? 'bg-gray-400 cursor-not-allowed'
                              : theme === 'light'
                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                : 'bg-indigo-400 hover:bg-indigo-500'
                          }`}
                          disabled={remainingPoints - points < 0}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          +{points}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewPage;
