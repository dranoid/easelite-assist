'use client';

import { useEffect, useState } from 'react';

import { ConnectButton } from '../components/Wallets';
import Link from 'next/link';
import { useAccount } from 'wagmi';

async function getGrants() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EASE_URL}/general/grants`);
  if (!res.ok) {
    throw new Error('Failed to fetch grants');
  }
  return res.json();
}

async function checkIfApplied(address: string, grantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EASE_URL}/general/grants/check-application`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ grantId, userAddress: address }),
  });
  if (!res.ok) {
    throw new Error('Failed to check application status');
  }
  return res.json();
}

async function checkGrantStatus(address: string, grantId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EASE_URL}/general/grants/check-grant-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ grantId, userAddress: address }),
  });
  if (!res.ok) {
    throw new Error('Failed to check grant status');
  }
  return res.json();
}

export default function Grants() {
  const [grants, setGrants] = useState<any[]>([]);
  const [appliedGrants, setAppliedGrants] = useState<Record<string, boolean>>({});
  const [statusPopup, setStatusPopup] = useState<{ isOpen: boolean; status: string | null }>({ isOpen: false, status: null });
  const { isConnected, address } = useAccount();

  useEffect(() => {
    getGrants().then(data => setGrants(data.data));
  }, []);

  useEffect(() => {
    if (address && grants.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      grants.forEach((grant: any) => {
        if (grant && typeof grant.id === 'string') {
          checkIfApplied(address, grant.id).then(data => {
            setAppliedGrants(prev => ({ ...prev, [grant.id]: data.data.applied }));
          });
        }
      });
    }
  }, [address, grants]);

  const handleCheckStatus = async (grantId: string) => {
    if (address) {
      try {
        const response = await checkGrantStatus(address, grantId);
        setStatusPopup({ isOpen: true, status: response.data.status });
      } catch (error) {
        console.error('Failed to check grant status:', error);
        setStatusPopup({ isOpen: true, status: 'error' });
      }
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'in-review': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d3250] to-[#503e9d] text-white">
     <header className="bg-[#1e2235] py-4 shadow-lg">
  <div className="container mx-auto px-4 flex justify-between items-center">
    <Link href="/" className="text-3xl font-bold text-[#f9cb5c] hover:text-[#e6b84d] transition-colors">
      Easelite Grants
    </Link>
    <ConnectButton />
  </div>
</header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Available Grants</h2>
          <p className="text-xl text-[#f9cb5c]">Explore our grant opportunities and take the next step in your academic journey.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {grants.map((grant: any) => (
            <div key={grant.id} className="bg-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-[#f9cb5c]">{grant.title}</h3>
                <p className="mb-4 text-gray-300">{grant.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-[#f9cb5c] text-[#2d3250] py-1 px-3 rounded-full font-medium">
                    {grant.category}
                  </span>
                </div>
              </div>
              <div className="bg-[#1e2235] p-4">
                {isConnected ? (
                  appliedGrants[grant.id] ? (
                    <button 
                      onClick={() => handleCheckStatus(grant.id)}
                      className="block w-full bg-[#4a5568] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2d3748] transition-colors text-center"
                    >
                      Check Grant Status
                    </button>
                  ) : (
                    <Link 
                      href={`/grants/apply?id=${grant.id}`}
                      className="block w-full bg-[#f9cb5c] text-[#2d3250] font-semibold py-2 px-4 rounded-lg hover:bg-[#e6b84d] transition-colors text-center"
                    >
                      Apply Now
                    </Link>
                  )
                ) : (
                  <button 
                    className="block w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    Connect Wallet to Apply
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>

      {statusPopup.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Grant Status</h3>
            <div className={`text-white p-4 rounded-lg mb-4 ${getStatusColor(statusPopup.status)}`}>
              {statusPopup.status === 'in-review' && 'Your application is currently under review.'}
              {statusPopup.status === 'approved' && 'Congratulations! Your grant application has been approved.'}
              {statusPopup.status === 'rejected' && 'We regret to inform you that your grant application has been rejected.'}
              {statusPopup.status === 'error' && 'An error occurred while checking the status. Please try again later.'}
            </div>
            <button 
              onClick={() => setStatusPopup({ isOpen: false, status: null })}
              className="w-full bg-[#f9cb5c] text-[#2d3250] font-semibold py-2 px-4 rounded-lg hover:bg-[#e6b84d] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="bg-[#1e2235] py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Easelite Assist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
