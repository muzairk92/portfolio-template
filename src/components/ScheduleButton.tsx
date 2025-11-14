interface ScheduleButtonProps {
  compact?: boolean;
}

const ScheduleButton = ({ compact = false }: ScheduleButtonProps) => {
  return (
    <a
      href="#"
      className={`btn-primary ${compact ? "px-4 py-2 text-xs" : "px-5 py-3 text-sm"}`.trim()}
      aria-label="Schedule a call"
    >
      Schedule a call
    </a>
  );
};

export default ScheduleButton;
