import React from 'react';
import Link from 'next/link';
import { formatAmount } from '@/lib/utils';
import Image from 'next/image';

const Cards = ({
    account, 
    userName, 
    showBalance = true
}: CreditCardProps) => {
  return (
    <div className="flex flex-col shadow-md rounded-lg overflow-hidden">
        <Link href="/" className="bank-card bg-gradient-to-r from-blue-500 to-indigo-600 p-4 relative">
            <div className="bank-card_content flex flex-col justify-between h-full">
                <div>
                    <h1 className="text-16 font-semibold text-white">
                        {userName}
                    </h1>
                    {showBalance && (
                        <p className="font-ibm-plex-serif font-black text-white text-xl">
                            {formatAmount(account.currentBalance)}
                        </p>
                    )}
                </div>
                <article className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between">
                        <h1 className="text-12 font-semibold text-white">
                            {userName}
                        </h1>
                        <h2 className="text-12 font-semibold text-white">
                            12/25
                        </h2> 
                    </div>
                    <p className="text-12 font-semibold tracking-[1.1px] text-white">
                        ●●●● ●●●● ●●●● <span className="text-16">
                            {account.cardLastFour}
                        </span>
                    </p>
                </article>
            </div>
            <div className="bank-card_icon flex items-center gap-3 absolute bottom-4 right-4">
                <Image
                    src="/icons/paypass.svg"
                    width={20}
                    height={24}
                    alt="paypass"
                />
                <Image
                    src="/icons/mastercard.svg"
                    width={49}
                    height={39}
                    alt="mastercard"
                />
            </div>
            <Image
                src="/icons/lines.png"
                width={316}
                height={190}
                alt="lines"
                className="absolute top-0 left-0 opacity-30"
            />
        </Link>
    </div>
  );
};

export default Cards;
