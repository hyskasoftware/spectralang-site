export function AsciiBanner() {
  return (
    <pre
      aria-hidden="true"
      className="select-none whitespace-pre text-center leading-[1.15] font-bold text-[8px] text-purple-bright glow-purple sm:text-[10px] md:text-[12px] lg:text-[14px]"
    >
{` ____  ____  _____ ____ _____ ____      _    _        _    _   _  ____ 
/ ___||  _ \\| ____/ ___|_   _|  _ \\    / \\  | |      / \\  | \\ | |/ ___|
\\___ \\| |_) |  _|| |     | | | |_) |  / _ \\ | |     / _ \\ |  \\| | |  _ 
 ___) |  __/| |__| |___  | | |  _ <  / ___ \\| |___ / ___ \\| |\\  | |_| |
|____/|_|   |_____\\____| |_| |_| \\_\\/_/   \\_\\_____/_/   \\_\\_| \\_|\\____|`}
    </pre>
  );
}
