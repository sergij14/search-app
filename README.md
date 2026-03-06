# Case Study: Search App — Trie-Based Search Engine

## 1. Project Overview

**Search App** is a high-performance, client-side search engine built with JavaScript and React. It leverages a **Trie (prefix tree)** data structure to deliver instant prefix-based text searching, smart autocomplete suggestions, and relevance-ranked results. The application preprocesses dataset fields into a trie at initialization time, enabling sub-millisecond lookups regardless of dataset size.

### Key Features
- **Prefix-based search** using a Trie data structure
- **Autocomplete suggestions** generated from trie traversal
- **Relevance-ranked results** with multi-term match prioritization
- **Highlighted matches** in search results using HTML `<mark>` tags
- **Configurable minimum character threshold** for indexing
- **Dynamic data sources** — switchable API endpoints at runtime
- **Configurable search fields** — users choose which fields to index
- **Responsive UI** built with Ant Design

### Tech Stack
| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Component Library | Ant Design 5 |
| Build Tool | Vite 5 |
| Test Framework | Vitest |
| Language | JavaScript (ES2020+) |
| Data Sources | JSONPlaceholder REST API |

---

## 2. Problem Statement

Traditional text search approaches — such as iterating through arrays with `String.includes()` or `Array.filter()` — become increasingly slow as datasets grow. Each search requires scanning every record and every field, resulting in **O(n × m)** time complexity (where *n* is the number of records and *m* is the average field length).

The project aimed to solve:
1. **Performance**: Achieve near-instant search results, even on large datasets
2. **Autocomplete**: Provide real-time word suggestions as the user types
3. **Relevance**: Rank results by match quality (multi-term matches score higher)
4. **Flexibility**: Support searching across arbitrary fields and data sources

---

## 3. Solution Architecture

### 3.1 Trie Data Structure

The core of the application is a **Trie (prefix tree)** — a tree-like data structure where each node represents a character, and paths from root to leaf represent words. The trie is constructed once during initialization and then queried in **O(k)** time, where *k* is the length of the search term — independent of dataset size.

```
Root
├── a
│   ├── d
│   │   └── e
│   │       └── e
│   │           └── l → [indexes: 0, 3]
│   └── a
│       └── m
│           └── i
│               └── r → [indexes: 2]
├── s
│   └── o
│       └── l
│           ├── a
│           │   └── n
│           │       └── g
│           │           └── i → [indexes: 0, 2, 3]
│           └── l
│               └── i
│                   └── c
│                       └── i → ...
```

Each leaf node stores an array of **dataset indexes** pointing back to the original records that contain that word.

### 3.2 Module Architecture

```
src/
├── core/                    # Framework-agnostic search engine
│   ├── SearchService.js     # Trie construction & query engine
│   ├── ResultService.js     # Result ranking & highlight generation
│   └── utils.js             # Text sanitization & regex utilities
├── components/              # React UI layer
│   ├── App.jsx              # Root component
│   ├── SearchForm.jsx       # Search input with autocomplete
│   └── SearchResults.jsx    # Paginated result cards
├── hooks/
│   └── useApp.jsx           # Application state management hook
└── __tests__/
    └── SearchService.test.js # Unit tests for the search engine
```

**Key design decision**: The search engine (`core/`) is completely decoupled from the UI layer. `SearchService` and `ResultService` are plain JavaScript classes with no React dependencies, making them reusable in any JavaScript environment (Node.js, other frameworks, etc.).

### 3.3 Data Flow

```
[API Endpoint] → fetch() → [Raw Data]
                                │
                                ▼
                    ┌──────────────────────┐
                    │   SearchService       │
                    │   constructor()       │
                    │                      │
                    │  1. Iterate records   │
                    │  2. Extract fields    │
                    │  3. Sanitize words    │
                    │  4. Build trie nodes  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   search(query)       │
                    │                      │
                    │  1. Sanitize query    │
                    │  2. Navigate trie     │
                    │  3. Aggregate nodes   │
                    │  4. Rank results      │
                    │  5. Generate previews │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   ResultService       │
                    │                      │
                    │  • Deduplication      │
                    │  • Priority scoring   │
                    │  • HTML highlighting  │
                    │  • Suggestion set     │
                    └──────────────────────┘
```

---

## 4. Development Timeline & Commit History

The project was developed iteratively over multiple phases, each adding a distinct layer of functionality.

### Phase 1: Core Trie Engine (Jun 14, 2024)

