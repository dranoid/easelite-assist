import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2d3250] to-[#503e9d] text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Easelite Assist</h1>
          <p className="text-xl md:text-2xl text-[#f9cb5c]">Student Grants, Community Deals: All On-Chain</p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white/10 p-8 rounded-lg">
  <h2 className="text-2xl font-semibold mb-4">For Students: Universal Assistance Program</h2>
  <p className="mb-4">Turn Academic Achievement into Real-World Rewards</p>
  <ul className="list-disc list-inside mb-4">
    <li>Get rewarded for your academic excellence</li>
    <li>Your success is our success</li>
  </ul>
  <p className="text-[#f9cb5c] italic mb-4">&quot;Decentralizing Student Support, Block by Block&quot;</p>
  <Link href="/grants" className="bg-[#f9cb5c] text-[#2d3250] font-semibold py-3 px-6 rounded-lg hover:bg-[#e6b84d] transition-colors inline-block">
    Apply for Grants Now
  </Link>
</div>
<div className="bg-white/10 p-8 rounded-lg">
  <h2 className="text-2xl font-semibold mb-4">For Everyone: Community Deals Marketplace</h2>
  <p className="mb-4">Discover Community-Verified Savings</p>
  <ul className="list-disc list-inside mb-4">
    <li>Access exclusive discounts and referral deals</li>
    <li>All offers verified and signed on-chain</li>
    <li>Share deals, earn rewards</li>
    <li>Help others save while you earn</li>
  </ul>
  <p className="text-[#f9cb5c] italic mb-4">&quot;Where Community Value Meets Web3 Innovation&quot;</p>
  <div className="grid grid-cols-2 gap-4">
    <Link href="/deal/post" className="bg-[#f9cb5c] text-[#2d3250] font-semibold py-3 px-6 rounded-lg hover:bg-[#e6b84d] transition-colors text-center">
      Post Deal
    </Link>
    <Link href="/deal/view" className="bg-[#f9cb5c] text-[#2d3250] font-semibold py-3 px-6 rounded-lg hover:bg-[#e6b84d] transition-colors text-center">
      Discover Deals
    </Link>
  </div>
</div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-8">Value Propositions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">For Students</h3>
              <p>&quot;Transform your grades into grants&quot;</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">For Deal Sharers</h3>
              <p>&quot;Share savings, earn rewards&quot;</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
              <p>&quot;Access verified deals, support education&quot;</p>
            </div>
          </div>
        </section>


       
      </div>
    </main>
  );
}
