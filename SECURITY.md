# Security Configuration Guide

## 🔒 Securing Sensitive Credentials

This guide explains how to properly manage sensitive credentials (database passwords, secret keys) for development and production environments.

## ⚠️ CRITICAL: Never Commit These to Git

The following files contain sensitive information and should NEVER be committed to version control:
- `.env` (contains actual credentials)
- Any file with passwords, API keys, or secret keys

✅ Safe to commit:
- `.env.example` (template without real credentials)
- `settings.py` (now uses environment variables)

## 📁 File Structure

```
Backend/
├── .env                    # ❌ DO NOT COMMIT (gitignored)
├── .env.example           # ✅ Safe to commit (template)
└── Backend/
    └── settings.py        # ✅ Safe to commit (uses env vars)
```

## 🛠️ Setup Instructions

### For Development (Local Machine)

1. Copy the example environment file:
```bash
cd Backend
cp .env.example .env
```

2. Edit `.env` with your local credentials:
```bash
# Open .env and update these values:
SECRET_KEY=your-development-secret-key
DB_PASSWORD=your-local-database-password
DEBUG=True
```

3. Verify `.env` is gitignored:
```bash
# Check that .env is listed in .gitignore
cat .gitignore | grep .env
```

### For Production Deployment

1. Generate a strong SECRET_KEY:
```python
# Run this in Python shell to generate a new secret key
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

2. Create production `.env` file on your server:
```bash
# On your production server
cd Backend
nano .env
```

3. Set production environment variables:
```bash
# Production .env file
SECRET_KEY=<your-generated-production-secret-key>
DEBUG=False

# Database Settings
DB_NAME=jobportal_production
DB_USER=jobportal_user
DB_PASSWORD=<strong-production-password>
DB_HOST=your-database-host
DB_PORT=5432

# Security Settings
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Important Production Settings:**
- Set `DEBUG=False` (never run production with DEBUG=True)
- Use HTTPS (update CORS origins to use `https://`)
- Set strong, unique `SECRET_KEY`
- Use a dedicated database user with limited permissions
- Set `ALLOWED_HOSTS` to your actual domain(s)

## 🔐 Environment Variables Reference

### Required Variables

| Variable | Description | Example (Dev) | Example (Prod) |
|----------|-------------|---------------|----------------|
| SECRET_KEY | Django secret key for cryptographic signing | Any random string | Strong generated key |
| DB_PASSWORD | PostgreSQL database password | Login@2176 | Strong password |

### Optional Variables (with defaults)

| Variable | Description | Default | Production Value |
|----------|-------------|---------|------------------|
| DEBUG | Enable debug mode | True | False |
| DB_NAME | Database name | jobportal_db | jobportal_production |
| DB_USER | Database user | postgres | jobportal_user |
| DB_HOST | Database host | localhost | Your DB host |
| DB_PORT | Database port | 5432 | 5432 |
| ALLOWED_HOSTS | Allowed domain names | localhost,127.0.0.1 | yourdomain.com |
| CORS_ALLOWED_ORIGINS | Allowed CORS origins | http://localhost:5173 | https://yourdomain.com |

## ✅ Security Checklist

Before deploying to production:

- [ ] Generate a new, strong SECRET_KEY (never use the development key)
- [ ] Set `DEBUG=False` in production `.env`
- [ ] Update `ALLOWED_HOSTS` with your production domain
- [ ] Update `CORS_ALLOWED_ORIGINS` with your production frontend URL (use HTTPS)
- [ ] Use a strong database password
- [ ] Verify `.env` is in `.gitignore`
- [ ] Never commit `.env` file to Git
- [ ] Set up HTTPS/SSL certificates
- [ ] Update `SESSION_COOKIE_SECURE=True` in settings.py for production
- [ ] Update `CSRF_COOKIE_SECURE=True` in settings.py for production
- [ ] Review and update JWT token lifetimes if needed

## 🚨 What to Do If Credentials Are Exposed

If you accidentally commit sensitive credentials to Git:

1. **Immediately change all exposed credentials:**
   - Generate new SECRET_KEY
   - Change database password
   - Update any other exposed secrets

2. **Remove from Git history:**
   ```bash
   # This is complex - consider using tools like BFG Repo-Cleaner
   # Or create a new repository if the project is small
   ```

3. **Update `.env` with new credentials**

4. **Verify `.gitignore` is working:**
   ```bash
   git status
   # .env should NOT appear in the list
   ```

## 📚 Additional Resources

- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [Python Decouple Documentation](https://github.com/henriquebastos/python-decouple)
- [OWASP Security Guidelines](https://owasp.org/)

## 🔄 How It Works

The `settings.py` file now uses `python-decouple` to read environment variables:

```python
# Instead of hardcoded values:
SECRET_KEY = 'hardcoded-secret-key'  # ❌ Bad

# We now use:
SECRET_KEY = config('SECRET_KEY')  # ✅ Good
```

The `config()` function:
1. Looks for a `.env` file in the project directory
2. Reads the variable value from that file
3. Falls back to a default value if specified
4. Can cast values to specific types (bool, int, list, etc.)

## 💡 Tips

- **Keep `.env.example` updated** - When you add new environment variables, update the example file (without real values)
- **Document all variables** - Add comments in `.env.example` explaining what each variable does
- **Use different values for dev/prod** - Never use development credentials in production
- **Rotate secrets regularly** - Change production secrets periodically
- **Use environment-specific files** - Consider `.env.development`, `.env.production` for clarity
