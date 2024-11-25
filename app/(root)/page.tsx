import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Home = () => {
    const LoggedIn = {firstName: 'Ahmar', lastName: 'Shahid',
        email:'ahmarinfo@yahoo.com'
    };
  return (
    <section className='home'>
      <div className='home-content'>
        <header className= 'home-header'>
            <HeaderBox
            type = "greeting"
            title="Welcome"
            user = {LoggedIn?.firstName || 'Guest'}
            subtext = "Access and manage your account and transactions with ease."
            />
            
            <TotalBalanceBox
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance = {16500.95}
            
            />
        </header>

        Recent Transactions
      </div>

    <RightSidebar
    user = {LoggedIn}
    transactions = {[]}
    banks={[]}
    />

    </section>
  )
}

export default Home
