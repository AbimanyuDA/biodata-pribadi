# Setup Email Configuration untuk Contact Form

Pesan dari contact form sekarang akan dikirim ke email Anda menggunakan Gmail SMTP.

## Langkah-langkah Setup:

### 1. Enable 2-Factor Authentication (2FA) di Google Account
- Buka https://myaccount.google.com/security
- Aktifkan "2-Step Verification"

### 2. Buat App Password
- Setelah 2FA aktif, buka https://myaccount.google.com/apppasswords
- Pilih "Mail" dan "Other (custom app)"
- Ketik "Biodata Portfolio" sebagai nama app
- Google akan generate 16-character password (tanpa spasi)

### 3. Update .env.local
File `.env.local` sudah dibuat di root folder project. Update dengan:

```
EMAIL_USER=abimanyudans@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Ganti `xxxx xxxx xxxx xxxx` dengan 16-character password dari step 2 (tanpa spasi).

### 4. Restart Dev Server
```bash
npm run dev
```

## Fitur yang Sudah Diimplementasi:

✅ Form validation (nama, email, subject, message)
✅ Email ke inbox Anda dengan detail pesan
✅ Auto-reply ke email pengirim
✅ Loading state dan success/error messages
✅ Clear form setelah berhasil dikirim
✅ Error handling

## Testing

1. Buka contact section di website
2. Isi form dengan data lengkap
3. Klik "Send Message"
4. Cek inbox Gmail Anda untuk pesan baru

## Troubleshooting

Jika email tidak terkirim:
- Pastikan 2FA sudah diaktifkan di Google Account
- Pastikan App Password sudah dicopy dengan benar (16 karakter)
- Jangan gunakan password Gmail biasa, harus App Password
- Cek folder Spam di Gmail
- Lihat browser console (F12) untuk error messages

## Security Note

- Jangan commit `.env.local` ke git repository
- `.env.local` sudah ada di `.gitignore`
- Environment variables hanya tersedia saat development dan build
