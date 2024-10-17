'use client';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

// Component to display an expandable list
const ExpandableList = ({ title, items, onUpdateTotal }: { title: string; items: Record<number, { label: string; price: number; children?: Record<number, { label: string; price: number }> }>; onUpdateTotal: (price: number) => void }) => {
  // State to track if the list is expanded
  const [isExpanded, setIsExpanded] = useState(false);
  // State to track the main checkbox status
  const [isChecked, setIsChecked] = useState(false);
  // State to track the checked status of individual items
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(
    Object.keys(items).reduce((acc, key) => {
      acc[Number(key)] = false; // Initialize each item as unchecked
      return acc;
    }, {} as Record<number, boolean>)
  );

  // Toggle the expansion of the list
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle changes to the main checkbox
  const handleMainCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    const newCheckedStatus = !isChecked; // Invert the current checked status
    setIsChecked(newCheckedStatus); // Update main checkbox state

    // Update checked status of all items based on main checkbox
    const updatedItems = Object.keys(items).reduce((acc, key) => {
      acc[Number(key)] = newCheckedStatus; // Set all to new checked status
      return acc;
    }, {} as Record<number, boolean>);
    
    setCheckedItems(updatedItems); // Update checkedItems state
    onUpdateTotal(calculateTotalPrice(updatedItems)); // Update total price based on checked items
  };

  // Handle changes to individual child checkboxes
  const handleChildCheckboxChange = (key: number, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent event from bubbling up
    const newCheckedState = !checkedItems[key]; // Invert the checked state for the specific item

    // Update the checked status for the specific item
    setCheckedItems((prevState) => {
      const updatedState = {
        ...prevState,
        [key]: newCheckedState, // Update the state for the item
      };
      // Update the total price based on the updated checked state
      onUpdateTotal(calculateTotalPrice(updatedState));
      return updatedState;
    });
  };

  // Function to calculate the total price of checked items
  const calculateTotalPrice = (checkedState: Record<number, boolean>) => {
    return Object.entries(items).reduce((total, [key, { price, children }]) => {
      // If the item is checked, add its price to the total
      if (checkedState[Number(key)]) {
        total += price;
      }
      // Add prices from child items if they exist
      if (children) {
        total += Object.entries(children).reduce((childTotal, [childKey, { price: childPrice }]) => {
          return childTotal + (checkedState[Number(childKey)] ? childPrice : 0);
        }, 0);
      }
      return total; // Return the accumulated total
    }, 0);
  };

  // Function to calculate the total price of all items without checking
  const calculateTotalPriceWithoutCheck = () => {
    return Object.entries(items).reduce((total, [, { price, children }]) => {
      total += price; // Add the price of the item
      // Add prices from child items if they exist
      if (children) {
        total += Object.entries(children).reduce((childTotal, [, { price: childPrice }]) => {
          return childTotal + childPrice; // Add the price of each child
        }, 0);
      }
      return total; // Return the accumulated total
    }, 0);
  };

  // Calculate the total price for checked items and for all items
  const totalPrice = calculateTotalPrice(checkedItems);
  const totalPriceWithoutCheck = calculateTotalPriceWithoutCheck();

  return (
    <div className="my-4">
      <div className="flex items-center cursor-pointer">
        {/* Main checkbox for the list */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleMainCheckboxChange}
          className="mr-2"
        />
        <div className="flex items-center" onClick={toggleExpand} style={{ userSelect: 'none' }}>
          {/* Icon for expanding or collapsing the list */}
          {isExpanded ? <FiChevronDown size={25} className="mr-2" /> : <FiChevronRight size={25} className="mr-2" />}
          {/* Title of the expandable list with total price */}
          <span className="text-lg font-semibold" style={{ userSelect: 'none' }}>{title} - ${totalPriceWithoutCheck}</span>
        </div>
      </div>

      {isExpanded && (
        <ul className="ml-6 mt-2">
          {Object.entries(items).map(([key, { label, price, children }]) => (
            <li key={key} className="text-sm flex flex-col mb-2">
              <div className="flex items-center">
                {/* Checkbox for each item */}
                <input
                  type="checkbox"
                  id={`checkbox-${key}`}
                  checked={checkedItems[Number(key)]}
                  onChange={(event) => handleChildCheckboxChange(Number(key), event)}
                  className="mr-2"
                />
                <label htmlFor={`checkbox-${key}`} style={{ userSelect: 'none' }} className="flex justify-between w-full">
                  {/* Display item label and price */}
                  {label}
                  <span className='ml-5'>${price}</span>
                </label>
              </div>
      
              {/* Render child items if they exist */}
              {children && Object.keys(children).length > 0 && (
                <ul className="ml-4 mt-1">
                  {Object.entries(children).map(([childKey, { label: childLabel, price: childPrice }]) => (
                    <li key={childKey} className="text-sm flex items-center mb-2">
                      {/* Checkbox for each child item */}
                      <input
                        type="checkbox"
                        id={`child-checkbox-${childKey}`}
                        checked={checkedItems[Number(childKey)]}
                        onChange={(event) => handleChildCheckboxChange(Number(childKey), event)}
                        className="mr-2"
                      />
                      <label htmlFor={`child-checkbox-${childKey}`} style={{ userSelect: 'none' }} className="flex justify-between w-full">
                        {/* Display child item label and price */}
                        {childLabel}
                        <span>${childPrice}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main component to display all sections
const FeaturesList = ({ features }: { features: any[] }) => {
  const [total, setTotal] = useState(0); // State to track the total price

  // Function to update the total price based on selected items
  const updateTotal = (price: number) => {
    setTotal(price); // Update the total price
  };

  return (
    <div>
      {/* Render each feature in the features list */}
      {features.map((feature, index) => {
        const featureKey = Object.keys(feature)[0]; // Get the feature key
        const { name, children } = feature[featureKey]; // Destructure the name and children from the feature
        return <ExpandableList key={index} title={name} items={children} onUpdateTotal={updateTotal} />;
      })}
      {/* Display the total price */}
      <div className="mt-4 text-lg font-bold">Total: ${total}</div>
    </div>
  );
};

export default FeaturesList;
