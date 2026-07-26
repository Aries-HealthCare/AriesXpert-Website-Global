type Props = {
  slots: string[];
  selected: string | null;
  onSelect: (time: string) => void;
};

export function TimeSlots({ slots, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      {slots.map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className={`rounded-lg border px-4 py-3 text-sm font-medium transition
            ${
              selected === time
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
