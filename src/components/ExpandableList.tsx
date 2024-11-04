'use client';
import { useSetSchoolPermissionByIdMutation } from '@/app/manage-school/features/[id]/api/schoolPermissions';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Define types for individual permission items
interface Permission {
  name: string;
  cost: number;
}

// Define props for the ExpandableList component
interface ExpandableListProps {
  title: string;
  items: Permission[];
  onUpdateCheckedItems: (selectedItems: Permission[], isAdding: boolean) => void;
}

// Component for displaying a list of items that can be expanded or collapsed
const ExpandableList: React.FC<ExpandableListProps> = ({ title, items, onUpdateCheckedItems }) => {
  // State to manage the expansion of the list
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  // State to track which items are checked
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(
    items.reduce((acc, _item, index) => {
      acc[index] = false; // Initialize all items as unchecked
      return acc;
    }, {} as Record<number, boolean>)
  );

  // Toggle the expansion state of the list
  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  // Handle checkbox changes for child items
  const handleChildCheckboxChange = (key: number) => {
    const newCheckedState = !checkedItems[key]; // Determine the new checked state
    const updatedState = {
      ...checkedItems,
      [key]: newCheckedState, // Update the checked state for the specific item
    };

    setCheckedItems(updatedState);
    const selectedItems = getSelectedItems(updatedState); // Get currently selected items
    // Call the parent function to update the selected items
    onUpdateCheckedItems([items[key]], newCheckedState);
  };

  // Retrieve the list of selected items based on their checked state
  const getSelectedItems = (checkedState: Record<number, boolean>): Permission[] => {
    return items.filter((_item, index) => checkedState[index]);
  };

  return (
    <div className="my-4">
      <div className="flex items-center cursor-pointer ml-5" onClick={toggleExpand} style={{ userSelect: 'none' }}>
        {isExpanded ? <FiChevronDown size={25} className="mr-2" /> : <FiChevronRight size={25} className="mr-2" />}
        <span className="text-lg font-semibold">{title}</span>
      </div>

      {isExpanded && (
        <ul className="ml-6 mt-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm flex items-center mb-2">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={checkedItems[index]} // Bind checkbox to checked state
                onChange={() => handleChildCheckboxChange(index)} // Handle checkbox change
                className="mr-2"
              />
              <label htmlFor={`checkbox-${index}`} className="flex justify-between w-full" style={{ userSelect: 'none' }}>
                {item.name} - ${item.cost} {/* Display item name and cost */}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Define props for the FeaturesList component
interface FeaturesListProps {
  features: { category: string; Permissions: Permission[] }[]; // Structure for feature categories
  token: string;
}

// Main component to display all feature categories and their permissions
const FeaturesList: React.FC<FeaturesListProps> = ({ features, token }) => {
  const router = useRouter();
  const params = useParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Update the list of selected items based on user interaction
  const updateCheckedItems = (newSelectedItems: Permission[], isAdding: boolean) => {
    setSelectedItems((prevItems) => {
      const itemNames = newSelectedItems.map((item) => item.name); // Extract only names
      const updatedItems = isAdding
        ? [...prevItems, ...itemNames.filter((name) => !prevItems.includes(name))] // Add new items
        : prevItems.filter((name) => !itemNames.includes(name)); // Remove unchecked items
      return updatedItems; // Update state with the new selection
    });
  };

  // Calculate the total cost of selected items
  const calculateTotalCost = () => {
    return selectedItems.reduce((total, itemName) => {
      // Find the item in the feature list based on its name
      const item = features.flatMap(feature => feature.Permissions).find(permission => permission.name === itemName);
      return total + (item ? item.cost : 0); // Sum the costs
    }, 0);
  };

  // Mutation hook to update school permissions
  const [setSchoolPermissionById] = useSetSchoolPermissionByIdMutation(); 
  
  // Handle the "Save" button click to send selected permissions
  const handleSend = async () => {
    const body = { permissions: selectedItems }; // Prepare body for the API call

    try {
      // Call the mutation to update permissions
      await setSchoolPermissionById({ token, id: params.id, body }).unwrap();
      toast.success("Permissions updated successfully!"); // Show success message
      router.push(`/manage-school`); // Redirect after successful update
    } catch (err) {
      toast.error("Failed to update permissions"); // Show error message
    }
  };

  // Handle the "Cancel" button click
  const handleCancel = () => {
    console.log("Cancelled"); // Placeholder for cancel functionality
  };

  return (
    <div>
      {/* Render expandable lists for each feature category */}
      {features.map((feature, index) => (
        <ExpandableList 
          key={index} 
          title={feature.category} 
          items={feature.Permissions} 
          onUpdateCheckedItems={updateCheckedItems} 
        />
      ))}
      <div className="mt-4 text-lg font-bold">Total Cost: ${calculateTotalCost()}</div>

      {/* Buttons for saving or cancelling the changes */}
      <div className="mt-4 flex justify-center space-x-12">
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FeaturesList;
