import BranchSelector from './BranchSelector';

export default function Header({ title }) {
  return (
    <header className="sticky top-0 z-30 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#E0D8C8] px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-heading font-semibold text-[#2C2C2C]">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-3 py-1.5">
          <span className="text-xs font-medium text-[#C9A84C]">22KT</span>
          <span className="text-xs font-code font-semibold text-[#2C2C2C]">₹7,150/g</span>
        </div>

        <BranchSelector />
      </div>
    </header>
  );
}
