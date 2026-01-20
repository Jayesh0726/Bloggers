import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Container from '../Containers/Container'

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Features', href: '/' },
      { name: 'Pricing', href: '/' },
      { name: 'Blog', href: '/all-posts' },
      { name: 'Careers', href: '/' },
    ],
    support: [
      { name: 'Help Center', href: '/' },
      { name: 'Contact', href: '/' },
      { name: 'Support', href: '/' },
      { name: 'FAQ', href: '/' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/' },
      { name: 'Terms & Conditions', href: '/' },
      { name: 'Cookie Policy', href: '/' },
      { name: 'Licenses', href: '/' },
    ],
  };

  const socialLinks = [
    { icon: 'facebook', href: '#' },
    { icon: 'twitter', href: '#' },
    { icon: 'linkedin', href: '#' },
    { icon: 'instagram', href: '#' },
  ];

  return (
    <footer className='mt-auto border-t relative border-black/5 dark:border-white/10 bg-white/70 dark:bg-dark-base backdrop-blur-md'>
      <Container className='py-12 sm:py-16 md:py-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 lg:mb-16'>
          <div className='lg:col-span-1'>
            <Link to='/' className='inline-block mb-6'>
              <Logo width='70px' />
            </Link>
            <p className='text-sm text-[#4b4f58] dark:text-[#a7adbe] max-w-xs leading-relaxed mb-6'>
              Share your ideas and connect with writers around the world.
            </p>
            <div className='flex gap-3'>
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className='w-10 h-10 rounded-lg border border-black/5 dark:border-white/10 text-[#4b4f58] dark:text-[#cdd2e5] hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors duration-150'
                  aria-label={social.icon}
                >
                  <svg className='w-4.5 h-4.5' fill='currentColor' viewBox='0 0 24 24'>
                    {social.icon === 'facebook' && <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>}
                    {social.icon === 'twitter' && <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/>}
                    {social.icon === 'linkedin' && <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'/>}
                    {social.icon === 'instagram' && <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 12.912c0 2.906-2.364 5.27-5.27 5.27h-.462c-2.906 0-5.27-2.364-5.27-5.27v-.462c0-2.906 2.364-5.27 5.27-5.27h.462c2.906 0 5.27 2.364 5.27 5.27v.462z'/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-xs font-semibold text-[#2b303a] dark:text-[#e6e8f2] uppercase tracking-[0.08em] mb-3'>Company</h4>
            <ul className='space-y-2.5'>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className='text-sm text-[#4b4f58] dark:text-[#b7bed2] hover:text-[#222d80] dark:hover:text-[#c7ceff] transition-colors duration-150'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-xs font-semibold text-[#2b303a] dark:text-[#e6e8f2] uppercase tracking-[0.08em] mb-3'>Support</h4>
            <ul className='space-y-2.5'>
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className='text-sm text-[#4b4f58] dark:text-[#b7bed2] hover:text-[#222d80] dark:hover:text-[#c7ceff] transition-colors duration-150'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='text-xs font-semibold text-[#2b303a] dark:text-[#e6e8f2] uppercase tracking-[0.08em] mb-3'>Legal</h4>
            <ul className='space-y-2.5'>
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className='text-sm text-[#4b4f58] dark:text-[#b7bed2] hover:text-[#222d80] dark:hover:text-[#c7ceff] transition-colors duration-150'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-black/5 absolute left-0 right-0 md:top-3/4 lg:top-3/4 sm:bottom-0 dark:border-white/10'></div>

        <div className='pt-8 sm:pt-10 md:pt-12 flex flex-col sm:flex-row justify-between items-center gap-6'>
          <p className='text-sm text-[#4b4f58] dark:text-[#a7adbe]'>
            © {currentYear} Bloggers. All rights reserved.
          </p>
          <div className='flex gap-6 text-sm'>
            <Link to='/' className='text-[#4b4f58] dark:text-[#b7bed2] hover:text-[#222d80] dark:hover:text-[#c7ceff] transition-colors duration-150'>
              Privacy
            </Link>
            <Link to='/' className='text-[#4b4f58] dark:text-[#b7bed2] hover:text-[#222d80] dark:hover:text-[#c7ceff] transition-colors duration-150'>
              Terms
            </Link>
            <Link to='/' className='text-[#4b4f58] dark:text-[#b7bed2] hover:text-[#222d80] dark:hover:text-[#c7ceff] transition-colors duration-150'>
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer