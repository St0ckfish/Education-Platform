"use client";
import FeaturesList from "@/components/ExpandableList";
import Cookies from "js-cookie";
import { useGetSchoolPermissionsQuery } from "./api/schoolPermissionsApi";

const Features = () => {
  //   {
  //     "success": true,
  //     "message": "Retrieved Successfully",
  //     "data": [
  //         {
  //             "id": 1,
  //             "name": "ADMIN",
  //             "cost": 5
  //         },
  //         {
  //             "id": 2,
  //             "name": "USER_MANAGEMENT",
  //             "cost": 5
  //         },
  //         {
  //             "id": 3,
  //             "name": "FINANCIAL_MANAGEMENT",
  //             "cost": 5
  //         },
  //         {
  //             "id": 4,
  //             "name": "ORGANIZATION_MANAGEMENT",
  //             "cost": 5
  //         },
  //         {
  //             "id": 5,
  //             "name": "DOCUMENT_MANAGEMENT",
  //             "cost": 5
  //         },
  //         {
  //             "id": 6,
  //             "name": "ARCHIVE",
  //             "cost": 5
  //         },
  //         {
  //             "id": 7,
  //             "name": "COURSE_AND_RESOURCES_MANAGEMENT",
  //             "cost": 5
  //         },
  //         {
  //             "id": 8,
  //             "name": "EDUCATIONAL_AFFAIRS",
  //             "cost": 5
  //         },
  //         {
  //             "id": 9,
  //             "name": "INFRASTRUCTURE",
  //             "cost": 5
  //         },
  //         {
  //             "id": 10,
  //             "name": "ATTENDANCE",
  //             "cost": 5
  //         },
  //         {
  //             "id": 11,
  //             "name": "LEAVE_BALANCE",
  //             "cost": 5
  //         },
  //         {
  //             "id": 12,
  //             "name": "POST_MANAGEMENT",
  //             "cost": 5
  //         },
  //         {
  //             "id": 13,
  //             "name": "NOTIFIES",
  //             "cost": 5
  //         },
  //         {
  //             "id": 14,
  //             "name": "REPORTED_CHATS",
  //             "cost": 5
  //         }
  //     ]
  // }

  const token = Cookies.get("token") || "";
  const { isSuccess, data } = useGetSchoolPermissionsQuery(token);
  console.log(isSuccess, data);
  const features = [
    {
      Academic: {
        name: "Academic",
        children: {
          0: { label: "Curriculum Management", price: 10 },
          1: { label: "Educational Affairs", price: 15 },
          2: { label: "Course and Resource Management", price: 15 },
        },
      },
    },
    {
      Operations: {
        name: "Operations",
        children: {
          0: { label: "Infrastructure", price: 20 },
          1: { label: "Attendance/leave", price: 25 },
        },
      },
    },
    {
      Communication: {
        name: "Communication",
        children: {
          0: { label: "Posts Management", price: 20 },
          1: { label: "Notifies", price: 35 },
          2: { label: "Reported Chats", price: 40 },
        },
      },
    },
  ];

  return (
    <>
      <div className="mx-3 mt-[70px] lg:ml-[270px]">
        <div className="rounded-xl pb-5">
          <div className="flex justify-between rounded-t-xl bg-blue-100 px-10 py-4 text-[18px] font-semibold">
            <p>Features</p>
            <p>Applicable For</p>
          </div>
          <div className="flex bg-white justify-between px-10 py-8 max-[640px]:grid max-[640px]:justify-center max-[640px]:gap-10">
            <FeaturesList features={features} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
