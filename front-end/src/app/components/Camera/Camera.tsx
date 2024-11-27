"use client"
import Image from "next/image"
import React from "react"
import CancelIcon from "@/app/images/cancel-icon-white.png"
import { HeaderContext, IHeaderContext } from "../HeaderProvider/HeaderProvider"
interface ICameraStream {
   stream: MediaStream
   streamWidth: number
   streamHeight: number
}

const Camera: React.FC = () => {
   const [mediaStream, setMediaStream] = React.useState<ICameraStream | null>(null)
   const [photo, setPhoto] = React.useState<string | null>(null)
   const cameraRef = React.useRef<HTMLVideoElement>(null)
   const canvasRef = React.useRef<HTMLCanvasElement>(null)
   const { image, setImage } = React.useContext(HeaderContext) as IHeaderContext

   React.useEffect(() => {
      startCamera()

   }, [])
   console.log()

   const getCameraWidth = (windowWidth: number): number => {
      if (windowWidth > 699) {
         return 640
      } else {
         return windowWidth - 50
      }
   }
   const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
         video: {
            facingMode: "user", // Request the front camera (selfie camera)
            width: getCameraWidth(window.innerWidth)
            // height: 480
         },
      });
      if (cameraRef.current) {
         cameraRef.current.srcObject = stream;
      }
      const { width, height } = stream.getVideoTracks()[0].getSettings()
      setMediaStream({
         stream,
         streamWidth: width!,
         streamHeight: height!
      })
   }
   const captureImage = () => {
      if (cameraRef.current && canvasRef.current) {
         const video = cameraRef.current;
         const canvas = canvasRef.current;
         const context = canvas.getContext("2d");

         // Set canvas dimensions to match video stream
         if (context && video.videoWidth && video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame onto canvas
            context.drawImage(video, 0, 0, mediaStream?.streamWidth!, mediaStream?.streamHeight!);

            // Get image data URL from canvas
            const imageDataUrl = canvas.toDataURL("image/jpeg");

            // Set the captured image
            setPhoto(imageDataUrl);

            // Stop the webcam
            // stopWebcam();

            // You can do something with the captured image here, like save it to state or send it to a server
         }
      }
   };

   const stopWebcam = () => {
      if (mediaStream) {
         mediaStream.stream.getTracks().forEach((track) => {
            track.stop();
         });
         setMediaStream(null);
      }
   };

   return (
      <>
         <div
            className="relative mx-auto"
            style={{ width: `${mediaStream?.streamWidth}px` }}
         >
            <video width={mediaStream?.streamWidth} className={`max-w-[${mediaStream?.streamWidth}px] h-full`} ref={cameraRef} autoPlay muted />

            <canvas ref={canvasRef} width={mediaStream?.streamWidth} height={mediaStream?.streamHeight} className={`absolute left-0 top-0 ${photo === null ? "hidden" : ""}`}
            />
            {
               photo === null ?
                  <button
                     className="px-2 py-3 bg-yellowcus absolute mx-auto left-0 right-0 rounded-md text-center w-24 bottom-2" onClick={captureImage}
                  >Photo</button>
                  : null
            }

            {
               photo !== null ?
                  <>
                     <button
                        className="h-[35px] w-[35px] bg-yellowcus rounded-md p-1 absolute top-1 right-1"
                        onClick={() => { setPhoto(null) }}
                     >
                        <Image src={CancelIcon.src} width={30} height={30} alt="cansel icon" />
                     </button>
                     <button
                        className="h-[55px] w-[55px] bg-yellowcus rounded-full p-1 absolute mx-auto left-0 right-0 bottom-2 "
                        onClick={() => {
                           setImage(photo)
                           // setPhoto(null)
                        }}
                     >
                        <Image
                           src={CancelIcon.src}
                           width={30}
                           height={30}
                           alt="cansel icon"
                           className="rotate-45 m-auto"
                        />
                     </button>
                  </>

                  : null
            }

         </div>
         {/* {
            photo ?
               <Image src={photo} alt="photo" width={400} height={200} />
               : null
         } */}
      </>
   )
}
export default Camera