import { useState } from "react";

export default function ImageSlider(props) {
    
    const images = props.images;
    const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-[500px] h-[600px]  rounded-2xl">
        <img src={images[currentIndex]} className="w-full h-[500px]  p-2 object-cover rounded-2xl" />
        <div className="w-full h-[100px]  flex justify-center items-center">
            {
                images?.map(
                    (image,index) => {
                        return (
                            <img key={index} src={image} className={"w-[100px] h-[100px] m-2 rounded-2xl hover:scale-110 " + (index === currentIndex && "border-3")} 
                            onClick={() => setCurrentIndex(index)}/>
                        )
                    }
                    
  )
            }
        </div>
      
    </div>
  );
}
