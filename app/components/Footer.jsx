'use strict';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image'


export default function Footer() {
    return (
        <footer className="bg-gray-900">
        <div className="px-6 py-8 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Vendito</span>
              <div className="relative h-10 w-20">
                    <Image
                      src="/vendito.png"
                      alt="Vendito"
                      layout="fill"
                      objectFit="contain"
                    />
              </div>
            </a>
            <div className="flex gap-x-6">
              <a href="./home" className="text-sm font-semibold leading-6 text-white">
                Home
              </a>
              <a href="./about" className="text-sm font-semibold leading-6 text-white">
                About
              </a>
              <a href="./contact" className="text-sm font-semibold leading-6 text-white">
                Contact
              </a>
              <a href="./admin" className="text-sm font-semibold leading-6 text-white">
                Dashboard
              </a>
              <a href="./faq" className="text-sm font-semibold leading-6 text-white">
                F.A.Q.
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800" />
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm font-semibold leading-6 text-gray-300">
              © 2024 Vendito. All rights reserved.
            </p>
            <div className="flex justify-center mt-4">
                <a href="#" className="text-gray-400 hover:text-white mx-2">
                    <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white mx-2">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white mx-2">
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
            </div>
            <div className="flex gap-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
}