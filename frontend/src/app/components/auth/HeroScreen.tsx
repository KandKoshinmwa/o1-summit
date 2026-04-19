export default function HeroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      onClick={onContinue}
      className="size-full flex items-center justify-center bg-[#F7F9FC] cursor-pointer outline-none border-none"
    >
      <h1 className="text-[64px] font-bold text-[#0B132B] leading-[1.1]">
        Nova
      </h1>
    </button>
  );
}
