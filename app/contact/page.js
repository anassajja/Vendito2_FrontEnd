'use strict';
'use client';

import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Footer from '../components/Footer';

function classNames(...classes) { // Helper function to conditionally apply classes
  return classes.filter(Boolean).join(' ') // Filter out any falsey values and join the rest
}

export default function Example() {

  const [agreed, setAgreed] = useState(false); // State to track if user has agreed to terms
  const router = useRouter(); // Next.js router instance
  const [error, setError] = useState(''); // State to track form submission errors
  const [success, setSuccess] = useState(''); // State to track form submission success

  const [name, setName] = useState(''); // State to track user's name
  const [email, setEmail] = useState(''); // State to track user's email
  const [phone, setPhone] = useState(''); // State to track user's phone number
  const [subject, setSubject] = useState(''); // State to track user's subject
  const [message, setMessage] = useState(''); // State to track user's message

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('') // Reset error message
    setSuccess('') // Reset success message

    if (!agreed) {
      setError('You must agree to the privacy policy to continue.')
      return
    }

    if (!name || !email || !subject || !message) {
      setError('All fields are required.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/createContact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log(response.data);
        setSuccess('Message sent successfully. We will get back to you soon.');
        setError('');
        setTimeout(() => {
          router.push('/home');
        }, 1000);
      }
      else {
        console.log(response.data); // Log the error message
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    } catch (error) {
      console.error(error); // Log the error message
      setError('An error occurred. Please try again later.');
      setSuccess('');
    };
  };

  return (
    <div>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Have a question or want to learn more about our products? We’d love to help. Send us a message and we’ll get
            back to you as soon as possible.
          </p>
        </div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className='sm:col-span-2'> 
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Name &nbsp;<span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  placeholder='Your name'
                  value = {name}
                  onChange = {(event) => setName(event.target.value)}
                  required = ""
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email &nbsp;<span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Your email'
                  autoComplete="email"
                  value = {email}
                  onChange = {(event) => setEmail(event.target.value)}
                  required = ""
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                Phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>+212</option>
                    <option>+33</option>
                    <option>+34</option>
                    <option>+1</option>
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value = {phone}
                  onChange = {(event) => setPhone(event.target.value)}
                  autoComplete="tel" // Enable browser autocomplete for phone number
                  placeholder='Your phone number'
                  required = ""
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                Subject &nbsp;<span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder='Subject'
                  value = {subject}
                  onChange = {(event) => setSubject(event.target.value)}
                  required = ""
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message &nbsp;<span className="text-red-500">*</span>
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  placeholder='Your message'
                  value = {message}
                  onChange = {(event) => setMessage(event.target.value)}
                  required = ""
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={classNames(
                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      agreed ? 'translate-x-3.5' : 'translate-x-0',
                      'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{' '}
                <a href="#" className="font-semibold text-indigo-600">
                  privacy&nbsp;policy
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Let&apos;s talk
            </button>
          </div>
          {error && <p className='text-red-500 bg-red-100 border border-red-400 rounded px-4 py-3 mt-2'>{error}</p>} {/* Display the error message if it exists */}
          {success && <p className='text-green-500 bg-green-100 border border-green-400 rounded px-4 py-3 mt-2'>{success}</p>} {/* Display the success message if it exists */}
        </form>
      </div>
      <Footer />
    </div>
  )
}
