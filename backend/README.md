# Contact form backend

The Next.js API route in `app/api/contact/route.ts` stores every valid contact
submission in the MySQL/MariaDB `contact_messages` table and sends it through
Gmail SMTP. Email delivery status is saved with each submission.

## Local XAMPP setup

1. Start MySQL in the XAMPP Control Panel.
2. Create the application database, account, and table. For the local XAMPP
   setup used in development, run from the project root:

   ```powershell
   $dbPassword = node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('base64url'))"
   $sql = "CREATE DATABASE IF NOT EXISTS checkmyvehicles CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'autoscanora_app'@'localhost' IDENTIFIED BY '$dbPassword'; ALTER USER 'autoscanora_app'@'localhost' IDENTIFIED BY '$dbPassword'; GRANT SELECT, INSERT, UPDATE ON checkmyvehicles.* TO 'autoscanora_app'@'localhost';"
   $sql | & 'F:\xampp\mysql\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3306 -u root
   if ($LASTEXITCODE -ne 0) { throw 'MySQL setup failed' }
   (Get-Content .env.example -Raw).Replace('set-a-unique-database-password', $dbPassword).Replace('SMTP_PASSWORD=replace-with-a-new-gmail-app-password', 'SMTP_PASSWORD=') | Set-Content .env.local -NoNewline
   ```

3. Apply `database/schema.sql` using the MySQL root account:

   ```powershell
   Get-Content database/schema.sql | & 'F:\xampp\mysql\bin\mysql.exe' --protocol=tcp -h 127.0.0.1 -P 3306 -u root checkmyvehicles
   ```

4. Set `SMTP_PASSWORD` in the root `.env.local` to a newly generated Gmail App
   Password, then start or restart Next.js with `npm run dev`.

The MySQL password belongs only in the server-side `.env.local`, never in
client-side code. Contact messages are saved even if email notifications are
not configured; the form confirms the message was saved without asking the
visitor to submit it twice. The email recipient defaults to `autoscanora@gmail.com`.
Production hosting must provide a reachable MySQL/MariaDB instance and the
same server-side `MYSQL_*` settings.
