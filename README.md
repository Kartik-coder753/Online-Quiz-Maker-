# Online-Quiz-Maker-
TestHive is a fun quiz site where you can make quizzes or take them. You can sign up, create your own questions, try others' quizzes, check scores instantly, and even see who’s on the leaderboard. It looks nice, works on all devices, and saves everything in your browser.

✅ Part 1: VS Code Setup Instructions for TestHive
🧰 1. Requirements
Ensure the following are installed:

Node.js (v16+)

VS Code

npm (comes with Node)

Live Server or vite for dev preview

📁 2. Project Structure (based on your files)
bash
Copy
Edit
testhive-quiz-app/
├── index.html
├── index.css
├── main.tsx
├── App.tsx
├── /components/
├── /context/
├── /pages/
├── /assets/
└── /utils/
🧩 3. Install Tailwind CSS (if not already)
bash
Copy
Edit
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Update your tailwind.config.js like this:

js
Copy
Edit
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',
        secondary: '#0D9488',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
🚀 4. Run the App
In your root directory:

bash
Copy
Edit
npm install
npm run dev
Visit: http://localhost:5173

✅ Part 2: Complete README.md for TestHive
markdown
Copy
Edit
# 🐝 TestHive – Interactive Online Quiz Maker

**TestHive** is a modern online quiz maker built with **React**, **TypeScript**, and **Tailwind CSS**. Designed for educators, trainers, and students, it lets you **create**, **take**, and **analyze** quizzes interactively with a seamless user experience.

---

## 🎯 Features

### 🔐 User Authentication
- Secure login and signup
- Two roles: **Quiz Creators** and **Participants**
- Context-based authentication state management

### ✏️ Quiz Creation
- Drag & drop **MCQ builder**
- Add questions, options, correct answers
- Instant preview and save to localStorage

### 🧠 Quiz Taking
- Interactive UI with real-time scoring
- Instant feedback on answers
- Smooth transitions between questions

### 🏆 Leaderboard
- Display top scores by quiz
- Real-time updates and animations

### 📊 Analytics Dashboard
- Pie and bar charts for:
  - Average scores
  - Participant count
  - Question-wise performance

---

## 🖌️ Design System

| Design Element | Value |
|----------------|-------|
| Primary Color  | `#6D28D9` (Purple) |
| Secondary Color| `#0D9488` (Teal)   |
| Accent Color   | `#F59E0B` (Amber)  |
| Fonts          | `Inter`, `Roboto`  |
| Layout         | Responsive, card-based, 8px spacing |
| Animations     | Smooth slide, fade, and float |
| Background     | Animated gradients with honeycomb theme |

**Logo:** Custom hexagon-based TestHive logo with honeycomb imagery  
**Typography:** Clean headings with Inter, readable body with Roboto

---

## 🧠 Pages & Routes

| Route           | Description                    |
|-----------------|--------------------------------|
| `/`             | Home / Landing page            |
| `/login`        | Login for all users            |
| `/signup`       | Sign-up with role selection    |
| `/quizzes`      | Quiz listing page              |
| `/create-quiz`  | Quiz creation dashboard        |
| `/quiz/:id`     | Quiz-taking screen             |
| `/leaderboard`  | View top performers            |
| `/analytics`    | Performance dashboard          |

---

## 🧰 Tech Stack

| Tech           | Purpose                        |
|----------------|--------------------------------|
| **React**      | Frontend architecture          |
| **TypeScript** | Type safety                    |
| **Tailwind CSS** | Styling framework            |
| **React Router** | Routing between pages        |
| **Context API** | Authentication & Quiz State   |
| **localStorage** | Data persistence             |

---

## 💾 Data Storage

> For this implementation, data (quizzes, user sessions, scores) is stored locally using `localStorage`. This makes TestHive **backend-free**, perfect for demos, small classrooms, and offline practice.

---

## 📦 Project Setup

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/testhive-quiz-maker.git
cd testhive-quiz-maker
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
npm run dev
Open in browser: http://localhost:5173

🧪 Example Usage
👩‍🏫 As a Quiz Creator:
Signup → Choose "Creator"

Navigate to /create-quiz

Add questions, preview them, and save

Share the quiz with students

👨‍🎓 As a Participant:
Signup → Choose "Participant"

Visit /quizzes

Start a quiz

Answer questions and see your score instantly

Check the leaderboard!

📱 Responsiveness
Works perfectly across:

✅ Mobile phones

✅ Tablets

✅ Desktops

UI adapts to screen sizes using Tailwind’s responsive utilities

📸 Screenshots
Add screenshots of:

Home page

Quiz creation flow

Quiz taking screen

Leaderboard & analytics view

📄 License
MIT License. Free to modify and distribute.

🙌 Acknowledgements
Tailwind CSS

React Router

Google Fonts

Inspired by platforms like Kahoot, Quizizz, and Typeform.

Built with ❤️ by Kartik for learning, sharing, and mastering concepts through quizzes.

yaml
Copy
Edit

---

## 🧪 Real-World Example Execution

### ✅ 1. Creating a Quiz
- Login as a "Creator"
- Go to **Create Quiz**
- Add 5 MCQs like:
  > "What is the capital of France?"  
  > A. Berlin B. Madrid C. Paris ✅ D. Rome

- Click Save → Quiz appears in `/quizzes`

### ✅ 2. Taking a Quiz
- Login as a "Participant"
- Click on a quiz → answer questions
- On submit → see your score instantly

### ✅ 3. Leaderboard & Analytics
- View `/leaderboard` to see top scores
- Visit `/analytics` to explore charts and trends

---
