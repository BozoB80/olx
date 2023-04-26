

const MenuItem = ({ label, onClick, icon }) => {
  return (
    <div onClick={onClick} className="flex gap-4 p-1 font-normal hover:bg-black hover:text-white hover:cursor-pointer">
      {icon}
      {label}
    </div>
  );
}



export default MenuItem;