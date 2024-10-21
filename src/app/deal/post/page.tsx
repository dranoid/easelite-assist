'use client';

import { useEffect, useState } from 'react';

import { ConnectButton } from '../../components/Wallets';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';

const categories = ['Coupon Codes', 'Referral Deals', 'Educational Discounts', 'General'];
const countries = ['Nigeria', 'Kenya', 'Ghana', 'International'];

export default function PostDeal() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  
  const { isConnected, address } = useAccount();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ category, description, country, address });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
              ← Back to Home
            </Link>
            <ConnectButton />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-8">
            Post a New Deal
          </h1>
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-500 bg-opacity-20 border-l-4 border-blue-500 text-white p-4 rounded-md mb-6"
            >
              <p className="font-bold text-lg mb-2">Connect your wallet for rewards!</p>
              <p>
                If you connect your wallet before submitting, you&apos;ll have a chance to earn rewards if your deal gets upvoted. It&apos;s not required, but it&apos;s a great opportunity!
              </p>
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="category" className="block text-lg font-medium text-white mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white bg-opacity-10 border-2 border-white border-opacity-30 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-md transition-all duration-200 ease-in-out hover:bg-opacity-20"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="description" className="block text-lg font-medium text-white mb-2">
                Describe the Deal
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white bg-opacity-10 border-2 border-white border-opacity-30 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-md transition-all duration-200 ease-in-out hover:bg-opacity-20"
                required
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="country" className="block text-lg font-medium text-white mb-2">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 bg-white bg-opacity-10 border-2 border-white border-opacity-30 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block text-md transition-all duration-200 ease-in-out hover:bg-opacity-20"
                required
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Deal
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
