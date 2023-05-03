"use client";

const Button = ({ onClick, icon, label, dark, small }) => {
  return (
    <button
      onClick={onClick}
      className={`flex ${small ? 'w-1/2' : 'w-full'} justify-center items-center text-sm font-semibold gap-2 border-2 border-black transition hover:shadow-button rounded-[4px] p-3 
      ${dark ? 'bg-black text-white' : ''}`}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default Button;
