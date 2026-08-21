# Hamnavaz Production Checklist

## API
- [ ] `/api/health` returns 200
- [ ] `/api/docs` returns 200
- [ ] `/api/openapi.json` returns 200
- [ ] `/api/search/musicians` returns a paginated envelope
- [ ] authenticated `/api/musician/me` works with a valid JWT

## Frontend
- [ ] homepage loads
- [ ] `/musicians` loads without console errors
- [ ] search calls the production API
- [ ] musician profile opens from a result
- [ ] mobile RTL layout passes visual check

## Product flow
- [ ] register/login
- [ ] create profile
- [ ] search/filter musicians
- [ ] collaboration request
- [ ] accept/reject request
- [ ] messages
- [ ] notifications
- [ ] favorites
- [ ] ratings
- [ ] matching

## Engineering
- [ ] CI green
- [ ] production deployment READY
- [ ] runtime error clusters clear
- [ ] no unpinned `latest` dependencies
- [ ] project log updated after each production blocker/fix
- [ ] no unnecessary infrastructure dependency introduced
