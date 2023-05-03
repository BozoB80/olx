'use client'

const Container = ({ children, bground }) => {
  return (
    <div className={`max-w-full mx-auto p-1 sm:p-5 ${bground ? 'bg-[#f1f4f5]' : ''}`}>
      {children}
    </div>
  );
}

export default Container;