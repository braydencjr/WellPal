export interface ReminderItem {
  title: string
  description?: string
  dateISO: string   // always UTC YYYY-MM-DD
  checked?: boolean
}