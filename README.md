# Auto Rent

Мобильное приложение для аренды автомобилей.

## Требования

- Node.js >= 18
- npm >= 8
- Expo CLI

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd auto-rent
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите приложение:
```bash
npm start
```

## Структура проекта

```
auto-rent/
├── app/                    # Основной код приложения
│   ├── (app)/             # Защищенные маршруты
│   │   └── home.tsx       # Главная страница
│   └── (auth)/            # Маршруты аутентификации
│       ├── welcome.tsx    # Приветственная страница
│       ├── login.tsx      # Страница входа
│       ├── register.tsx   # Страница регистрации
│       ├── forgot-password.tsx # Страница восстановления пароля
│       └── verify-code.tsx # Страница подтверждения кода
├── components/            # Переиспользуемые компоненты
│   ├── Button.tsx        # Компонент кнопки
│   ├── Input.tsx         # Компонент поля ввода
│   └── Navbar.tsx        # Компонент навигационной панели
├── assets/               # Статические ресурсы
│   ├── welcome-image.jpg # Изображение для приветственной страницы
│   ├── login-image.jpg   # Изображение для страницы входа
│   └── register-image.jpg # Изображение для страницы регистрации
└── package.json          # Зависимости и скрипты
```

## Функциональность

- Приветственная страница с возможностью входа или регистрации
- Страница регистрации с полями для ввода имени, email и пароля
- Страница входа с полями для email и пароля
- Восстановление пароля через email
- Подтверждение кода восстановления пароля
- Главная страница (заготовка)

## Технологии

- React Native
- Expo
- TypeScript
- React Navigation

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
