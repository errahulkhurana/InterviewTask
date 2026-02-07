# User List App

A React Native application that displays a paginated, searchable list of users with detailed user information.

## Features

- ✅ Paginated user list (5 users per page)
- ✅ Infinite scroll pagination
- ✅ Search users by name (debounced)
- ✅ Pull-to-refresh
- ✅ User avatars
- ✅ API response caching
- ✅ Loading and error states
- ✅ User detail screen
- ✅ TypeScript support

## Tech Stack

- React Native 0.83.1
- TypeScript
- React Navigation
- JSONPlaceholder API

## Project Structure

```
src/
├── api/          # API service layer
├── hooks/        # Custom React hooks
├── screens/      # Screen components
├── types/        # TypeScript interfaces
└── utils/        # Utility functions
```

## Setup Instructions

### Prerequisites

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### Installation

1. **Clone the repository**
```sh
git clone <repository-url>
cd InterviewTask
```

2. **Install dependencies**
```sh
npm install
```

3. **iOS Setup** (macOS only)
```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

### Running the App

1. **Start Metro Bundler**
```sh
npm start
```

2. **Run on Android**
```sh
npm run android
```

3. **Run on iOS** (macOS only)
```sh
npm run ios
```

## API

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API:
- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Pagination: `?_page=1&_limit=5`

## Key Implementation Details

### Custom Hook (useUsers)
- Manages user state, pagination, and API calls
- Implements in-memory caching
- Handles loading and error states

### Debounced Search
- 300ms delay to optimize performance
- Filters users by name locally

### Pagination
- Loads 5 users per page
- Infinite scroll with `onEndReached`
- Stops when no more data available

### Caching
- Caches API responses by page number
- Reduces unnecessary network calls

## Troubleshooting

If you encounter issues:

1. **Clear cache**
```sh
npm start -- --reset-cache
```

2. **Clean build** (Android)
```sh
cd android && ./gradlew clean && cd ..
```

3. **Clean build** (iOS)
```sh
cd ios && xcodebuild clean && cd ..
```

For more help, see [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting).
