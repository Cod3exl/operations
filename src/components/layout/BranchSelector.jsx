import { useBranch } from '../../context/BranchContext';

export default function BranchSelector() {
  const { branch, setBranch } = useBranch();

  return (
    <div className="flex items-center bg-[#EDE8DC] rounded-full p-0.5 border border-[#E0D8C8]">
      <button
        onClick={() => setBranch('Alkapuri')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
          branch === 'Alkapuri'
            ? 'bg-[#C9A84C] text-[#2C2C2C]'
            : 'text-[#7A6E5F] hover:text-[#2C2C2C]'
        }`}
      >
        Alkapuri
      </button>
      <button
        onClick={() => setBranch('Bhayli')}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
          branch === 'Bhayli'
            ? 'bg-[#C9A84C] text-[#2C2C2C]'
            : 'text-[#7A6E5F] hover:text-[#2C2C2C]'
        }`}
      >
        Bhayli
      </button>
    </div>
  );
}
