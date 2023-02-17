import Image from "next/image"


const Categories = ({ categories }) => {
  return (
    <div className="flex justify-start items-center w-full px-10 py-4 gap-20">
      {categories.map((category) => (
      <div key={category._id} className="flex flex-col justify-center items-center">
        <div className={`flex justify-center items-center border w-16 h-16 bg-${category.bgcolor} rounded-full `}>
          <Image 
            src={category.imageUrl}
            alt={category.description}
            width={50}
            height={50}   
            className="object-contain hover:scale-105 transition-all cursor-pointer"       
          />
        </div>
        <h3 className="text-sm mt-1">{category.description}</h3>
      </div>  
      ))}
          
    </div>
  )
}

export default Categories
