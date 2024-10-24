'use client';
import { useUpdateStatusOfSchoolPlanMutation } from '@/app/school-plans/api/SchoolPlans';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const ExpandableList = ({ title, items, onUpdateCheckedItems }: { title: string; items: any[]; onUpdateCheckedItems: (selectedItems: any[], isAdding: boolean) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // y
  
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(
    items.reduce((acc, _item, index) => {
      acc[index] = false;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChildCheckboxChange = (key: number, event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const newCheckedState = !checkedItems[key];
    const updatedState = {
      ...checkedItems,
      [key]: newCheckedState,
    };

    setCheckedItems(updatedState);
    const selectedItems = getSelectedItems(updatedState);

    // Update based on whether the item is checked or unchecked
    onUpdateCheckedItems([items[key]], newCheckedState);
  };

  // Function to get the selected items based on checked status
  const getSelectedItems = (checkedState: Record<number, boolean>) => {
    return items.filter((_item, index) => checkedState[index]);
  };

  const totalChecked = getSelectedItems(checkedItems).length;

  return (
    <div className="my-4">
      <div className="flex items-center cursor-pointer ml-5">
        <div className="flex items-center" onClick={toggleExpand} style={{ userSelect: 'none' }}>
          {isExpanded ? <FiChevronDown size={25} className="mr-2" /> : <FiChevronRight size={25} className="mr-2" />}
          <span className="text-lg font-semibold" style={{ userSelect: 'none' }}>{title}</span>
        </div>
      </div>

      {isExpanded && (
        <ul className="ml-6 mt-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm flex items-center mb-2">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={checkedItems[index]}
                onChange={(event) => handleChildCheckboxChange(index, event)}
                className="mr-2"
              />
              <label htmlFor={`checkbox-${index}`} style={{ userSelect: 'none' }} className="flex justify-between w-full">
                {item.name} - ${item.cost}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main component to display all feature categories and their permissions
const FeaturesList = ({ features , token}: { features: any[], token: string }) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  // handleSender(10, token, )

  // const handleSender = useUpdateStatusOfSchoolPlanMutation(10, token, true, body);
  // استدعاء الـ mutation
  // const handleUpdateStatus = async () => {
  //     const schoolPlanId = 10;
  //     const status = true; 
  //     c
  
  //     try {
  //         const result = await updateStatusOfSchoolPlan({
  //             token,
  //             schoolPlanId,
  //             status,
  //             body
  //         });
  //         console.log(result); // معالجة النتيجة
  //     } catch (error) {
  //         console.error("Error updating status:", error);
  //     }
  // };
  
  const updateCheckedItems = (newSelectedItems: any[], isAdding: boolean) => {
    setSelectedItems((prevItems) => {
      if (isAdding) {
        // Add new selected items and keep the previously selected items
        return [...prevItems, ...newSelectedItems.filter((item) => !prevItems.includes(item))];
      } else {
        // When the category is unchecked, remove all items from the selection
        return prevItems.filter((item) => !newSelectedItems.includes(item));
      }
    });
  };

  // Function to calculate the total cost of selected items
  const calculateTotalCost = () => {
    return selectedItems.reduce((total, item) => total + item.cost, 0);
  };






  const [updateStatusOfSchoolPlan, { data , originalArgs , error}] = useUpdateStatusOfSchoolPlanMutation();
  console.log('data: ', data);
  console.log('originalArgs: ', originalArgs);
  console.log('error: ', error);


  const handleSend = async () => {
      const objectReq = {
          "id": 10,
          "cost": 200,
          "name": "School Plan 10",
          "daysCount": 2,
          "permissions": {
              "id": 10,
              "cost": 6,
              "name": "ATTENDANCE",
          }  
      }
      updateStatusOfSchoolPlan({ token, schoolPlanId: 10, status: false, body: objectReq}).unwrap()
  }

  const handleCancel = () => {
    // TODO Handle cancel logic here
    console.log("Cancelled");
  };

  return (
    <div>
      {features.map((feature, index) => {
        const { category, Permissions } = feature;
        return (
          <ExpandableList 
            key={index} 
            title={category} 
            items={Permissions} 
            onUpdateCheckedItems={updateCheckedItems} 
          />
        );
      })}
      <div className="mt-4 text-lg font-bold">Total Cost: ${calculateTotalCost()}</div>

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
