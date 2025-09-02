# WellPal - Mental Wellness Companion

A comprehensive mental wellness companion app built for university students using Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Profile Management**: Customizable user profiles with avatar upload
- **Mental Health Dashboard**: Daily check-ins and mood tracking
- **Personalization Settings**: Calming theme options and customization
- **Privacy & Data Control**: Complete control over personal information
- **Notification Management**: Customizable wellness reminders
- **Help & Support**: Easy access to mental health resources
- **Responsive Design**: Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 18.17 or higher)
- **npm** (comes with Node.js) or **pnpm** (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/braydencjr/WellPal.git
   cd WellPal
   ```

2. **Install dependencies**
   
   Using npm:
   ```bash
   npm install
   ```
   
   Using pnpm (recommended):
   ```bash
   pnpm install
   ```

3. **Start the development server**
   
   Using npm:
   ```bash
   npm run dev
   ```
   
   Using pnpm:
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📦 Project Structure

```
WellPal/
├── app/                          # Next.js 13+ app directory
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Main dashboard
│   ├── profile/                  # Profile management
│   │   ├── notifications/        # Notification settings
│   │   └── privacy-data/         # Privacy & data settings
│   ├── onboarding/               # User onboarding flow
│   └── support/                  # Help & support
├── components/                   # Reusable React components
│   ├── ui/                       # Base UI components (buttons, cards, etc.)
│   ├── auth/                     # Authentication components
│   └── onboarding/               # Onboarding components
├── contexts/                     # React contexts for state management
├── lib/                          # Utility functions
├── public/                       # Static assets
│   └── assets/                   # Images and media files
└── styles/                       # Global styles
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation

## 🔧 Available Scripts

- `npm run dev` / `pnpm dev` - Start the development server
- `npm run build` / `pnpm build` - Build the application for production
- `npm run start` / `pnpm start` - Start the production server
- `npm run lint` / `pnpm lint` - Run ESLint for code linting

## 🎨 Customization

### Themes
The app supports multiple calming background themes:
- Soft Green
- Calm Blue  
- Warm Beige

### Profile Options
Users can customize their profile with:
- Custom avatar upload
- Multiple status options (University Student, Graduate Student, etc.)
- Personalized institution information

## 📱 Key Pages

- **Dashboard** (`/dashboard`) - Daily wellness check-ins and mood tracking
- **Profile** (`/profile`) - User profile management and settings
- **Notifications** (`/profile/notifications`) - Notification preferences
- **Privacy & Data** (`/profile/privacy-data`) - Account security and privacy settings
- **Support** (`/support`) - Mental health resources and help

## 🔐 Privacy & Security

WellPal is built with privacy in mind:
- All data is stored locally or with explicit user consent
- Granular privacy controls for data sharing
- Secure password management
- Option to download or delete personal data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues or need help:

1. Check the [Issues](https://github.com/braydencjr/WellPal/issues) page for existing problems
2. Create a new issue with detailed information about your problem
3. Visit the in-app support page at `/support`

## 🙏 Acknowledgments

- Built with care for university students' mental wellness
- Inspired by modern mental health best practices
- Special thanks to the open-source community for the amazing tools and libraries

---

**Remember: If you're experiencing a mental health crisis, please reach out to emergency services or a mental health professional immediately.**
