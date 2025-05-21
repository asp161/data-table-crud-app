# Data Table CRUD App

**Author:** Álvaro Sánchez Pinedo

---

## Table of Contents

- [Project Overview](#project-overview)
- [Deployment, Configuration & Execution](#deployment-configuration--execution)
- [Technical Documentation](#technical-documentation)
  - [Technologies & Decisions](#technologies--decisions)
  - [Reusable Components](#reusable-components)
  - [Performance Optimizations](#performance-optimizations)
  - [Accessibility Features](#accessibility-features)
- [AI Tool Usage Documentation](#ai-tool-usage-documentation)
- [Development & Self-Review Process](#development--self-review-process)
- [Assumptions & Open Interpretations](#assumptions--open-interpretations)
- [Additional Resources](#additional-resources)

---

## Project Overview

This project is a responsive CRUD (Create, Read, Update, Delete) application built with Angular. It features a data table for managing products, including search, filtering, pagination, and modals for product details, editing, and confirmation dialogs. The UI is optimized for both desktop and mobile devices.

---

## Deployment, Configuration & Execution

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Angular CLI](https://angular.dev/tools/cli) (v19+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/data-table-crud-app.git
   cd data-table-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App Locally

Start the development server:
```bash
ng serve
```
Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser.


## Technical Documentation

### Technologies & Decisions

- **Framework:** Angular 19 (TypeScript)
- **UI Library:** Angular Material for consistent, accessible, and responsive UI components.
- **State Management:** Component-level state (no external state library needed for this scale).
- **Styling:** SCSS with responsive design using media queries.
- **Testing:** Karma/Jasmine for unit tests.
- **AI Tools:** GitHub Copilot  (see [AI Tool Usage Documentation](#ai-tool-usage-documentation)).

#### Key Decisions

- **Angular Material** was chosen for rapid development and built-in accessibility.
- **Responsive Design**: The app adapts to desktop, tablet, and mobile layouts, hiding or truncating columns as needed.
- **Componentization**: The app is split into reusable, focused components for maintainability and scalability.

---

### Reusable Components

#### 1. `ProductSearchComponent`
- **Purpose:** Provides a reusable search and filter bar for products.
- **Reusability:** Can be used in any list or table view requiring search/filter functionality.
- **Design:** Emits output events for search/filter changes and is fully decoupled from the data table.

#### 2. `ConfirmDialogComponent`
- **Purpose:** Generic confirmation dialog for destructive actions (e.g., delete).
- **Reusability:** Can be used for any confirmation scenario by passing a message and handling the result in the parent component.
- **Design:** Standalone, receives data via Angular Material dialog injection.

#### 3. `ProductAddComponent` & `ProductEditComponent`
- **Purpose:** Dialog forms for adding or editing products.
- **Reusability:** Both are standalone and can be used in any context where product creation or editing is needed.
- **Design:** Use Angular Material dialogs and forms, and emit the result to the parent.

#### 4. `ProductDetailComponent`
- **Purpose:** Shows detailed information about a product in a dialog.
- **Reusability:** Can be used wherever product details need to be displayed in a modal.

#### 5. `ProductListComponent`
- **Purpose:** Main table and card-based (mobile) product listing, including all CRUD actions.
- **Reusability:** The card view logic is integrated here for mobile, but the component is structured to allow easy adaptation for other entity types with similar CRUD needs.

**Trade-offs:**  
- Components are kept focused and stateless where possible for easier testing and reuse.
- Dialog components are standalone and lazy-loaded for performance and reusability.
- The card view for mobile is implemented inside `ProductListComponent` for simplicity, but could be extracted if needed elsewhere.
- Some logic (e.g., filtering) is handled at the parent level for flexibility and separation of concerns.
---

### Performance Optimizations

- **Code Splitting & Lazy Loading:**  
  Dialog components (`ProductAdd`, `ProductEdit`, `ProductDetail`, `ConfirmDialog`) are loaded lazily using Angular's dynamic component loader. This reduces the initial bundle size and improves load times.
- **OnPush Change Detection:**  
  Where possible, components use `ChangeDetectionStrategy.OnPush` to minimize unnecessary re-renders.
- **Responsive Table:**  
  Columns are hidden or truncated on smaller screens to avoid horizontal scrolling and improve perceived performance.

**Why:**  
These optimizations ensure the app loads quickly, especially on mobile devices, and remains responsive as the data set grows.

---

### Accessibility Features

- **ARIA Roles & Labels:**  
  Dialogs and buttons use appropriate ARIA roles and labels for screen readers.
- **Keyboard Navigation:**  
  All interactive elements (buttons, inputs, dialogs) are accessible via keyboard (Tab, Enter, Esc).
- **Color Contrast:**  
  The color scheme ensures sufficient contrast for readability.
- **Testing Tools:**  
  Accessibility was checked using browser dev tools (Lighthouse, axe) and manual keyboard testing.

---

## AI Tool Usage Documentation

- **Tools Used:**  
  - **GitHub Copilot:** Used occasionally for code suggestions and to speed up repetitive tasks, such as generating SCSS patterns or boilerplate code.

- **How & Why:**  
  - AI tools were used as a support resource, mainly to resolve isolated issues or to get inspiration for certain implementation details.
  - All code and documentation were carefully reviewed and adapted by the developer to ensure they fit the project's requirements and maintain a consistent style.
  - The main development, architectural decisions, and component structure were designed and implemented by the developer, with AI input limited to specific technical or syntactic challenges.

- **Integration with Developer Input:**  
  - AI-generated suggestions were always critically assessed and, when used, were modified to match the project's standards and needs.
  - The majority of the codebase and design decisions reflect the developer's own input, with AI tools serving as an occasional aid rather than the primary authoring source.

---

## Development & Self-Review Process

- **Self-Review:**  
  - The codebase was reviewed for consistency, readability, and adherence to Angular best practices.
  - Accessibility and responsiveness were tested on multiple devices and browsers.
  - AI suggestions were improved in several places, especially for:
    - Responsive SCSS (ensuring search bar and button alignment)
    - Accessibility (adding ARIA roles and keyboard navigation)
    - Performance (optimizing change detection and lazy loading)

- **Issues Found & Addressed:**  
  - Some AI-generated SCSS caused layout issues on mobile; these were fixed by adjusting flexbox and width rules.
  - AI sometimes omitted accessibility attributes, which were added manually.
  - The table's actions column was sometimes cut off on small screens; this was fixed by ensuring horizontal scroll and minimum column widths.

  

---

## Assumptions & Open Interpretations

- The product data is managed in-memory for demo purposes; in a real-world app, a backend API would be used.
- The UI/UX prioritizes clarity and accessibility over visual complexity.
- The mobile/tablet breakpoints were chosen based on common device sizes.
- The challenge left some requirements open (e.g., which columns to hide on mobile), so decisions were made to maximize usability.

---

## Testing
Due to time constraints, unit or integration tests were not implemented. In a real project scenario, I would add unit tests using Jasmine and Karma, focusing on critical logic (filtering, CRUD service methods). The structure is ready to support testing.

---

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io/)

---

**Author:**  
Álvaro Sánchez Pinedo