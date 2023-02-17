import Image from "next/image"


const Categories = ({ categories }) => {
  return (
    <div className="flex justify-between items-center w-full px-10 py-4">
      {categories.map((category) => (
      <div key={category._id} className="flex flex-col justify-center px-3 py-2 items-center min-w-fit">
        <div style={{ backgroundColor: category.bgcolor }} className={`flex justify-center items-center border w-16 h-16 rounded-full `}>
          {/* <Image 
            src={category.imageUrl}
            alt={category.description}
            width={50}
            height={50}   
            className="object-contain hover:scale-110 transition-all cursor-pointer"       
          /> */}
        </div>
        <h3 className="text-sm mt-1 w-full text-center">{category.description}</h3>
      </div>  
      ))}
          
    </div>
  )
}

export default Categories
