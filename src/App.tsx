import "./App.css";
import { useEffect, useState } from "react";
import ReminderList from "./component/ReminderList";
import Reminder from "./model/reminder";
import reminderService from "./services/reminder";
import NewReminder from "./component/NewReminder";

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const loadReminder = async () => {
    const data = await reminderService.getReminders();
    setReminders(data);
  };

  const removeReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const addReminder = async (title: string) => {
    const data = await reminderService.addReminder(title);
    setReminders([data, ...reminders]);
  };

  useEffect(() => {
    loadReminder();
  }, []);

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />
    </div>
  );
}

export default App;
