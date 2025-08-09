# 🚀 TaskFlow - Modern Task Manager

A beautiful, modern task management application built with the latest web technologies.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + React + TypeScript
- **Styling**: Tailwind CSS + ShadCN/UI components
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Icons**: Lucide React

## ✨ Features

- ✅ **Create, read, update, delete tasks**
- 🎨 **Beautiful UI with ShadCN/UI components**
- 📱 **Responsive design**
- 🌓 **Dark mode support**
- 📊 **Task statistics**
- ⚡ **Real-time database updates**
- 🚀 **One-click Vercel deployment**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account
- A Vercel account (for deployment)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Your `.env.local` file is already configured with Supabase credentials.

3. **Set up your Supabase database**
   
   The database schema is already created in your Supabase project.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deploy to Vercel

### One-Click Deploy

1. **Push to GitHub** (optional but recommended)
2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your project
   - Add environment variables
3. **Deploy!**

### Environment Variables for Vercel

```
NEXT_PUBLIC_SUPABASE_URL=https://figbtuhxqmrdyqhaabse.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 📁 Project Structure

```
taskflow/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with Tailwind
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── ui/                  # ShadCN/UI components
│   │   ├── TaskForm.tsx         # Task creation form
│   │   └── TaskList.tsx         # Task display and management
│   └── lib/
│       ├── supabase.ts          # Supabase client configuration
│       └── utils.ts             # Utility functions
├── components.json              # ShadCN/UI configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── vercel.json                  # Vercel deployment config
```

## 🎨 Customization

### Adding New Components

```bash
# Add more ShadCN/UI components
npx shadcn add dialog
npx shadcn add dropdown-menu
npx shadcn add toast
```

### Styling

- Modify `tailwind.config.js` for custom colors and themes
- Update `src/app/globals.css` for global styles
- Components use Tailwind utility classes

## 📝 What You've Learned

This project demonstrates:

- **Next.js App Router** - Modern React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling  
- **ShadCN/UI** - Copy-paste component library
- **Supabase** - PostgreSQL database with real-time features
- **Vercel** - Seamless deployment platform

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [ShadCN/UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Built with ❤️ using the modern web stack**
