interface HeaderProps {
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdd }) => (
  <div className="flex items-center justify-between mb-6">
    <button
      className="flex items-center px-4 py-2 text-blue-500 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50"
      onClick={onAdd}
    >
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
);

export default Header;
