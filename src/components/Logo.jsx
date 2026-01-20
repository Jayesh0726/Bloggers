import React from 'react'

function Logo({ width = "150px" }) {
  return (
    <div
      style={{ width }}
      className='flex items-center gap-2 font-semibold text-[#111318] dark:text-[#f5f6fb] tracking-tight'
    >
      <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 shadow-sm text-sm font-bold'>
        BL
      </span>
      <div className='flex flex-col leading-tight'>
        <span className='text-lg'>Bloggers</span>
        <span className='text-[11px] uppercase tracking-[0.18em] text-[#5a5e68] dark:text-[#b9c0d4]'>Notes & Stories</span>
      </div>
    </div>
  );
}

export default Logo