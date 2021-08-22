import React from "react"

export function ListGroup({
    items,
    selectedItem,
    onItemSelect,
    textPropName = "name",
    valuePropName = "_id",
}) {
    return (
        <div className="list-group">
            {items.map((item) => {
                const text = item[textPropName]
                const value = item[valuePropName]

                const isSelected = item === selectedItem
                let classes = "list-group-item list-group-item-action"

                if (isSelected) classes += " active"

                return (
                    <button
                        key={value}
                        className={classes}
                        onClick={() => onItemSelect(item)}
                    >
                        {text}
                    </button>
                )
            })}
        </div>
    )
}
