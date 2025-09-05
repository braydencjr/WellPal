// src/lib/emergency-contact-store.ts
import { apiClient } from "./api-client"; // your existing ApiClient

export interface Contact {
  id?: string; // optional if using local storage
  name: string;
  phone: string;
  type?: "university" | "private" | "government";
}

const LOCAL_STORAGE_KEY = "emergencyContacts";

class EmergencyContactStore {
  private contacts: Contact[] = [];

  constructor() {
    // Load from localStorage on initialization
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      this.contacts = stored ? JSON.parse(stored) : [];
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.contacts));
    }
  }

  // Get all contacts
  async getContacts(): Promise<Contact[]> {
    // Later, switch to API call:
    // return apiClient.getEmergencyContacts();

    return this.contacts;
  }

  // Add a new contact
  async addContact(contact: Contact) {
    // For local storage
    this.contacts.push(contact);
    this.save();

    // Later, switch to API call:
    // return apiClient.addEmergencyContact(contact);
  }

  // Remove a contact by name or ID
  async removeContact(identifier: string) {
    this.contacts = this.contacts.filter(
      c => c.name !== identifier && c.id !== identifier
    );
    this.save();

    // Later, switch to API call:
    // return apiClient.deleteEmergencyContact(identifier);
  }

  // Optional: update a contact
  async updateContact(updated: Contact) {
    this.contacts = this.contacts.map(c =>
      c.id === updated.id || c.name === updated.name ? updated : c
    );
    this.save();

    // Later, switch to API call:
    // return apiClient.updateEmergencyContact(updated);
  }
}

// Export a singleton instance
export const emergencyContactStore = new EmergencyContactStore();