| Commit | Description |
|---|---|
| `init` | Project scaffolding with Vite + React |
| `added sample data` | Introduced test dataset for development |
| `getting sanitized words from data fields` | Text preprocessing — lowercase, strip punctuation, split into tokens |
| `added mapping method to map word chars into trie` | Initial trie insertion logic |
| `created recursive mapWordChars` | Refactored trie insertion to use recursion for cleaner traversal |
| `adding item indexes into mapped chars` | Stored dataset indexes at trie leaf nodes for reverse lookup |
| `added minimum length constraint on word to map` | Configurable `min` threshold to skip short/common words |
| `finding item index with the search term` | Implemented trie navigation to locate matching node |
| `aggregating nodes until it reaches to the index value` | Recursive subtree traversal to collect all matching indexes |
| `supporting indexing & searching multiple nodes` | Extended to handle multiple fields per record |
| `removed redundant trim call` | Code cleanup |
| `handling node not found case` | Graceful handling when search term has no trie match |

**Key technical decisions in this phase:**
- **Recursive trie insertion** (`#mapWordChars`) — each character is consumed from an array via `shift()`, and the method recurses until the array is empty, at which point the dataset index is stored.
- **Private class fields** (`#root`, `#mapWordChars`, `#addData`, etc.) — used JavaScript private fields for encapsulation.
- **Configurable regex** — punctuation removal and word splitting patterns are configurable via constructor options.

### Phase 2: Result Processing & Highlighting (Jun 14–16, 2024)

| Commit | Description |
|---|---|
| `added express server for handling query requests` | Initial server-side approach (later removed) |
| `added demo front-end app` | Basic React UI for testing the engine |
| `extracted core modules` | Separated search logic from UI into `core/` directory |
| `created separated ResultService` | Dedicated class for result ranking and formatting |
| `generating field values with highlighted matches` | HTML `<mark>` tag injection for matched terms |
| `added results priorities according to multiple/single word matches` | Multi-term queries rank higher when all terms appear together |
| `using replacement pattern for highlights` | Switched to regex replacement pattern (`$&`) for cleaner highlighting |

**Key technical decisions in this phase:**
- **ResultService separation** — extracted result processing into its own class, applying Single Responsibility Principle.
- **Priority scoring** — results where multiple search terms appear together in a field receive a higher priority score, enabling relevance-based sorting.
- **Regex-based highlighting** — uses `String.replace()` with a dynamic `RegExp` and the `$&` backreference to wrap matched text in `<mark>` tags.

### Phase 3: Unit Testing (Jun 17, 2024)

| Commit | Description |
|---|---|
| `added unit tests` | Comprehensive test suite for SearchService |

**Test coverage includes:**
- Trie structure verification (node existence at expected paths)
- Index assignment validation (correct dataset indexes at leaf nodes)
- Search result correctness (returns expected indexes for given queries)
- Minimum character constraint enforcement
- Suggestion generation accuracy

### Phase 4: Autocomplete & UI Overhaul (Jun 29, 2024)

| Commit | Description |
|---|---|
| `added auto-complete feature to the trie` | Extended `#aggregateNodes` to collect word completions |
| `modified tests` | Updated tests for new API shape |
| `restructured demo app` | Component decomposition (SearchForm, SearchResults) |
| `added Antd Design & integrated auto-complete functionality` | Ant Design UI with `AutoComplete` component |
| `added selection of search fields in demo app` | Multi-select for choosing which fields to search |
| `added test case for suggestions` | Test coverage for autocomplete suggestions |
| `showing search results total count` | Result count display in UI |
| `reusing aggregateNodes method for suggestions` | Unified node traversal for both results and suggestions |
| `added selection of min chars count in demo app` | UI control for minimum character threshold |
| `added clear results button` | UX improvement for resetting search state |
| `combined search & suggest methods` | Single `search()` method returns both results and suggestions |
| `returning both results & suggestions from search method` | Finalized unified API |

**Key technical decisions in this phase:**
- **Unified search API** — rather than separate `search()` and `suggest()` methods, a single `search()` call returns both `{ results, suggestions }`, reducing trie traversal to one pass.
- **Suggestion generation** — during node aggregation, each node with stored values contributes its accumulated character path as a suggestion, collected in a `Set` for deduplication.
- **Component decomposition** — UI split into `SearchForm` (input + configuration) and `SearchResults` (display + pagination), with shared state managed by the `useApp` custom hook.

### Phase 5: Dynamic Data Sources (Jun 30, 2024)

| Commit | Description |
|---|---|
| `fetching endpoints data/choosing search fields dynamically` | Runtime switching between JSONPlaceholder endpoints |
| `binding onSubmit on enter press` | Keyboard accessibility improvement |
| `rerendering search form on endpoint change` | Force re-render via `key` prop on endpoint/config change |

**Key technical decisions in this phase:**
- **Dynamic field detection** — on endpoint change, the app inspects the first record's keys, filters for string-typed fields, and auto-populates the field selector.
- **Trie rebuild on config change** — changing endpoint, search fields, or min character count triggers a full trie rebuild via `useEffect`, ensuring the index stays in sync with the configuration.
- **Component key trick** — `key={JSON.stringify({ minCharsCount, endpoint })}` on the `AutoComplete` component forces React to remount it when config changes, clearing stale suggestions.

