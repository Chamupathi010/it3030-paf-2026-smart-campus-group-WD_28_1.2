# it3030-paf-2026-smart-campus-group-WD_28_1.2

## To run Backend only 
    .\mvnw.cmd spring-boot:run

## Installed dependencirs
    Spring Web
    Spring Security
    OAuth2 Client
    -------------------
    Spring Data MongoDB
    -------------------
    Lombok
    Validation
    -------------------
    Spring Boot DevTools

## Structure 
    Frontend
        pages = screens
        components = reusable parts
        services = API calls
        context = global state
        hooks = reusable logic
        layouts = page structure
        routes = route protection
        utils = helpers
        assets = static files

    Backend
        controller = endpoints
        service = logic
        repository = DB access
        entity = DB model
        dto = request/response data
        config = settings
        security = auth stuff
        exception = error handling
        enums = fixed values

### Example
    Let’s say user opens notifications page.

    Frontend flow
    pages/NotificationsPage.jsx → full page
    uses components/NotificationBell.jsx or notification list item
    gets data from services/notificationService.js
    maybe uses useNotifications.js
    layout from layouts/MainLayout.jsx
    Backend flow
    NotificationController.java receives GET /api/notifications
    calls NotificationService.java
    service calls NotificationRepository.java
    repository reads Notification.java data from MongoDB
    maybe returns NotificationResponseDto.java

    That’s why folders are separated.

## Current temporary visual flow
    - frontend/src/App.jsx: added temporary /login-success route for login confirmation. This is a placeholder until the dashboard page is implemented.
    - frontend/src/pages/LoginSuccess.jsx: shows a visual success screen after sign-in so we can verify login works.
    - frontend/src/components/SignInCard.jsx: currently validates email/password and posts to backend /api/auth/login, then redirects to /login-success on success.
    - frontend/src/components/SignUpCard.jsx: validates signup fields and posts to /api/auth/register, including normalized role values for backend enum compatibility.
    - backend/src/main/java/com/smartcampus/backend/config/SecurityConfig.java: updated CORS/security settings to allow frontend requests to auth endpoints.