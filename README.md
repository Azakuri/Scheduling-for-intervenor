# The Intervenor Scheduler

A modern, progressive web application for managing event scheduling and member workload tracking for student publications and event coverage teams.

![The Intervenor Scheduler](https://img.shields.io/badge/status-active-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Version](https://img.shields.io/badge/version-2.0.0-orange)

## Features

### 📅 Event Management
- **Easy Event Creation**: Add events with title, date, time, and required member count
- **Output Tracking**: Specify the output value per member assignment (default: 1)
- **Automatic Assignment**: Smart algorithm to assign available members avoiding conflicts
- **Manual Control**: Edit assignments directly in the event details
- **Event Status**: Track events as pending or completed

### 👥 Member Management
- **Member Database**: Maintain a list of all team members with roles
- **Output Tracking**: Track first and second semester outputs per member
- **Table View**: Clean, organized table for easy viewing and editing
- **Output Control**: Quick increment/decrement buttons or direct input
- **Sorting Options**: Sort members alphabetically or by workload

### 📚 School Schedule Integration
- **Class Time Blocks**: Add member class schedules by day and time
- **Conflict Detection**: Automatically detect and prevent assignments during class times
- **Weekly View**: Visual representation of all scheduled classes

### 💾 Data Management
- **Export Data**: Download all data as JSON for backup
- **Import Data**: Restore data from previously exported JSON files
- **Browser Storage**: Automatically saves to browser localStorage
- **Clear Data**: Reset to defaults with confirmation

### 🎨 Offline-First PWA
- **Progressive Web App**: Works offline with service worker
- **Installable**: Add to home screen on mobile or desktop
- **Responsive Design**: Works on phones, tablets, and computers
- **Smooth Animations**: Polished user experience with transitions

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/intervenor-scheduler.git
cd intervenor-scheduler
```

2. Open the app:
   - Open `index.html` directly in your browser
   - Or serve with a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Quick Start

1. **Add Members**: Go to the Members tab and add your team members with their roles
2. **Set School Schedule**: Add class times in the Schedule tab to prevent conflicts
3. **Create Events**: Add events in the Events tab with required member count
4. **Auto Assign**: Click "Auto assign" or add members manually
5. **Mark Complete**: When event is done, mark it complete - member outputs auto-update
6. **Export Data**: Regularly backup your data using the Export button

## Usage Guide

### Adding Events
- Event output value determines how many points each member gets for that event
- Setting it to 0 will create an event without adding output
- "Both semesters" events add output to 2nd semester

### Output Tracking
- Member outputs are split between 1st and 2nd semester
- Outputs are automatically incremented when events are marked as completed
- Manually edit output values anytime in the Members table

### Data Export/Import
- Export creates a JSON file that can be stored safely
- Import will replace all current data - confirm before importing
- Good practice: Export data weekly for backup

### Offline Usage
- First visit creates a service worker cache
- All data syncs to localStorage automatically
- Install as an app: Tap the menu → Install app (mobile) or use the + icon (desktop)

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technology Stack

- **Frontend**: Vanilla JavaScript (no frameworks)
- **Storage**: localStorage API
- **Offline**: Service Worker + Progressive Web App
- **Styling**: CSS3 with custom properties
- **Performance**: Optimized bundle size (~15KB gzipped)

## File Structure

```
intervenor-scheduler/
├── index.html                 # Main HTML file
├── app.js                     # Application logic
├── styles.css                 # Styling
├── service-worker.js          # Offline support
├── manifest.webmanifest       # PWA manifest
├── icons/                     # App icons
├── README.md                  # This file
├── package.json               # Project metadata
├── CHANGELOG.md               # Version history
└── .gitignore                 # Git configuration
```

## Features Comparison

| Feature | v1.0 | v2.0 |
|---------|------|------|
| Event Management | ✅ | ✅ |
| Member Management | ✅ | ✅ |
| Output Tracking | ✅ | ✅ Enhanced |
| Event Output Value | ❌ | ✅ |
| Member Table View | ❌ | ✅ |
| Export/Import | ❌ | ✅ |
| Auto-completion Output | ❌ | ✅ |
| Dark Mode | ❌ | Planned |
| Teams/Groups | ❌ | Planned |

## Improvements in v2.0

### Bug Fixes
- ✅ Fixed event completion not updating member outputs automatically
- ✅ Fixed form validation issues
- ✅ Improved duplicate member name detection

### New Features
- ✅ Event output value parameter for flexible point systems
- ✅ Members now display in an organized table format
- ✅ Export and import functionality for data backup
- ✅ Clear all data button with double confirmation
- ✅ Better statistics dashboard in quick panel
- ✅ Enhanced form validation with user feedback

### Design & UX
- ✅ Improved table design with hover effects
- ✅ Better button states and animations
- ✅ Cleaner, more organized UI
- ✅ Better responsive design
- ✅ Added success/confirmation messages
- ✅ Improved color scheme in quick panel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see below for details.

## MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Support

For support, email support@example.com or open an issue on GitHub.

## Roadmap

- [ ] Dark mode support
- [ ] Multi-team management
- [ ] Advanced statistics and reports
- [ ] Mobile app (React Native)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Recurring events
- [ ] Member availability calendar
- [ ] Email notifications
- [ ] API for integrations

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.