### Phase 6: Responsive Design & Documentation (Jul 28, 2024 – Oct 19, 2025)

| Commit | Description |
|---|---|
| `feat: added responsive css` | CSS media queries for mobile/desktop layouts |
| `chore: updated README with improved project description` | Enhanced project documentation |

---

## 5. Core Algorithm Deep Dive

### 5.1 Trie Construction (`SearchService.#addData`)

```javascript
// For each record in the dataset:
data.forEach((item, index) => {
  // For each configured field (e.g., "title", "body"):
  fields.forEach((field) => {
    const words = sanitizeWords(fieldValue, replaceRegex, splitRegex);
    words.forEach((word) => {
      if (word.length >= min) {
        mapWordChars(word.split(""), index, root);
      }
    });
  });
});
```

**Time complexity**: O(N × F × W × C) where N = records, F = fields, W = words per field, C = characters per word.  
**Space complexity**: O(total unique character paths) — shared prefixes are stored once.

### 5.2 Search (`SearchService.search`)

1. **Sanitize** the query using the same regex rules as indexing
2. **Navigate** the trie character-by-character via `#findNode`
3. **Aggregate** all descendant nodes with stored indexes via recursive `#aggregateNodes`
4. **Rank** results by priority score (multi-term matches score higher)
5. **Return** `{ suggestions: string[], results: object[] }`

**Search time complexity**: O(k + m) where k = query length (navigation) and m = number of descendant nodes (aggregation).

### 5.3 Result Ranking (`ResultService.#generateHints`)

```
Priority Score Calculation:
- Multi-term match found  → priority += matchCount + 1
- Single-term match only  → priority += 1
- Applied per field, accumulated across all fields
```

Results are sorted descending by priority, so records matching the full multi-word query rank above partial matches.

---

## 6. Testing Strategy

The project uses **Vitest** with the following test structure:

| Test Case | What It Validates |
|---|---|
| `should build a map of nodes` | Trie structure exists at expected character paths |
| `should assign item indexes to the node value` | Correct dataset indexes stored at leaf nodes |
| `should search through the trie, aggregate nodes and return item indexes` | Partial prefix search returns all matching records |
| `should search through the trie and return item indexes` | Full word search returns exact matches |
| `should not index certain words when min prop is provided` | Minimum character threshold is enforced |
| `should suggest words` | Autocomplete returns expected word completions |

Test data uses a small, controlled dataset of 4 records to validate all edge cases without external dependencies.

---

## 7. Trade-offs & Design Decisions

| Decision | Rationale | Trade-off |
|---|---|---|
| **Client-side trie** (removed initial Express server) | Eliminates network latency for searches; works offline | Higher memory usage on client; dataset must fit in browser memory |
| **Full trie rebuild on config change** | Simplest correct approach; avoids complex incremental updates | Brief rebuild delay when changing fields or min-char setting |
| **Private class fields (`#`)** | Strong encapsulation; prevents external mutation of trie state | Not supported in older browsers (requires ES2022+) |
| **`dangerouslySetInnerHTML` for highlights** | Enables rich HTML rendering of `<mark>` tags in results | Requires trust in data source; potential XSS vector if data is user-generated |
| **Ant Design** | Provides production-ready `AutoComplete`, `Select`, `List`, `Card` components | Large bundle size (~1MB); overhead for a focused search demo |
| **JSONPlaceholder as data source** | Free, reliable, no API key required; multiple entity types for testing | Limited dataset size; string fields only (no numeric search) |

---

## 8. Potential Improvements

1. **Debounced search** — add input debouncing to reduce unnecessary trie traversals during fast typing
2. **Web Worker indexing** — move trie construction to a Web Worker to prevent UI blocking on large datasets
3. **Fuzzy matching** — extend trie with edit-distance tolerance for typo correction
4. **Persistent trie** — cache the built trie in `IndexedDB` to avoid rebuilding on page reload
5. **Virtualized list** — replace Ant Design's `List` pagination with virtual scrolling for smoother rendering of large result sets
6. **XSS sanitization** — sanitize data before injecting HTML via `dangerouslySetInnerHTML`
7. **TypeScript migration** — add static typing for better maintainability and IDE support

---

## 9. Conclusion

The Search App demonstrates how a well-chosen data structure — the Trie — can dramatically improve search performance compared to naive linear scanning. By preprocessing text into a prefix tree, the application achieves **constant-time lookups** relative to dataset size, while simultaneously enabling autocomplete suggestions with no additional data structures.

The project followed an iterative development approach: starting with the raw algorithm, layering on result processing and highlighting, adding comprehensive tests, and finally building a polished UI with configurable search parameters. The clean separation between the core engine (`SearchService` / `ResultService`) and the React UI layer ensures the search logic remains reusable and testable independently of any framework.
