import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cards from './Cards';

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner bg-[#2265d8]" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-[#2f91fa]">
              {user?.name[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name text-[#0747b6] font-semibold">
              {user?.name}
            </h1>
            <p className="text-gray-600">
              {user?.email}
            </p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2 text-[#0747b6]">
            My Banks
          </h2>
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="add bank"
            />
            <h2 className="text-14 font-semibold text-gray-600">
              Add Bank
            </h2>
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <Cards
                key={banks[0].$id}
                account={banks[0]}
                userName={user?.name || 'Guest'}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <Cards
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={user?.name || 'Guest'}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;
