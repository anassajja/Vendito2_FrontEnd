'use strict';
'use client';

import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="max-w-5xl mx-auto w-full px-10 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-center flex-col gap-y-2 py-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Testimonials</h2>
        <p className="text-lg font-medium text-slate-700/70 dark:text-gray-400">Discover how Vendito can benefit you</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 w-full">
        <div className="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
          <div className="flex flex-col gap-y-3.5">
            <p className="font-bold text-xl">Easy to use platform</p>
            <p className="font-medium text-slate-700/90 dark:text-gray-300">Vendito&apos;s platform is intuitive and easy to use. I was able to list my items in no time.</p>
          </div>
          <div className="flex flex-col">
            <img src="https://randomuser.me/api/portraits/women/54.jpg" alt="Jane Cooper" className="h-10 w-10" />
            <p className="pt-2 text-sm font-semibold">Sarah MALIH</p>
            <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Seller on Vendito</p>
          </div>
        </div>
        <div className="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
          <div className="flex flex-col gap-y-3.5">
            <p className="font-bold text-xl">Great customer service</p>
            <p className="font-medium text-slate-700/90 dark:text-gray-300">Vendito&apos;s customer service is top-notch. They were very responsive and helped me resolve my issues quickly.</p>
          </div>
          <div className="flex flex-col">
            <img src="https://randomuser.me/api/portraits/women/30.jpg" alt="John Doe" className="h-10 w-10" />
            <p className="pt-2 text-sm font-semibold">Khadija KARTI</p>
            <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Buyer on Vendito</p>
          </div>
        </div>
        <div className="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
          <div className="flex flex-col gap-y-3.5">
            <p className="font-bold text-xl">Secure transactions</p>
            <p className="font-medium text-slate-700/90 dark:text-gray-300">I feel safe doing transactions on Vendito. They have secure payment methods and a reliable dispute resolution process.</p>
          </div>
          <div className="flex flex-col">
            <img src="https://randomuser.me/api/portraits/women/90.jpg" alt="Jane Doe" className="h-10 w-10" />
            <p className="pt-2 text-sm font-semibold">Hanae LMJDOUBI</p>
            <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">User on Vendito</p>
          </div>
        </div>
        <div className="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
          <div className="flex flex-col gap-y-3.5">
            <p className="font-bold text-xl">Wide range of products</p>
            <p className="font-medium text-slate-700/90 dark:text-gray-300">Vendito has a wide range of products. I can find almost anything I need on their platform.</p>
          </div>
          <div className="flex flex-col">
            <img src="https://randomuser.me/api/portraits/men/90.jpg" alt="Ash Doe" className="h-10 w-10" />
            <p className="pt-2 text-sm font-semibold">Omar SAILAN</p>
            <p className="text-sm font-medium text-slate-700/70 dark:text-gray-400">Buyer on Vendito</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;