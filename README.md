# StackVerse Frontend
A simple Vue.js frontend application for a lesson store that interacts with the StackVerse backend

2024-25 CST3144 Full Stack Development

## Tools
[Vue](https://vuejs.org/) - Built using vue Composition API

[TailwindCSS](https://tailwindcss.com/) - Styling framework

## Project Structure

```
stackverse-vue/
├── public/                     # Public assets
│ ├── favicon.ico               # Favicon
│ └── index.html                # Main HTML template
├── src/
│ ├── assets/                   # Static assets
│ ├── components/               # Vue components
│ │ ├── CourseCard.vue          # Course item component
│ │ └── Sheet.vue               # Sidebar Cart component
│ ├── routes/                   # Project routes
│ │ ├── Home.vue                # Home page
│ │ └── ShoppingCart.vue        # Cart page
│ ├── App.vue                   # Root component
│ ├── main.js                   # Application entry point
│ ├── store.js                  # Lesson state management
│ └── style.css                 # Global styles
├── .gitignore                  # Git ignore rules
├── index.html                  # Main HTML file
├── package.json                # Project dependencies
├── README.md                   # Project documentation
└── vite.config.js              # Vite configuration
```

## Features

### Core Functionality
- View available lessons
- Add and remove lessons from cart
- Search, filter and sort lessons
- Checkout

### Key Components
- Lessons Display: Shows all available lessons with search/filter capabilities
- Shopping Cart: Manages selected items before checkout
- Order Form: Handles customer information and order submission

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev  # Development with nodemon
   npm start    # Production
   ```

## Links
Github repo [link](https://github.com/UmesiQueen/stackverse-vue)

Deployment [url](https://umesiqueen.github.io/stackverse-vue/)

Made with ❤️ Queen