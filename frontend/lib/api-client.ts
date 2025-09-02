const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // AI Chat API
  async sendChatMessage(message: string, context?: string) {
    return this.request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  async getChatHistory(limit: number = 20) {
    return this.request(`/chat/history?limit=${limit}`);
  }

  async clearChatHistory() {
    return this.request('/chat/history', {
      method: 'DELETE',
    });
  }

  async getCompanionAvatar() {
    return this.request('/chat/companion-avatar');
  }

  // Mood Tracking API
  async getMoodHistory() {
    return this.request('/mood/entries');
  }

  async createMoodEntry(data: {
    score: number;
    labels: string[];
    notes?: string;
    postcardUrl?: string;
  }) {
    return this.request('/mood/entries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMoodAnalytics() {
    return this.request('/mood/analytics');
  }

  // Support Resources API
  async getEmergencyContacts() {
    return this.request('/support/emergency-contacts');
  }

  async getMentalHealthResources() {
    return this.request('/support/mental-health-resources');
  }

  async getCounselingServices(location?: string) {
    const params = location ? `?location=${location}` : '';
    return this.request(`/support/counseling-services${params}`);
  }

  // User API
  async getUserProfile() {
    return this.request('/users/me');
  }

  async updateUserProfile(data: any) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Auth API
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string, confirmPassword: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ 
        email, 
        password, 
        name, 
        confirm_password: confirmPassword 
      }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
