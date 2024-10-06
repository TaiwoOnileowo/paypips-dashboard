// "use client";
// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import PricingFeatures from "../(website)/PricingFeatures";
// import { DialogClose } from "@radix-ui/react-dialog";

// import { useEffect, useState } from "react";
// const Pricing = ({
//   price,
// }: {
//   price: {
//     name: string;
//     amount: string;
//   };
// }) => {
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [open, setOpen] = useState(false);
//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const isDesktop = screenWidth > 768;

//   return (
//     <>
//       {isDesktop ? (
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <button className="w-[350px]">Get Started</button>
//           </DialogTrigger>

//           <DialogContent
//             className={`flex   flex-col text-medium-gray p-2 xs:p-4 py-6 md:p-6 w-[300px] min-h-[440px] md:w-[400px] transition-all ease col-span-1 cursor-default rounded-[15px] gap-2 light-blue-gradient`}
//           >
//             <DialogHeader>
//               <DialogTitle>
//                 <h1 className=" text-2xl font-bold">{price.name}</h1>
//               </DialogTitle>
//             </DialogHeader>
//             <DialogDescription>
//               <h1 className="text-2xl md:text-4xl text-blue-accent  font-bold">
//                 {price.amount}
//                 {idx !== 0 && (
//                   <span className="text-sm text-medium-gray">/month</span>
//                 )}
//               </h1>
//               <PricingFeatures price={price} />
//             </DialogDescription>
//             <DialogFooter className="flex justify-center">
//               <DialogClose>
//                 <button className="w-[200px]">Proceed to Bot</button>
//               </DialogClose>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       ) : (
//         <Drawer open={open} onOpenChange={setOpen}>
//           <DrawerTrigger asChild>
//             <div className="flex items-end h-full justify-center ">
//               <button className="w-[350px]">Get Started</button>
//             </div>
//           </DrawerTrigger>

//           <DrawerContent className="flex flex-col items-center">
//             <DrawerHeader>
//               <DrawerTitle>
//                 <h1 className=" text-2xl font-bold">{price.name}</h1>
//               </DrawerTitle>
//             </DrawerHeader>
//             <DrawerDescription>
//               <h1 className="text-2xl text-center md:text-4xl text-blue-accent  font-bold">
//                 {price.amount}
//                 {idx !== 0 && (
//                   <span className="text-sm text-medium-gray">/month</span>
//                 )}
//               </h1>
//               <PricingFeatures price={price} />
//             </DrawerDescription>

//             <DrawerFooter className="pt-2 flex justify-center items-center">
//               <DrawerClose>
//                 <button className="w-[200px]">Proceed to Bot</button>
//               </DrawerClose>
//             </DrawerFooter>
//           </DrawerContent>
//         </Drawer>
//       )}
//     </>
//   );
// };

// export default Pricing;
