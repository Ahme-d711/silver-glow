// "use client"

// import React from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { MapPin, Navigation, Calendar as CalendarIcon, Clock, Info, BookmarkPlus, CheckCircle2 } from "lucide-react"
// import { format } from "date-fns"
// import { toast } from "sonner"
// import { useAddressStore } from "../../packages/store/useAddressStore"
// import { ChooseAddressModal } from "../../packages/components/ChooseAddressModal"
// import { SaveAddressModal } from "../../packages/components/SaveAddressModal"
// import dynamic from "next/dynamic"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { cn } from "@/lib/utils"

// // Dynamically import LocationPickerModal to avoid Leaflet SSR issues
// const LocationPickerModal = dynamic(() => import("../../packages/components/LocationPickerModal"), { 
//   ssr: false 
// })

// const formSchema = z.object({
//   pickup_address: z.string().min(1, "Required"),
//   recipient_address: z.string().min(1, "Required"),
//   recipient_name: z.string().min(1, "Required"),
//   recipient_phone: z.string().min(1, "Required"),
//   order_type: z.string().min(1, "Required"),
//   notes: z.string().optional(),
//   collection_date: z.date({
//     message: "Required",
//   }),
//   collection_time: z.string().min(1, "Required"),
// })

// export function OrderForm({ initialData, onSubmit }: { initialData?: any; onSubmit: (data: any) => void }) {
//   const { addAddress } = useAddressStore()

//   const [mapConfig, setMapConfig] = React.useState<{
//     isOpen: boolean;
//     activeField: "pickup_address" | "recipient_address" | null;
//     title: string;
//   }>({
//     isOpen: false,
//     activeField: null,
//     title: "Pick Location",
//   });

//   const [chooseAddressConfig, setChooseAddressConfig] = React.useState<{
//     isOpen: boolean;
//     activeField: "pickup_address" | "recipient_address" | null;
//   }>({
//     isOpen: false,
//     activeField: null,
//   });

//   const [saveAddressConfig, setSaveAddressConfig] = React.useState<{
//     isOpen: boolean;
//     activeField: "pickup_address" | "recipient_address" | null;
//     value: string;
//   }>({
//     isOpen: false,
//     activeField: null,
//     value: "",
//   });

//   const getInitialValues = (data: any) => {
//     if (!data) return {
//       pickup_address: "",
//       recipient_address: "",
//       recipient_name: "",
//       recipient_phone: "",
//       order_type: "Clothes",
//       notes: "",
//       collection_date: new Date(),
//       collection_time: "11:00",
//     }

//     return {
//       pickup_address: data.pickup_address || "",
//       recipient_address: data.recipient_address || "",
//       recipient_name: data.customer || data.recipient_name || "",
//       recipient_phone: data.recipient_phone || "",
//       order_type: data.order_type || "Clothes",
//       notes: data.notes || "",
//       collection_date: data.date ? new Date(data.date) : new Date(),
//       collection_time: data.collection_time || "11:00",
//     }
//   }

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: getInitialValues(initialData),
//   })

//   // Reset form when initialData changes
//   React.useEffect(() => {
//     if (initialData) {
//       form.reset(getInitialValues(initialData))
//     }
//   }, [initialData, form])

//   const openMapPicker = (field: "pickup_address" | "recipient_address", title: string) => {
//     setMapConfig({
//       isOpen: true,
//       activeField: field,
//       title,
//     });
//   };

//   const openChooseAddress = (field: "pickup_address" | "recipient_address") => {
//     setChooseAddressConfig({
//       isOpen: true,
//       activeField: field,
//     });
//   };

//   const handleLocationSelect = (location: string) => {
//     if (mapConfig.activeField) {
//       form.setValue(mapConfig.activeField, location);
//     }
//   };

//   const handleSavedAddressSelect = (address: string) => {
//     if (chooseAddressConfig.activeField) {
//       form.setValue(chooseAddressConfig.activeField, address);
//     }
//   };

//   const handleSaveAddressClick = (field: "pickup_address" | "recipient_address") => {
//     const value = form.getValues(field);
//     if (!value || value.length < 5) {
//       toast.error("Please enter a valid address first");
//       return;
//     }
//     setSaveAddressConfig({
//       isOpen: true,
//       activeField: field,
//       value: value,
//     });
//   };

//   const handleConfirmSaveAddress = (label: string) => {
//     if (saveAddressConfig.value) {
//       addAddress(saveAddressConfig.value, label);
//       toast.success(`"${label}" saved to your addresses!`, {
//         icon: <CheckCircle2 className="h-4 w-4 text-success" />,
//       });
//     }
//   };

