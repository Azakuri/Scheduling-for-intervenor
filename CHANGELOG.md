# Changelog

All notable changes to The Intervenor Scheduler will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-06-19

### Added
- **Event Output Value**: New field to specify output points per member assignment (default: 1)
- **Auto-completion Output**: Member outputs automatically increment when events are marked complete
- **Member Table View**: Replaced card layout with clean, organized table format
- **Export/Import**: Backup and restore data as JSON files
- **Clear All Data**: Reset to defaults with double confirmation dialogs
- **Enhanced Dashboard**: Show active events and completed events counts
- **Form Validation**: Better validation with helpful error messages
- **Duplicate Detection**: Prevent duplicate member names
- **Semester Selection**: Events now include semester selection (1st, 2nd, or both)
- **Success Feedback**: Added confirmation messages for user actions
- **CSS Animations**: Smooth transitions and slide-in animations for better UX
- **Button Improvements**: Added hover effects and visual feedback

### Fixed
- **Event Completion Bug**: Fixed issue where marking event as done didn't update member outputs
- **Form Validation**: Improved validation for required fields
- **Table Responsiveness**: Better mobile support for member table

### Changed
- Improved quick panel layout with multiple statistics
- Enhanced button styling with better visual hierarchy
- Better error messaging throughout the application
- Reorganized CSS for better maintainability
- Updated HTML structure for better semantics

### Improved
- Code quality with better validation functions
- User experience with confirmation dialogs
- Form feedback with alert messages
- Visual design with consistent spacing and colors
- Table design with better typography and alignment

## [1.0.0] - 2025-01-01

### Added
- Initial release
- Event management system
  - Add events with title, date, time, and member requirements
  - Auto-assign members to events
  - Manual assignment editing
  - Mark events as completed
  - View completed events history
  
- Member management system
  - Add team members with roles
  - Track 1st and 2nd semester outputs
  - Output increment/decrement controls
  - Sort members by workload or alphabetically
  - Delete members with confirmation

- Schedule management
  - Add class time blocks for each member
  - Prevent event assignments during class times
  - Weekly schedule view
  - Delete individual schedule blocks

- Data storage
  - Automatic localStorage persistence
  - Sample data for new users
  - Data loading and saving functions

- Progressive Web App features
  - Service worker for offline support
  - Web app manifest
  - Installable on mobile and desktop
  - App icons

- User interface
  - Tabbed navigation (Events, Completed, Members, Schedule)
  - Quick panel with next event information
  - Card-based layout for events and members
  - Responsive design for mobile and desktop
  - Custom styling with CSS variables

- Accessibility
  - Semantic HTML structure
  - ARIA labels for screen readers
  - Keyboard navigation support
  - High contrast colors

## Future Roadmap

### [2.1.0] - Planned
- Dark mode toggle
- Advanced filtering for members and events
- Bulk operations (add multiple members, events)
- Member notes/comments
- Event tags for categorization

### [3.0.0] - Planned
- Cloud synchronization (Firebase/Supabase)
- Multi-team support
- Team collaboration features
- Advanced analytics and reports
- Mobile app (React Native)
- Email notifications
- API for integrations

### Future Features
- Recurring events
- Member availability calendar
- Template library for common events
- Undo/Redo functionality
- Version history/snapshots
- Custom role templates
- Workload forecasting
- Performance metrics
- Integration with calendar apps

## Migration Guide

### Upgrading from 1.0.0 to 2.0.0

1. **No breaking changes**: Your existing data will work with v2.0.0
2. **New fields**: Events now include `outputValue` field (auto-set to 1 for existing events)
3. **Table view**: Member display has changed from cards to table - no data changes
4. **Export your data**: Use the new Export button to backup before updating
5. **Session persistence**: Ensure localStorage is enabled (same as v1.0.0)

---

## How to Contribute

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, issues, or feature requests, please:
- Open an issue on GitHub
- Email support@example.com
- Check existing issues and discussions

## License

This project is licensed under the MIT License - see LICENSE file for details.
