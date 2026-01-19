🧠 State Management Using NgRx SignalStore:
NgRx SignalStore is a modern, fully-featured state management solution built on top of Angular Signals.

In this project, NgRx SignalStore is used to provide centralized, reactive, and scalable state management, enabling clean handling of application state, API interactions, and derived data while keeping UI components lightweight and focused.



🏗️ SignalStore Architecture in This Project:

This application uses two dedicated SignalStores, each responsible for managing a specific domain of the application state.

📌 1. RecipeStore

🎯 Purpose
Manages all recipe-related data and operations.

🔧 Responsibilities

🍽️ Fetches recipes from the DummyJSON Recipes API

🧱 Defines application state using withState()

⚙️ Handles business logic and API interactions using withMethods() and rxMethod()

🧮 Exposes derived data (such as total recipe count) using withComputed() for dashboard summaries

❤️ 2. FavouriteStore
🎯 Purpose

Manages the list of recipes marked as favourites by the user.

🔧 Responsibilities

⭐ Adds or removes recipes when the favourite icon is clicked

🗃️ Stores the favourites list in a centralized store

📊 Exposes the total favourites count using computed signals for dashboard display


🗂️ Store Structure:

The application uses two dedicated SignalStores:

src/app/stores/
 ├── recipe-store.ts
 └── favourite-store.ts



🔁 API Integration with rxMethod:
The store uses rxMethod to handle async API calls in a declarative way.

Example: Load all Recipes

loadRecipes: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(() =>
            recipeService.getAllRecipes().pipe(
              tapResponse({
                next: (res: RecipesResponse) =>
                  patchState(store, {
                    recipes: res.recipes,
                    isLoading: false,
                  }),
                error: () =>
                  patchState(store, {
                    error: 'Failed to load recipes',
                    isLoading: false,
                  }),
              })
            )
          )
        ))

This pattern:

Sets loading state
Calls the API
Updates store state on success
Captures errors
Automatically triggers UI updates


🔁 Application Flow:

1️⃣ UI components interact directly with SignalStores, not with APIs
2️⃣ API calls are encapsulated inside the store, which internally invokes service methods
3️⃣ SignalStores behave like injectable services and can be accessed across components
4️⃣ Any change in store state automatically updates all consuming components through reactive signals


Key Advantages of SignalStore in This Project:

🔄 No manual subscription or unsubscription
rxMethod() internally manages observable lifecycles.

🧠 Single source of truth
All application state is centralized, ensuring consistency across components.

🪝 Centralized lifecycle logic
Store-level initialization is handled using withHooks(), eliminating duplicated ngOnInit() logic in components.

🧮 Reusable derived state
Computed values are centralized using withComputed(), avoiding repeated calculations in multiple components.

🎨 Clear separation of concerns
Business logic resides in stores, while components focus only on UI rendering.

