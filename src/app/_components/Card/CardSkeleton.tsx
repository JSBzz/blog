export default function CardSkeleton() {
  return (
    <div
      role="status"
      className="space-y-4 animate-pulse md:space-y-0 md:space-x-4 rtl:space-x-reverse md:flex md:items-center sm:w-[410px] md:w-[600px] w-[300px] mb-8 m-auto"
    >
      <div className="flex items-center justify-center  h-[247px] bg-gray-300 rounded dark:bg-gray-700 md:min-w-[247px] md:h-[247px] ">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="w-full h-[204px]">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mt-2 m-2"></div>
        <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] mb-2.5 pl-4  md:pl-0"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 "></div>
        <div className="max-w-[420px] sm:max-w-[420px]">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[180px] mb-2.5"></div>
        </div>
        <div className="flex">
          <div className="h-[32px] w-[58px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 mr-2 "></div>
          <div className="h-[32px] w-[58px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 mr-2"></div>
          <div className="h-[32px] w-[58px] bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5 mr-2"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[420px] mb-2.5 w-24"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
