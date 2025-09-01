"use client"

export function DogPal() {
  return (
    <button
      onClick={() => alert("DogPal clicked!")}
      className="focus:outline-none"
    >
      <img
       src="/assets/petdog.gif"
       alt="DogPal animation"
       width={80}   // px
       height={80}  // px
       className="cursor-pointer"
     />
    </button>
  )
}




