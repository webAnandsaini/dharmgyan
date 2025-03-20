'use client';
import React from "react";

 const FullLoader = () => {
   return (
      <div className="w-screen h-screen inset-0 absolute flex justify-center items-center bg-white z-[9999]">
         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADoElEQVR4nO2aTWhdRRTHR2tqq1BqLbQqLly0UKFSFFxaWxTTNsmd//85LtJAENq3CKRFly4au+iiLcVdF9KupCsXLlqxBVH8oFqIVho/6KeKpS4K4ibpPXMtI3Pv3HAxpryX3vfevSE/CATmzplzZuacmTnnKbXEIsX1969KyNcEOCjkJ5b8wZJ/CDAjgAj5lwV+EeBjIY/GpHa7dj2mqoDbuvUhr5CQZwT4x5KunT/fR4Bz0miMuNHRFT0xwALjQt4qKGWFPC/AkdS4KNoyE0VPu4GBR1yz2ednP9Z6k2+z5AEBPhMynu2fyXrbGbOyK0YkwKsW+Kkwsz9bcv9CtomLotWi9V5LThbkXUu03tHRVRDyvcKAlxNyp1PqgTLke/+ywPeFFT5e+nZzxqwX4IswwB0LvOP6+x8udZBsnGUW2OcDRDBo0g0OritHOPCEBa6mgoGbVusXVYeRKNrsVzzfaneMeea+BDqtH7fkVHDGC96o0rRtYWwhv8mNWfDKOGOWC/BtEHSpFzHfjYw8WjBmckE+I8DhsJ1+mzbmKdUjXLYrLucBoK3OCblNgLvp2QA8r3qMNBrP5QGg5dAcDrsrYQYOqopgyf2z/tLKFhPgzdBhyvuJqgjOh2byYtjub93742azzwLX09VoNN5QFSPRekfYKX/e8yoj5HCw+KqfAVVBbLjOCLB73o/8TTQYMqYqiiWbwZCz81/gsihlK/NOmE9PMvZPAP//nA+SRuPlYOmnquII8LnXNdY6mi/sjsVab1QVx5IT4dp0VNWZOHuceUNOqzoTG/Ns/iZSdcZl9y+/IrfnNFrglAU+UDXAGbM8BCaZ0yhk4hu906saIMCXQn71fw1/p4ZU+AxpifzG61M2qs4IcDY1BBhSdUaAI8GB3lV1JgawKA4ZZ8wyIQ9Z8qVe67LEosaVlNPtKZKVB85V9bnbEm5i4sE8AeHrFarOJOTOcKbM+ISyqjOWfL+QUVmj6oozZuVs6oU870toXdeh2eyzWr9w34FnemjoSQvcSHOu5Cuq25l44Ov0/kcOllOtIoe7/U5Jgp9a4Pdu1mU6VbMc9hPZOd/JwvPFGHjdh+tS5JYkp2V8ETSUpPPq7pQAe7xjti1rdHRFSIF+lyamB0sqfLb5+PcK/DprEDDerhwBjhX633ADA2tVL/Cr4LPiFjgZkxvmzHZeDc4U/ei//RNguyU/TH/C0YFyd2nh0wI/Fgw5UY7kJVQt+BfFAMnsDE9J5gAAAABJRU5ErkJggg==" alt="loading" className="size-16 animate-spin !duration-500"></img>
      </div>
   )
}
export default FullLoader;