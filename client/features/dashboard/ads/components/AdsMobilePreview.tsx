"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Image from "next/image"
import { Ad } from "./AdCard"
import { cn } from "@/lib/utils"

interface SortableAdItemProps {
  ad: Ad
  isActive?: boolean
  index: number
}

function SortableAdItem({ ad, index }: SortableAdItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ad.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : index === 1 ? 20 : 10,
  }

  const isCenter = index === 1
  const isLeft = index === 0
  const isRight = index === 2

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative rounded-xl overflow-hidden cursor-grab active:cursor-grabbing shrink-0 transition-all duration-500 ease-out",
        isCenter 
          ? "h-29 w-full max-w-[328px] shadow-lg ring-1 ring-black/5 z-20 scale-110" 
          : "h-24 w-full max-w-[280px] z-10",
        isLeft && "-mr-12",
        isRight && "-ml-12",
        isDragging && "shadow-xl opacity-90 scale-105 z-50"
      )}
    >
      <Image
        src={ad.image}
        alt={ad.title}
        fill
        priority
        className="object-cover pointer-events-none"
      />
      <div className={cn(
        "absolute inset-0 transition-colors duration-300",
        isCenter ? "bg-transparent" : "bg-black/10"
      )} />
    </div>
  )
}

interface AdsMobilePreviewProps {
  ads: Ad[]
  setAds: (ads: Ad[]) => void
}

export function AdsMobilePreview({ ads, setAds }: AdsMobilePreviewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = ads.findIndex((ad) => ad.id === active.id)
      const newIndex = ads.findIndex((ad) => ad.id === over.id)
      setAds(arrayMove(ads, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full py-12 flex justify-center items-center overflow-hidden">
        <div className="flex items-center justify-center gap-0 w-full max-w-5xl px-4">
          <SortableContext items={ads} strategy={horizontalListSortingStrategy}>
            {ads.map((ad, index) => (
              <SortableAdItem key={ad.id} ad={ad} index={index} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  )
}
