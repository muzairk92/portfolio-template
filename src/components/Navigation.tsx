import ThemeToggle from "./ThemeToggle";
import ScheduleButton from "./ScheduleButton";

const navItems = ["Home", "About", "Work", "Case Studies", "Blogs"];

const Navigation = () => {
  return (
    <header className="flex flex-col gap-4 border-b border-faint px-6 py-6 md:flex-row md:items-center md:justify-between lg:px-12">
      <div className="flex items-center justify-between gap-4">
        <span className="font-bold tracking-wide">M.U.K</span>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <ScheduleButton compact />
        </div>
      </div>

      <nav className="flex flex-wrap gap-4 text-xs font-medium uppercase tracking-[0.35em] text-muted">
        {navItems.map((item) => (
          <a key={item} className="hover:text-ink focus-visible:outline-none" href="#">
            {item}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-4 md:flex">
        <ThemeToggle />
        <ScheduleButton />
      </div>
    </header>
  );
};

export default Navigation;
