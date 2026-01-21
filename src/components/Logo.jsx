import React from 'react'

function Logo({ width = "150px" }) {
  return (
    <div
      style={{ width }}
      className='flex items-center gap-2 font-bold text-[#111318] dark:text-[#f5f6fb]'
    >
      <img 
        src='/bloggersfavicon1.png' 
        alt='Bloggers Logo' 
        className='h-8 w-8 object-contain'
      />
      <span className='text-xl tracking-tight'>bloggers</span>
    </div>
  );
}

export default Logo