//   return (
//     <>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* Pickup Location */}
//           <div className="space-y-3">
//             <FormLabel className="text-content-primary font-bold text-sm">Pickup Location</FormLabel>
//             <div className="flex gap-4">
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => openChooseAddress("pickup_address")}
//                 className="flex-1 h-12 rounded-xl gap-2 border-divider shadow-none"
//               >
//                 <Navigation className="h-4 w-4 text-primary" />
//                 <span className="text-xs font-bold text-content-secondary">Choose the Address</span>
//               </Button>
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => openMapPicker("pickup_address", "Pickup Location")}
//                 className="flex-1 h-12 rounded-xl gap-2 border-divider shadow-none"
//               >
//                 <MapPin className="h-4 w-4 text-primary" />
//                 <span className="text-xs font-bold text-content-secondary">Open Map</span>
//               </Button>
//             </div>
//             <FormField
//               control={form.control}
//               name="pickup_address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <div className="relative">
//                       <Input {...field} placeholder="Your Address Here" className="h-12 rounded-xl border-divider shadow-none text-sm font-medium pr-12" />
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleSaveAddressClick("pickup_address")}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:bg-primary/10 rounded-lg"
//                         title="Save to my addresses"
//                       >
//                         <BookmarkPlus className="h-5 w-5" />
//                       </Button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Recipients Location */}
//           <div className="space-y-3">
//             <FormLabel className="text-content-primary font-bold text-sm">Recipients Location</FormLabel>
//             <div className="flex gap-4">
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => openChooseAddress("recipient_address")}
//                 className="flex-1 h-12 rounded-xl gap-2 border-divider shadow-none"
//               >
//                 <Navigation className="h-4 w-4 text-primary" />
//                 <span className="text-xs font-bold text-content-secondary">Choose the Address</span>
//               </Button>
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => openMapPicker("recipient_address", "Recipients Location")}
//                 className="flex-1 h-12 rounded-xl gap-2 border-divider shadow-none"
//               >
//                 <MapPin className="h-4 w-4 text-primary" />
//                 <span className="text-xs font-bold text-content-secondary">Open Map</span>
//               </Button>
//             </div>
//             <FormField
//               control={form.control}
//               name="recipient_address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <div className="relative">
//                       <Input {...field} placeholder="Your Address Here" className="h-12 rounded-xl border-divider shadow-none text-sm font-medium pr-12" />
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleSaveAddressClick("recipient_address")}
//                         className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hover:bg-primary/10 rounded-lg"
//                         title="Save to my addresses"
//                       >
//                         <BookmarkPlus className="h-5 w-5" />
//                       </Button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="recipient_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-bold text-sm">Recipients Name</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="h-12 rounded-xl border-divider shadow-none" placeholder="Mahmoud Elboray" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="recipient_phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-bold text-sm">Phone Number</FormLabel>
//                 <FormControl>
//                   <Input {...field} className="h-12 rounded-xl border-divider shadow-none" placeholder="01152136068" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="order_type"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-bold text-sm">Order Type</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger className="h-12 rounded-xl w-full border-divider shadow-none text-content-tertiary">
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent className="rounded-xl" position="popper">
//                     <SelectItem value="Clothes">Clothes</SelectItem>
//                     <SelectItem value="Electronics">Electronics</SelectItem>
//                     <SelectItem value="Food">Food</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="notes"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="font-bold text-sm">Additional Notes</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} className="min-h-[100px] rounded-xl border-divider resize-none shadow-none" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Collection Time Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <FormLabel className="font-bold text-sm">Collection Time</FormLabel>
//               <Info className="h-4 w-4 text-content-tertiary" />
//             </div>
//             <div className="bg-gray-50/50 border border-divider rounded-2xl p-6 flex gap-8 justify-center">
//               <FormField
//                 control={form.control}
//                 name="collection_date"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col items-center gap-2">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "h-12 w-12 rounded-full p-0 bg-[#F3E8FF] border-none hover:bg-[#F3E8FF]/80 shrink-0",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             <CalendarIcon className="h-5 w-5 text-primary" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value}
//                           onSelect={field.onChange}
//                           disabled={(date) =>
//                             date < new Date(new Date().setHours(0, 0, 0, 0))
//                           }
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <div className="flex flex-col items-center">
//                       <span className="text-sm font-bold text-primary">
//                         {field.value ? format(field.value, "dd , MMMM , yyyy") : "Pick a date"}
//                       </span>
//                       <span className="text-[10px] text-content-tertiary font-medium">Date</span>
//                     </div>
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="collection_time"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col items-center gap-2">
//                     <div className="h-12 w-12 rounded-full p-0 bg-[#F3E8FF] flex items-center justify-center shrink-0">
//                       <Clock className="h-5 w-5 text-primary" />
//                     </div>
//                     <div className="flex flex-col items-center">
//                       <FormControl>
//                         <Input 
//                           {...field} 
//                           type="time" 
//                           className="h-7 w-[80px] border-none shadow-none bg-transparent text-sm font-bold text-primary text-center p-0" 
//                         />
//                       </FormControl>
//                       <span className="text-[10px] text-content-tertiary font-medium">Time</span>
//                     </div>
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>

//           <Button type="submit" className="w-full h-12 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 shadow-none">
//             Submit
//           </Button>
//         </form>
//       </Form>

//       <LocationPickerModal
//         isOpen={mapConfig.isOpen}
//         onClose={() => setMapConfig(prev => ({ ...prev, isOpen: false }))}
//         onSelect={handleLocationSelect}
//         title={mapConfig.title}
//       />

//       <ChooseAddressModal
//         isOpen={chooseAddressConfig.isOpen}
//         onClose={() => setChooseAddressConfig(prev => ({ ...prev, isOpen: false }))}
//         onSelect={handleSavedAddressSelect}
//       />

//       <SaveAddressModal
//         isOpen={saveAddressConfig.isOpen}
//         onClose={() => setSaveAddressConfig(prev => ({ ...prev, isOpen: false }))}
//         onSave={handleConfirmSaveAddress}
//         addressValue={saveAddressConfig.value}
//       />
//     </>
//   )
// }
