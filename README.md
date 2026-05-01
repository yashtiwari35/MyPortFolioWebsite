# 🔴 Yash Tiwari — Portfolio with Node.js + MySQL + Admin Panel

## 📁 Project Structure

```
portfolio/
├── public/              ← Website files (HTML, CSS, JS, images)
│   ├── index.html
│   ├── project.html
│   ├── details.html
│   ├── style.css
│   ├── script.js
│   ├── back.png
│   ├── hero.png
│   └── resume.pdf
├── admin/
│   └── index.html       ← Admin Panel (contact messages dashboard)
├── server/
│   └── index.js         ← Node.js + Express backend
├── database.sql         ← MySQL database setup
├── package.json
├── .env                 ← DB credentials (edit this!)
└── README.md
```

---

## ✅ STEP-BY-STEP SETUP

### STEP 1 — Node.js Install karo
👉 https://nodejs.org se **LTS version** download karo aur install karo.

Verify karo:
```
node --version
npm --version
```

### STEP 2 — MySQL Install karo
👉 https://dev.mysql.com/downloads/mysql/ se MySQL download karo.

Ya XAMPP use kar sakte ho (MySQL included hai):
👉 https://www.apachefriends.org/

### STEP 3 — Database Setup karo
MySQL terminal ya Workbench mein yeh command run karo:

```bash
mysql -u root -p < database.sql
```

Ya MySQL Workbench mein `database.sql` file open karke run karo.

### STEP 4 — .env file configure karo
`.env` file kholo aur apna MySQL password daalo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=apna_mysql_password_yahan
DB_NAME=portfolio_db
PORT=3000
SESSION_SECRET=koi_bhi_secret_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### STEP 5 — Dependencies install karo
Portfolio folder mein terminal/CMD kholo:

```bash
cd portfolio
npm install
```

### STEP 6 — Server start karo

```bash
npm start
```

Ya development mode mein (auto-restart):
```bash
npm run dev
```

---

## 🌐 URLs

| URL | Kya hai |
|-----|---------|
| http://localhost:3000 | Portfolio website |
| http://localhost:3000/admin | Admin panel |

---

## 👤 Admin Panel Login

```
Username: admin
Password: yash281
```

Admin Panel Features:
- ✅ Saare contact form messages dekho
- ✅ Read/Unread mark karo
- ✅ Messages delete karo
- ✅ Analytics dashboard
- ✅ Last 7 days chart
- ✅ Search & filter
- ✅ Pagination

---

## 📡 API Endpoints

| Method | URL | Kya karta hai |
|--------|-----|---------------|
| POST | /api/contact | Contact form submit |
| POST | /api/admin/login | Admin login |
| POST | /api/admin/logout | Admin logout |
| GET | /api/admin/contacts | All messages (protected) |
| GET | /api/admin/stats | Dashboard stats (protected) |
| PATCH | /api/admin/contacts/:id/read | Mark read/unread |
| DELETE | /api/admin/contacts/:id | Delete one message |
| DELETE | /api/admin/contacts | Delete all messages |

---

## ❓ Troubleshooting

**MySQL connect nahi ho raha?**
→ `.env` mein `DB_PASSWORD` check karo
→ MySQL service run ho raha hai check karo

**`npm install` error?**
→ Node.js properly install hai check karo

**Port 3000 already in use?**
→ `.env` mein `PORT=3001` kar do
