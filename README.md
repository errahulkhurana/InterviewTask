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
├── api/              # API service layer
│   └── userApi.ts    # User API endpoints
├── hooks/            # Custom React hooks
│   ├── useUsers.ts   # User data management hook
│   └── useDebounce.ts # Debounce hook
├── screens/          # Screen components
│   ├── UserListScreen.tsx
│   └── UserDetailScreen.tsx
├── types/            # TypeScript interfaces
│   └── User.ts       # User type definition
└── utils/            # Utility functions
    ├── cache.ts      # In-memory cache
    ├── constants.ts  # App constants
    └── helpers.ts    # Helper functions
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

### Architecture
- **Clean Code Structure**: Separation of concerns with dedicated folders for API, hooks, screens, types, and utilities
- **Constants Management**: Centralized configuration in `utils/constants.ts` for easy maintenance
- **Helper Functions**: Reusable utilities in `utils/helpers.ts` (avatar generation, search filtering)
- **Custom Hooks**: 
  - `useUsers`: Manages user state, pagination, and API calls
  - `useDebounce`: Generic debounce hook for any value

### Features

**Debounced Search**
- 300ms delay using custom `useDebounce` hook
- Filters users by name locally
- Prevents excessive re-renders

**Pagination**
- Loads 5 users per page
- Infinite scroll with `onEndReached`
- Stops when no more data available
- Duplicate prevention logic

**Caching**
- In-memory cache using Map
- Caches API responses by page number
- Reduces unnecessary network calls
- Instant load from cache

**Error Handling**
- Network error detection
- User-friendly error messages
- Retry functionality
- Loading states (initial and pagination)

**Performance Optimizations**
- FlatList optimizations (removeClippedSubviews, windowSize, maxToRenderPerBatch)
- Debounced search input
- Memoized filtered results
- Avatar URL generation helper

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
