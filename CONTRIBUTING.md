# Contributing to The Intervenor Scheduler

Thank you for your interest in contributing to The Intervenor Scheduler! We welcome contributions from everyone, whether it's code, documentation, bug reports, or feature suggestions.

## Code of Conduct

Please be respectful and constructive in all interactions with other contributors and maintainers.

## Getting Started

### Prerequisites
- Git
- A web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VSCode, Sublime, etc.)
- Basic knowledge of JavaScript, HTML, CSS (optional)

### Setting Up Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/intervenor-scheduler.git
   cd intervenor-scheduler
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-repo/intervenor-scheduler.git
   ```

### Running the Application Locally

```bash
# Using Python (Python 3)
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Then open browser to http://localhost:8000
```

## How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Create a new issue** with:
   - Clear title describing the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Suggesting Features

1. **Check existing issues** for similar suggestions
2. **Create a new issue** with:
   - Clear title starting with "[Feature Request]"
   - Detailed description of the feature
   - Why you think it would be useful
   - Examples of similar features in other apps
   - Mockups or wireframes if applicable

### Submitting Pull Requests

1. **Fork the repository** and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Keep commits focused and atomic
   - Write clear commit messages
   - Follow the existing code style
   - Add comments for complex logic

3. **Test thoroughly**:
   - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test on mobile devices
   - Test in offline mode (if applicable)
   - Verify localStorage still works

4. **Update documentation**:
   - Update README.md if needed
   - Add entry to CHANGELOG.md under [Unreleased]
   - Update comments/code documentation

5. **Push and create Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create PR with clear description
   - Reference any related issues
   - Include screenshots/GIFs for UI changes

6. **Respond to feedback**:
   - Be open to suggestions
   - Make requested changes in new commits
   - Rebase if needed

## Code Style Guide

### JavaScript
- Use `const` by default, `let` if reassignment needed, avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Add comments for non-obvious logic
- Keep functions small and focused
- Use meaningful variable names

Example:
```javascript
// Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.value, 0);
};

// Bad
const calc = (i) => {
  let t = 0;
  for (let x of i) {
    t += x.v;
  }
  return t;
};
```

### HTML
- Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, etc.)
- Include ARIA labels for accessibility
- Use data attributes for JavaScript hooks
- Keep structure clean and indented

### CSS
- Use CSS custom properties for colors and sizing
- Follow BEM naming convention for classes
- Mobile-first approach with media queries
- Group related styles together
- Add comments for complex selectors

### Comments
```javascript
// Single line comments for brief explanations
// Use these frequently

/*
 * Multi-line comments for longer explanations
 * or when explaining complex logic
 */
```

## Project Structure

```
intervenor-scheduler/
├── index.html              # Main HTML file
├── app.js                  # Application logic (~900 lines)
├── styles.css              # All styling
├── service-worker.js       # PWA offline support
├── manifest.webmanifest    # PWA metadata
├── icons/                  # App icons
├── README.md               # Project documentation
├── CHANGELOG.md            # Version history
├── package.json            # Project metadata
├── .gitignore              # Git configuration
├── LICENSE                 # MIT License
└── CONTRIBUTING.md         # This file
```

## File Locations for Common Changes

| Change Type | File(s) |
|-------------|---------|
| New feature/function | `app.js` |
| Bug fix | `app.js` or relevant file |
| Styling changes | `styles.css` |
| HTML structure | `index.html` |
| Offline support | `service-worker.js` |
| Meta/manifest | `manifest.webmanifest` |
| Documentation | `README.md` or `CHANGELOG.md` |

## Testing Checklist

Before submitting a PR, please test:

- [ ] Functionality works as intended
- [ ] No console errors
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on mobile (iPhone/Android)
- [ ] Works in offline mode
- [ ] localStorage data persists
- [ ] No breaking changes to existing features
- [ ] Forms validate properly
- [ ] Buttons are clickable and functional
- [ ] Animations are smooth
- [ ] Responsive design is correct

## Performance Considerations

- Keep bundle size small (target: <50KB)
- Minimize DOM manipulation
- Use event delegation where appropriate
- Cache DOM selections in variables
- Avoid unnecessary re-renders
- Use localStorage efficiently

## Browser Compatibility

Target browsers:
- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

Use feature detection, not browser detection.

## Documentation

- Keep README.md up to date
- Add JSDoc comments for complex functions
- Document new configuration options
- Update CHANGELOG.md with all changes
- Include examples in comments where helpful

## Questions?

- Check existing issues for similar questions
- Ask in a new issue with the label "question"
- Be patient and respectful in discussions

## Recognition

Contributors will be recognized in:
- CHANGELOG.md
- GitHub contributors page
- README.md (for major contributions)

## License

By contributing to The Intervenor Scheduler, you agree that your contributions will be licensed under the MIT License.

Thank you for helping make The Intervenor Scheduler better! 🎉
