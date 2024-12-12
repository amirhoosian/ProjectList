import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

const GET_Household = gql`
  query GetHousehold($offset: Int!, $limit: Int!) {
    household(offset: $offset, limit: $limit) {
      name
      id
      status
      severity
    }
  }
`;

const Household = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // تعداد آیتم‌ها در هر صفحه
  const offset = (page - 1) * limit;

  const { loading, error, data } = useQuery(GET_Household, {
    variables: { offset, limit },
  });

  if (loading) return <p className="mt-4 text-center">در حال بارگذاری...</p>;
  if (error) return <p className="mt-4 text-center">خطا: {error.message}</p>;

  return (
    <div className="container p-4 mx-auto mt-10 rtl">
      {/* عنوان و دکمه ایجاد پروژه */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center px-4 py-2 text-blue-500 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50">
          <span>ایجاد خانوار جدید</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-right">لیست خانوار ها</h1>
      </div>

      {/* جدول پروژه‌ها */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg rounded-b">
        <table className="w-full text-right border-collapse table-auto dir-rtl">
          <thead>
            <tr className="text-gray-700">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                ردیف
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                نام
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                وضعیت اطلاعات
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                وضعیت نیازمندی
              </th>
            </tr>
          </thead>

          <tbody>
            {data.household.slice(0, 3).map(
              (
                household: {
                  name: string;
                  id: number;
                  status: string;
                  severity: string;
                },
                index: number
              ) => (
                <tr
                  key={household.id}
                  className={`${
                    index % 2 !== 0 ? "bg-white" : "bg-gray-50"
                  } text-gray-800 text-right`}
                >
                  {/* ستون اعداد */}
                  <td className="px-6 py-4 text-sm">{index + 1}</td>

                  {/* ستون نام */}
                  <td className="px-6 py-4 text-sm font-medium">
                    {household.name}
                  </td>

                  {/* ستون وضعیت */}
                  <td className="px-6 py-4 text-sm">
                    {household.status === "تکمیل شده" ? (
                      <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                        تکمیل شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                        نامشخص
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {household.severity === "عادی" ? (
                      <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                        عادی
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                        اظطراری
                      </span>
                    )}
                  </td>

                  {/* ستون عملیات */}
                  <td className="px-6 py-4 text-center">
                    <button className="text-gray-500 hover:text-gray-700">
                      ...
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* دکمه‌های صفحه‌بندی */}
      <div className="flex items-center justify-between border border-gray-200 rounded-lg rounded-t">
        <div className="flex items-center mt-4 mb-4">
          <button
            className="flex w-32 py-2 ml-6 text-gray-700 rounded tems-center f border-btn hover:bg-gray-300"
            onClick={() => setPage((prev) => prev + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>صفحه بعد</span>
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-300 border-btn"
            } rounded`}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <span>صفحه قبل</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <span className="text-gray-600">
          صفحه {page} از {Math.ceil(100 / limit)}{" "}
          {/* فرض شده 100 آیتم وجود دارد */}
        </span>
      </div>
    </div>
  );
};

export default Household;
