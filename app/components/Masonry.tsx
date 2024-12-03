import React, { useEffect, useRef, useState } from "react"

interface MasonryProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  columnWidth?: number
  gap?: number
}

export function Masonry<T>({
  items,
  renderItem,
  columnWidth = 300,
  gap = 16,
}: MasonryProps<T>) {
  const [columns, setColumns] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const newColumns = Math.max(
          1,
          Math.floor(containerWidth / (columnWidth + gap))
        )
        setColumns(newColumns)
      }
    }
    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [gap, columnWidth])

  const columnItems = items.reduce(
    (acc, item, index) => {
      const columnIndex = index % columns
      if (!acc[columnIndex]) {
        acc[columnIndex] = []
      }
      acc[columnIndex].push(item)
      return acc
    },
    {} as Record<number, T[]>
  )

  return (
    <div
      ref={containerRef}
      className="flex justify-center gap-4"
      style={{ gap: `${gap}px` }}
    >
      {Object.values(columnItems).map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col"
          style={{ width: columnWidth }}
        >
          {column.map((item, itemIndex) => (
            <div key={itemIndex} className="break-inside-avoid">
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
